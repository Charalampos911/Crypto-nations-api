using System.ComponentModel.DataAnnotations.Schema;

namespace CryptoNations.API.Data
{
    public class Hotel //   <<-- This is an Entity, and its used to monitor a database table!
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Rating { get; set; }
        //[ForeignKey("CountryId")]//This is the way of MAGIC STRING - Direct!
        [ForeignKey(nameof(CountryId))]
        public int CountryId { get; set; }

        public Country Country { get; set; } //Entity - relation

    }
}
