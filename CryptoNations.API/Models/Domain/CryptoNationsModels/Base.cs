using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CryptoNations.API.Models.Domain.CryptoNationsModels
{

        public class NationsModel
        {
            public int Id { get; set; }
            public string TokenAcro { get; set; } = string.Empty;
            public string Name { get; set; } = string.Empty;
            public string Token { get; set; } = string.Empty;
            public string Flag { get; set; } = string.Empty;
            public bool IsInitiated { get; set; }
            public int InternationalStanding { get; set; }
            public List<string> Path { get; set; } = new List<string>();
            //public int SliderId { get; set; }
            //public SliderModel Slider { get; set; }

            public List<CategoriesModel> Categories { get; set; } = new List<CategoriesModel>();
            //public int PortfolioId { get; set; }
            public List<CryptoModel> Crypto { get; set; } = new();
        }

        public class CategoriesModel
        {
            public Guid Id { get; set; }
            public string TypeOf { get; set; }
            public string CategoryName { get; set; }
            public int Class { get; set; }
            public int Value { get; set; }
            public int Gains { get; set; }
            public bool IsActive { get; set; } = true;
            public int NationId { get; set; } // Foreign key to SliderModel
            public NationsModel Nation { get; set; } // Navigation property
        }   

        public class CryptoModel
    {
            public Guid Id { get; set; }
            public string TypeOf { get; set; }
            public string Name { get; set; }
            public string Acro { get; set; }
            public decimal? HoldingAmount { get; set; }
            public decimal? ForSaleAmount { get; set; }
            public decimal? ForeignHolding { get; set; }
            public decimal? Inflation { get; set; }
            public decimal? IniCirculation { get; set; }
            public decimal AvailableReseves { get; set; }
            public decimal MaxSupply { get; set; }
            public decimal? ReservedForPayments { get; set; }
            public decimal? BankingDept { get; set; }
            public decimal? InvestmentDept { get; set; }
            public int CurrentOwner { get; set; }
            public int OriginalNationId { get; set; } // Foreign key to NationsModel
            public NationsModel OriginalNation { get; set; } // Navigation property
    }
}
