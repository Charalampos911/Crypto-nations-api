using CryptoNations.API.Models.Domain;
using System.Runtime.InteropServices;

namespace CryptoNations.API.Repositories
{
    public interface IRegionRepository
    {
        /*Οταν λέμε inject ενοούμε pass it as parameter*/
        //Ολα αύτα υπάρχουν με definitions στο SQLRegionRepository.cs
        //To Interface απλα είναι ο μεσαζοντας ανάμεσα στο SQL και τα Controllers
        //These are 5 definitions of methods that can be implemented i na  concrete class

        Task<List<Region>> GetAllAsync();

        Task<Region?> GetByIdAsync(Guid id);

        Task<Region> CreateAsync(Region region);

        Task<Region?> UpdateAsync(Guid id, Region region);

        Task<Region?> DeleteAsync(Guid id);
    }
}
