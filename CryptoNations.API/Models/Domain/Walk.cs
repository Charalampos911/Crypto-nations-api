namespace CryptoNations.API.Models.Domain
{
    public class Walk //This is the SQL table design
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double LengthInKm { get; set; }
        public string? WalkImageUrl { get; set; }
        public Guid DifficultyId { get; set; }
        public Guid RegionId { get; set; }


        // Navigation properties - SOS -

        //Στο Dto το Entity θα γνωρίζει ότι οι πίνακες συνδέονται
        //Για να μπορέσει να τα συνδυάσει by-convention, 
        //δηλαδή: Difficulty + Id σε ένα DifficultyId
        //δηλαδή: Region + Id σε ένα Region              στο Dto!!! Note: To Id είναι μάλλον αυτό του Domain.Region
        public Difficulty Difficulty { get; set; }
        public Region Region { get; set; }
    }
}
