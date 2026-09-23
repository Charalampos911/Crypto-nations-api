using Microsoft.EntityFrameworkCore;
using CryptoNations.API.Data;
using CryptoNations.API.Models.Domain;
/*
 * This is a "CONCRETE" class, meaning the class that contains the "IMPLEMENTATION"
 */

namespace CryptoNations.API.Repositories
{
    public class SQLRegionRepository : IRegionRepository
    {
        /*Οταν λέμε inject ενοούμε pass it as parameter*/
        private readonly CryptoNationsDbContext dbContext;

        public SQLRegionRepository(CryptoNationsDbContext dbContext)//(Constructor Injection)
        {
            this.dbContext = dbContext;
        }

        public async Task<Region> CreateAsync(Region region)
        {
            //Στο Context, βρές τα Regions, όπως είναι δηλωμένα
            await dbContext.Regions.AddAsync(region); //Entity AddAsync() - Πρόσθεσε ΝΕΑ ΕΓΓΡΑΦΗ στα Regions 
            await dbContext.SaveChangesAsync(); //και αποθήκευση!
            return region;
        }

        public async Task<Region?> DeleteAsync(Guid id)
        {
            //Στο Context, βρές τα Regions, όπως είναι δηλωμένα, Βρές σε αυτά το πρώτο Match!
            var existingRegion = await dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);

            //Αν το Match δεν υπάρχει
            if (existingRegion == null) 
            {
                return null;
            }

            //Αλλιώς αν υπάρχει...
            dbContext.Regions.Remove(existingRegion); //Entity Remove() - ΔΙΕΓΡΑΨΕ ένα existingRegion
            await dbContext.SaveChangesAsync();  //και αποθήκευση!
            return existingRegion;
        }

        public async Task<List<Region>> GetAllAsync()
        {
            //Γενικό fetch - επιστρέφει τα πάντα
            return await dbContext.Regions.ToListAsync(); 
        }

        public async Task<Region?> GetByIdAsync(Guid id)
        {
            //Ειδικό fetch - επιστρέφει τις επιλογές
            return await dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id); 
        }

        public async Task<Region?> UpdateAsync(Guid id, Region region)
        {
            //Ειδικό fetch - επιστρέφει τις επιλογές
            var existingRegion = await dbContext.Regions.FirstOrDefaultAsync(x => x.Id == id);

            //Αν το Match δεν υπάρχει
            if (existingRegion == null)
            {
                return null;
            }

            //Αλλιώς αν υπάρχει...
            //Κάνω ένα CASE-BY-CASE update
            existingRegion.Code = region.Code;
            existingRegion.Name = region.Name;
            existingRegion.RegionImageUrl = region.RegionImageUrl;

            await dbContext.SaveChangesAsync();//και αποθήκευση!
            return existingRegion;
        }
    }
}
