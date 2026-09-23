using CryptoNations.API.Models.Domain;

namespace CryptoNations.API.Repositories
{
    public interface IWalkRepository
    {
        /*Οταν λέμε inject ενοούμε pass it as parameter*/
        //Ολα αύτα υπάρχουν με definitions στο SQLWalkRepository.cs
        //To Interface απλα είναι ο μεσαζοντας ανάμεσα στο SQL και τα Controllers
        Task<Walk> CreateAsync(Walk walk);
        Task<List<Walk>> GetAllAsync(string? filterOn = null, string? filterQuery = null, 
            string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000);
        Task<Walk?> GetByIdAsync(Guid id);
        Task<Walk?> UpdateAsync(Guid id, Walk walk);
        Task<Walk?> DeleteAsync(Guid id);
    }
}
