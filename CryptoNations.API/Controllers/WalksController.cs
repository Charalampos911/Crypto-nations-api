using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using CryptoNations.API.CustomActionFilters;
using CryptoNations.API.Models.Domain;
using CryptoNations.API.Models.DTO;
using CryptoNations.API.Repositories;
using System.Net;

//Include this for swagger annotations
using Swashbuckle.AspNetCore.Annotations;

namespace CryptoNations.API.Controllers
{
    // /api/walks
    [Route("api/[controller]")]
    [ApiController]
    public class WalksController : ControllerBase
    {
        private readonly IMapper mapper; //Load the Injected Mapper Service. from the program.cs as 'mapper'
        private readonly IWalkRepository walkRepository;

        public WalksController(IMapper mapper, IWalkRepository walkRepository) //Then Inject the 'mapper' to the constructor
        {
            this.mapper = mapper; //So you can use the 'mapper'
            this.walkRepository = walkRepository;
        }


        // CREATE Walk
        // POST: /api/walks
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] AddWalkRequestDto addWalkRequestDto)
        {
            // Map the 'Walk' DTO to the corresponding Domain Model
            var walkDomainModel = mapper.Map<Walk>(addWalkRequestDto);

            await walkRepository.CreateAsync(walkDomainModel);

            // Map Domain model to DTO
            return Ok(mapper.Map<WalkDto>(walkDomainModel));
        }


        // GET Walks
        // Παράδειγμα με Queries!!!
        // GET: /api/walks?filterOn=Name&filterQuery=Track&sortBy=Name&isAscending=true&pageNumber=1&pageSize=10
        [HttpGet]
        [SwaggerOperation(
            Summary = "Retrieve all walks",
            Description = "Retrieves a list of all walks, with optional filtering, sorting, and pagination."
        )]
        public async Task<IActionResult> GetAll(
            [SwaggerParameter(Description = "The field to filter on (e.g., 'Name').")] [FromQuery] string? filterOn, // ΔλΔ. filterProperty
            [SwaggerParameter(Description = "The value to filter by.")] [FromQuery] string? filterQuery,// ΔλΔ. filterPropertyValue
            [SwaggerParameter(Description = "The field to sort by (e.g., 'Name' or 'Length') *Select the sorting Column!!!.")] [FromQuery] string? sortBy,
            [SwaggerParameter(Description = "Sort order (true for ascending, false for descending) *Sort the Sorting column Aphabetically or in reverse.")][FromQuery] bool? isAscending,
            [SwaggerParameter(Description = "Page number for pagination.")] [FromQuery] int pageNumber = 1,
            [SwaggerParameter(Description = "Number of items per page for pagination.")][FromQuery] int pageSize = 1000) //Μετά πάμε στο SQLRepository
        {
            var walksDomainModel = await walkRepository.GetAllAsync(filterOn, filterQuery, sortBy,
                //This is a  nullable boolean ?? if it is not provided, default back to true
                isAscending ?? true, pageNumber, pageSize);

            // Map Domain Model to DTO
            return Ok(mapper.Map<List<WalkDto>>(walksDomainModel));
        }

        // Get Walk By Id
        // GET: /api/Walks/{id}
        [HttpGet]
        [Route("{id:Guid}")]// we add Guid here to make it type safe!
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var walkDomainModel = await walkRepository.GetByIdAsync(id);

            if (walkDomainModel == null)
            {
                return NotFound(); //404 response
            }

            // Map Domain Model to DTO
            return Ok(mapper.Map<WalkDto>(walkDomainModel));
        }

        // Update Walk By Id
        // PUT: /api/Walks/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        public async Task<IActionResult> Update([FromRoute] Guid id, UpdateWalkRequestDto updateWalkRequestDto)
        {

            // Map DTO to Domain Model
            var walkDomainModel = mapper.Map<Walk>(updateWalkRequestDto);

            walkDomainModel = await walkRepository.UpdateAsync(id, walkDomainModel);

            if (walkDomainModel == null)
            {
                return NotFound();
            }

            // Map Domain Model to DTO
            return Ok(mapper.Map<WalkDto>(walkDomainModel));
        }


        // Delete a Walk By Id
        // DELETE: /api/Walks/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedWalkDomainModel = await walkRepository.DeleteAsync(id);

            if (deletedWalkDomainModel == null)
            {
                return NotFound(); //404 response
            }

            // Map Domain Model to DTO
            return Ok(mapper.Map<WalkDto>(deletedWalkDomainModel));
        }
    }
}
