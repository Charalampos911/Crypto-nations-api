using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using CryptoNations.API.Data;
using CryptoNations.API.Models.Domain;
/*
 * This is a "CONCRETE" class, meaning the class that contains the "IMPLEMENTATION"
 */
namespace CryptoNations.API.Repositories
{
    public class SQLWalkRepository : IWalkRepository
    {
        /*Οταν λέμε inject ενοούμε pass it as parameter*/
        private readonly CryptoNationsDbContext dbContext;

        public SQLWalkRepository(CryptoNationsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public async Task<Walk> CreateAsync(Walk walk)
        { 
            //Στο Context, βρές τα Walks, όπως είναι δηλωμένα
            await dbContext.Walks.AddAsync(walk);//Entity AddAsync() - Πρόσθεσε ΝΕΑ ΕΓΓΡΑΦΗ στα walk 
            await dbContext.SaveChangesAsync(); //και αποθήκευση!
            return walk;
        }

        public async Task<Walk?> DeleteAsync(Guid id)
        {
            //Στο Context, βρές τα Walks, όπως είναι δηλωμένα, Βρές σε αυτά το πρώτο Match!
            var existingWalk = await dbContext.Walks.FirstOrDefaultAsync(x => x.Id == id);

            //Αν το Match δεν υπάρχει
            if (existingWalk == null)
            {
                return null;
            }

            //Αλλιώς αν υπάρχει...
            dbContext.Walks.Remove(existingWalk);//Entity Remove() - ΔΙΕΓΡΑΨΕ ένα existingWalk
            await dbContext.SaveChangesAsync();//και αποθήκευση!
            return existingWalk;
        }

        public async Task<List<Walk>> GetAllAsync(string? filterOn = null, string? filterQuery = null,
            string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000)
        {
            //Generic Type- Not type safe!
            //Γενικό fetch - επιστρέφει τα πάντα
            //Εξαίρεση: Σε περίπτωση πού υπάρχουν Queries, θα επιστρέψει το υπο-συνολο
            //Εδώ το Entity αυτόματα fetch-αρει και τα "Difficulty" και "Region" using their Id
            var walks = dbContext.Walks.Include("Difficulty").Include("Region").AsQueryable();

            //TYPE SAFE WAY- 
            var walks2 = dbContext.Walks.Include(x=>x.Difficulty).Include(x=>x.Region).AsQueryable();

            // Filtering
            if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                //Case Name is provided and isn't equal to null or WhiteSpace
                if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    //Will return a sub-total of walks where the filter matches!
                    walks = walks.Where(x => x.Name.Contains(filterQuery));
                }
            }

            // Sorting 
            if (string.IsNullOrWhiteSpace(sortBy) == false)
            {
                //Case Name is provided and isn't equal to null or WhiteSpace
                if (sortBy.Equals("Name", StringComparison.OrdinalIgnoreCase)) // "Name" is the user input in swagger
                {
                    // Will return a sub - total of walks where the filter matches!
                    walks = isAscending ? walks.OrderBy(x => x.Name): walks.OrderByDescending(x => x.Name);
                }
                //Case Length is provided and isn't equal to null or WhiteSpace
                else if (sortBy.Equals("Length", StringComparison.OrdinalIgnoreCase)) // "Length" is the user input in swagger
                {
                    // Will return a sub - total of walks where the filter matches!
                    walks = isAscending ? walks.OrderBy(x => x.LengthInKm) : walks.OrderByDescending(x => x.LengthInKm);
                }
            }

            // Pagination
            var skipResults = (pageNumber - 1) * pageSize; //Example, Skip pages 1 and 2 and only return page 3

            //Explanation: Skip pages 1 and 2 and only return page 3
            return await walks.Skip(skipResults).Take(pageSize).ToListAsync();
        }

        public async Task<Walk?> GetByIdAsync(Guid id)
        {
            //Fetch single result where the Ids match
            return await dbContext.Walks
                .Include("Difficulty")
                .Include("Region")
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Walk?> UpdateAsync(Guid id, Walk walk)
        {
            //Ειδικό fetch - επιστρέφει τις επιλογές
            var existingWalk = await dbContext.Walks.FirstOrDefaultAsync(x => x.Id == id);

            //Αν το Match δεν υπάρχει
            if (existingWalk == null)
            {
                return null;
            }

            //Αλλιώς αν υπάρχει...
            //Κάνω ένα CASE-BY-CASE update
            existingWalk.Name = walk.Name;
            existingWalk.Description = walk.Description;
            existingWalk.LengthInKm = walk.LengthInKm;
            existingWalk.WalkImageUrl = walk.WalkImageUrl;
            existingWalk.DifficultyId = walk.DifficultyId;
            existingWalk.RegionId = walk.RegionId;

            await dbContext.SaveChangesAsync();//και αποθήκευση!

            return existingWalk;
        }
    }
}
