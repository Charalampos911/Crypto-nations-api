using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using CryptoNations.API.CustomActionFilters;
using CryptoNations.API.Models.Domain;
using CryptoNations.API.Models.DTO;
using CryptoNations.API.Repositories;
using System.Net;

//Include this for swagger annotations
using Swashbuckle.AspNetCore.Annotations;
using CryptoNations.API.Models.DTO.CryptoNationsDtos;
using CryptoNations.API.Models.Domain.CryptoNationsModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore; //New

namespace CryptoNations.API.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class CryptoNationsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly INationsRepository InitiatedNationsRepository;

        public CryptoNationsController(IMapper mapper, INationsRepository InitiatedCountryRepository)
        {
  
            this.mapper = mapper; 
            this.InitiatedNationsRepository = InitiatedCountryRepository;
        }

        [HttpGet("FullNation/{id:int}")]
        [Authorize(Roles = "Writer,Reader")]
        //[Route("{id:int}")]// we add Guid here to make it type safe!
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var FullNation = await InitiatedNationsRepository.FullNation(id);
            if (FullNation == null)
            {
                return NotFound(); //404 response
            }

            return Ok(FullNation);

        }


        // Παράδειγμα με Queries!!!
        // GET: /api/base/GetNationsWithQuery?filterOn=Name&filterQuery=Track&sortBy=Name&isAscending=true&pageNumber=1&pageSize=10
        [HttpGet("NationsWithQuery")]
        [Authorize(Roles = "Writer,Reader")]
        [SwaggerOperation(
            Summary = "Retrieve all InitiatedCountries",
            Description = "Retrieves a list of all InitiatedCountries, with optional filtering, sorting, and pagination."
        )]
        public async Task<IActionResult> NationsWithQuery(

            [SwaggerParameter(Description = "The field to filter on (e.g., 'Name').")]
            [FromQuery] string? filterOn, // Ex. filterProperty

            [SwaggerParameter(Description = "The value to filter by.")]
            [FromQuery] string? filterQuery, // Ex. filterPropertyValue

            [SwaggerParameter(Description = "The field to sort by (e.g., 'Name' or 'TokenAcro') *Select the sorting Column!!!.")]
            [FromQuery] string? sortBy,

            [SwaggerParameter(Description = "Sort order (true for ascending, false for descending) *Sort the Sorting column Alphabetically or in reverse.")]
            [FromQuery] bool? isAscending,

            [SwaggerParameter(Description = "Page number for pagination.")]
            [FromQuery] int pageNumber = 1,

            [SwaggerParameter(Description = "Number of items per page for pagination.")]
            [FromQuery] int pageSize = 1000
        )
        {
            var InitiatedCountryDomainModel = await InitiatedNationsRepository.NationsWithQuery(filterOn, filterQuery, sortBy,
                //This is a  nullable boolean ?? if it is not provided, default back to true
                isAscending ?? true, pageNumber, pageSize);

            // Map Domain Model to DTOz
            return Ok(mapper.Map<List<NationsDto>>(InitiatedCountryDomainModel));
        }


        [HttpGet("GetNationalPortfolio/{id:int}")]
        [ValidateModel]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Update([FromRoute] int id)
        {
            var NationalPortfolio = await InitiatedNationsRepository.GetNationalPortfolio(id);
            if (NationalPortfolio == null)
            {
                return NotFound("Nation is not initiated");
            }
            return Ok(mapper.Map<List<PortfolioListDto>>(NationalPortfolio));
        }


        [HttpGet("GetNationalSellOrders/{id:int}")]
        [ValidateModel]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> GetNationalSellOrders([FromRoute] int id)
        {
            var SellOrders = await InitiatedNationsRepository.GetNationalSellOrders(id);
            if (SellOrders == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<List<PortfolioListDto>>(SellOrders));
        }


        [HttpGet("GetOtherSellOrders/{id:int}")]
        [ValidateModel]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> GetOtherSellOrders([FromRoute] int id)
        {

            var SellOrders = await InitiatedNationsRepository.GetOtherSellOrders(id);
            if (SellOrders == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<List<OtherSellOrderDto>>(SellOrders));
        }


        [HttpPut("InitiateNation/{id:int}")]
        [ValidateModel]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] List<CategoriesToInitiateDto> PutData)
        {
            if (PutData == null || !PutData.Any())
            {
                return BadRequest("No data provided for update.");
            }
            if (PutData.Count > 3) { return BadRequest("Too many categories specified. Max is 3"); }
           
            var SliderIdCategories = await InitiatedNationsRepository.SliderCategories(id);

            var CurrentGovType = PutData.First(p => p.InitiateTheTypeOf == "GovType");
            var NewGovType = SliderIdCategories.First(p =>  p.TypeOf == CurrentGovType.InitiateTheTypeOf && p.Class == CurrentGovType.SetItsClassTo);

            var CurrentGunControl = PutData.First(p => p.InitiateTheTypeOf == "GunControl");
            var NewGunControl = SliderIdCategories.First(p => p.TypeOf == CurrentGunControl.InitiateTheTypeOf && p.Class == CurrentGunControl.SetItsClassTo);

            var CurrentAlliance = PutData.First(p => p.InitiateTheTypeOf == "Alliance");
            var NewAlliance = SliderIdCategories.First(p => p.TypeOf == CurrentAlliance.InitiateTheTypeOf && p.Class == CurrentAlliance.SetItsClassTo);


            if (SliderIdCategories == null)
            {
                return NotFound(); //404 response
            }

            var MappedCategoriesModel = await InitiatedNationsRepository.InitiateCategories(id, 
                mapper.Map<CategoriesModel>(NewGovType),
                mapper.Map<CategoriesModel>(NewGunControl),
                mapper.Map<CategoriesModel>(NewAlliance)

                );

            if (MappedCategoriesModel == null)
            {
                return NotFound();
            }

            var NationEntity = await InitiatedNationsRepository.SingleNation(id);

            if (NationEntity == null)
            {
                return NotFound(); //404 response
            }
            if (NationEntity.IsInitiated == true)
            {
                return BadRequest("The nation has already been initiated");
            }
                NationEntity.IsInitiated = true;

            var MappedModel = await InitiatedNationsRepository.UpdateNation(id, NationEntity);

            if (MappedModel == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                Nation = mapper.Map<NationsDto>(MappedModel),
                Categories = MappedCategoriesModel
            });
        }//InitiateNation


        [HttpPut("SetAcategory/{id:int}")]
        [ValidateModel]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] SetAcategoryDto PutData)
        {
            var MappedModel = mapper.Map<CategoriesModel>(PutData);

            MappedModel = await InitiatedNationsRepository.SetAcategory(id, MappedModel);

            if (MappedModel == null)
            {
                return NotFound();
            }

            // Map Domain Model to DTO
            return Ok(mapper.Map<CategoriesDto>(MappedModel));
        }//SetAcategory


        [HttpPut("UpdateTheCoin/{id:int}")]
        [ValidateModel]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateMainCryptoDto PutData)
        {
            var MappedModel = mapper.Map<UpdateMainCryptoDto>(PutData);
            if (MappedModel == null)
            {
                return NotFound();
            }
            MappedModel = await InitiatedNationsRepository.UpdateTheCoin(id, MappedModel);

            return Ok(MappedModel);
        }


        [HttpPut("SellOrder/{id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Create([FromRoute] Guid id,[FromBody] NationalSellOrderDto PostData)
        {
            // Map the 'Walk' DTO to the corresponding Domain Model

            var MappedModel = await InitiatedNationsRepository.SellOrder(id,PostData);

            // Map Domain model to DTO
            return Ok(mapper.Map<NationalSellOrderResponseDto>(MappedModel));
        }


        [HttpPost("ExchangeCoinsStepA")]
        [ValidateModel]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> ExchangeCoinsStepA([FromBody] ExchangeCoinsStepADto StepA)
        {


            var PrepareExchange = await InitiatedNationsRepository.ExchangeCoinsStepA(StepA);
            if (PrepareExchange == null)
            {
                return NotFound();
            }
            return Ok(PrepareExchange);
        }


        [HttpPost("ExchangeCoinsStepB")]
        [ValidateModel]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> ExchangeCoinsStepB([FromBody] ExchangeCoinsStepBDto StepB)
        {
            var PerformExchange = await InitiatedNationsRepository.ExchangeCoinsStepB(StepB);
            if (PerformExchange == null)
            {
                return NotFound();
            }
            return Ok(PerformExchange);
        }


        [HttpDelete("DeleteNation/{id:int}")]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var deletedInitiatedCountryDomainModel = await InitiatedNationsRepository.DeleteNation(id);

            if (deletedInitiatedCountryDomainModel == null)
            {
                return NotFound(); //404 response
            }
            // Map Domain Model to DTO
            return Ok(mapper.Map<NationsDto>(deletedInitiatedCountryDomainModel));
        }
    }
}
