namespace CryptoNations.API.Models.Domain
{
    public class Region //This is the SQL table design
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string? RegionImageUrl { get; set; }
       
    }
}
