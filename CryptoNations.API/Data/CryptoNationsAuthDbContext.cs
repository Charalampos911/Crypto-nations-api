using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CryptoNations.API.Models.Domain;

namespace CryptoNations.API.Data
{
    public class CryptoNationsAuthDbContext : IdentityDbContext
    {
        
        public CryptoNationsAuthDbContext(DbContextOptions<CryptoNationsAuthDbContext> options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Οταν αλάξεις το βασικό Μodel τότε αυτόματα θα γίνει και DropColumn στο επόμενο update
            // Note: Αν άλλαξες το Dto, στην βάση ούτε γάτα ούτε ζημιά!
            // Αυτός είναι Custom κώδικας για να κάνει το Entity ignore se ένα property
            // Ετσι, η στήλη στην βάση δεν θα πάθει DropColumn αν την αφαιρέσω από το Model

            //This property - RegionImageUrl - will not be used in:
            // - No Migrations
            // - No Data Access
            // - No CRUD Operations

            //Ignore my table column if you changed the base model
            //builder.Entity<Region>().Ignore(p => p.RegionImageUrl);//Κάνω ignore
             
            base.OnModelCreating(builder);
            // Μοναδικές ταυτότητες - για τον κάθε ρόλο
            var readerRoleId = "a71a55d6-99d7-4123-b4e0-1218ecb90e3e"; // Ρόλος αναγνώστη
            var writerRoleId = "c309fa92-2123-47be-b397-a1c77adb502c"; // Ρόλος συντάκτη

            var roles = new List<IdentityRole>
            {
                new IdentityRole // Dto - για το "Seed data" του αναγνώστη
                {
                    Id = readerRoleId,
                    ConcurrencyStamp = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper()
                },
                new IdentityRole // Dto - για το "Seed data" του συντάκτη
                {
                    Id = writerRoleId,
                    ConcurrencyStamp = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper()
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
