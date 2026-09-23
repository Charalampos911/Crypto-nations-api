using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//By importing the namespace, now you can use [ValidateModel],
//from the folder 'CustomActionFilters'
using CryptoNations.API.CustomActionFilters;

using CryptoNations.API.Data;
using CryptoNations.API.Models.Domain;
using CryptoNations.API.Models.DTO;
using CryptoNations.API.Repositories;//  =>   This is a called a lamda expression

namespace CryptoNations.API.Controllers
{
    // https://localhost:1234/api/regions;
    //[Route("api/[controller]")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class RegionsController : ControllerBase
    {
        private readonly CryptoNationsDbContext dbContext;
        private readonly IRegionRepository regionRepository;
        private readonly IMapper mapper;
        private readonly ILogger<RegionsController> logger;
        //Here we perform constructor injection,
        // In the program.cs we perform Dependency Injection, those are global!
        public RegionsController // Constructor
            (
                // constructor Injections - Bring global into local
                CryptoNationsDbContext dbContext, 
                IRegionRepository regionRepository,             
                IMapper mapper,                                 
                ILogger<RegionsController> logger
            )             
        {
            //Bring global into local
            this.dbContext = dbContext;
            this.regionRepository = regionRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        // GET ALL REGIONS
        // GET: https://localhost:portnumber/api/regions
        [MapToApiVersion("1.0")]
        [HttpGet]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> GetAllV1()
        {
            // Get Data From Database - Domain models
            // We call the SQL repository through the Interface
            var regionsDomain = await regionRepository.GetAllAsync(); //from interface

            // Get according to Dto from the Domain.Model and return it
            return Ok(mapper.Map<List<RegionDto>>(regionsDomain));
        }
        //V2
        // GET ALL REGIONS
        // GET: https://localhost:portnumber/api/regions
        [MapToApiVersion("2.0")]
        [HttpGet]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> GetAllV2(ApiVersion apiVesrion )
        {
            // Access the version information
            string version = apiVesrion.ToString();
            // Debug or log the API version
            Console.WriteLine("API Version: " + version);

            // Get Data From Database - Domain models
            // We call the SQL repository through the Interface
            var regionsDomain = await regionRepository.GetAllAsync();

            // Get according to Dto from the Domain.Model and return it
            return Ok(mapper.Map<List<RegionDto>>(regionsDomain));
        }
        //V2

        // GET SINGLE REGION (Get Region By ID)
        // GET: https://localhost:portnumber/api/regions/{id}
        [MapToApiVersion("1.0")]
        [HttpGet]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Reader")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            //var region = dbContext.Regions.Find(id);
            // Get Region Domain Model From Database
            var regionDomain = await regionRepository.GetByIdAsync(id);

            //Alternative ways - NOT ASYNC!
            var region00 = dbContext.Regions.Find(id);
            var region01 = dbContext.Regions.FirstOrDefault(x=>x.Id == id);
          

            if (regionDomain == null)
            {
                return NotFound();
            }

            // Return DTO back to client
            //return ok(mapper.map<destination>(source));
            // Store the Source mapped into the Destination
            return Ok(mapper.Map<RegionDto>(regionDomain));
        }


        // POST To Create New Region
        // POST: https://localhost:portnumber/api/regions
        [MapToApiVersion("1.0")]
        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Create([FromBody] AddRegionRequestDto addRegionRequestDto)
        {
            // Map or Convert DTO to Domain Model
            var regionDomainModel = mapper.Map<Region>(addRegionRequestDto);

            // Use Domain Model to create Region
            regionDomainModel = await regionRepository.CreateAsync(regionDomainModel);

            // Map Domain model back to DTO
            var regionDto = mapper.Map<RegionDto>(regionDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = regionDto.Id }, regionDto);
        }


        // Update region
        // PUT: https://localhost:portnumber/api/regions/{id}
        [MapToApiVersion("1.0")]
        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateRegionRequestDto updateRegionRequestDto)
        {

            // Map DTO to Domain Model
            var regionDomainModel = mapper.Map<Region>(updateRegionRequestDto);

            // Check if region exists
            // Call from the Interface Repository, the implementation inside the SQL repository
            regionDomainModel = await regionRepository.UpdateAsync(id,regionDomainModel);

            //Syncronus alternatives
            var regionDomainModel00 = dbContext.Regions.FirstOrDefault(x => x.Id == id);

            if (regionDomainModel == null)
            {
                return NotFound();
            }
            //From the Dto, Update the Domain.Model, update into the database
            return Ok(mapper.Map<RegionDto>(regionDomainModel));// Map the (...) into like the <...>
        }


        // Delete Region
        // DELETE: https://localhost:portnumber/api/regions/{id}
        [MapToApiVersion("1.0")]
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            //Από το IRegionRepository, που σε στέλνει στο SQLRegionRepository
            var regionDomainModel = await regionRepository.DeleteAsync(id);//Perform the delete

            //Syncronus Alternatives
            var regionDomainModel01= dbContext.Regions.FirstOrDefault( x => x.Id == id);    

            if (regionDomainModel == null) //Case the Perform Delete returns null
            {
                return NotFound();
            }

            return Ok(mapper.Map<RegionDto>(regionDomainModel)); //Else return what was deleted!
        }
    }
}
