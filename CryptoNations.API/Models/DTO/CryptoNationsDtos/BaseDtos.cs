using CryptoNations.API.Models.Domain.CryptoNationsModels;
using System.ComponentModel.DataAnnotations;

namespace CryptoNations.API.Models.DTO.CryptoNationsDtos
{
    public class NationsDto
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

        public List<CategoriesDto> Categories { get; set; } = new List<CategoriesDto>();
        //public int PortfolioId { get; set; }
        public List<CryptoDto> Crypto { get; set; } = new List<CryptoDto>();
    }

    public class CategoriesDto
    {
        public Guid Id { get; set; }
        public string TypeOf { get; set; }
        public string CategoryName { get; set; }
        public int Class { get; set; }
        public int Value { get; set; }
        public int Gains { get; set; }
        public bool IsActive { get; set; } = true;
        public int NationId { get; set; } // Foreign key to SliderModel
        //public NationsDto Nation { get; set; } // Navigation property
    }

    public class CategoriesToInitiateDto {
        [Required]
        public string InitiateTheTypeOf { get; set; }
        [Required]
        public int SetItsClassTo { get; set; }
    }

    public class SetAcategoryDto
    {
        [Required]
        public string CategoryName { get; set; }
        [Required]
        public int Value { get; set; }
        [Required]
        public int Gains { get; set; }

    }

    public class CryptoDto
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
        //public NationsDto OriginalNation { get; set; } // Navigation property
    }

    public class UpdateMainCryptoDto
    {
        [Required]
        public string TypeOf { get; set; }
        public decimal? Inflation { get; set; }
        public decimal? IniCirculation { get; set; }
        public decimal? AvailableReseves { get; set; }
        public decimal? ReservedForPayments { get; set; }
        public decimal? BankingDept { get; set; }
        public decimal? InvestmentDept { get; set; }
    }

    public class PortfolioListDto
    {
        public Guid Id { get; set; }
        public string TypeOf { get; set; }
        public string Name { get; set; }
        public string Acro { get; set; }
        public decimal HoldingAmount { get; set; }
        public decimal ForSaleAmount { get; set; }
        public int NationId { get; set; }
    }

    public class NationalSellOrderDto
    {
        public int SellOrderAmount { get; set; }
    }
    public class NationalSellOrderResponseDto
    {
        public int ForSaleAmount { get; set; }
    }
    public class OtherSellOrderDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Acro { get; set; }
        public decimal ForSaleAmount { get; set; }
        public int CurrentOwner { get; set; }
        public int OriginalNationId { get; set; }
    }

    public class ExchangeCoinsStepADto
    {
        [Required]
        public Guid CoinA { get; set; }
        [Required]
        public Decimal AmountA { get; set; }
        [Required]
        public Guid CoinB { get; set; }
    }

    public class ExchangeCoinsStepAresponseDto
    {
        public Guid CoinA { get; set; }
        public Decimal? AmountA { get; set; }
        public Decimal? ValuationA { get; set; }
   
        public Guid CoinB { get; set; }
        public Decimal? AmountB { get; set; }
        public Decimal? ValuationB { get; set; }

    }

    public class ExchangeCoinsStepBDto
    {
        [Required]
        public Guid CoinA { get; set; }
        [Required]
        public Decimal? AmountA { get; set; }

        [Required]
        public Guid CoinB { get; set; }
        [Required]
        public Decimal? AmountB { get; set; }

    }

    public class ExchangeCoinsStepBresponseDto
    {
        public Guid CoinA { get; set; }
        public Decimal? AmountA { get; set; }

        public Guid CoinB { get; set; }
        public Decimal? AmountB { get; set; }
      
        public string SuccessMessage { get; set; }
    }
























    /* PUT */
    public class UpdateInitiatedCountryDto
    {
        [Required]
        public int NationId { get; set; }
     
        [Required]
        public int CountryTypeId { get; set; }

        [Required]
        public int GunControlTypeId { get; set; }
 
        [Required]
        public int AllianceTypeId { get; set; }
  
        [Required]
        public int SliderId { get; set; }


    }





    public class CoinDto
    {
        public int PrintedBalance { get; set; }
        public int IniCirculation { get; set; }
        public int AvailableReserves { get; set; }
        public int MaxSupply { get; set; }
        public int ReservedForPayments { get; set; }
    }
    public class TokenDto
    {
        public int PrintedBalance { get; set; }
        public int IniCirculation { get; set; }
        public int AvailableReserves { get; set; }
        public int MaxSupply { get; set; }
        public int ReservedForPayments { get; set; }
    }
}
