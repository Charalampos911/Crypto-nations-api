using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using CryptoNations.API.Data;
using CryptoNations.API.Models.Domain;
using CryptoNations.API.Models.Domain.CryptoNationsModels;
using CryptoNations.API.Models.DTO.CryptoNationsDtos;
using Microsoft.Extensions.Options;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Drawing;
using System;
using Azure;
/*
 * This is a "CONCRETE" class, meaning the class that contains the "IMPLEMENTATION"
 */
namespace CryptoNations.API.Repositories
{
    public class SQLNationsRepository : INationsRepository
    {
        private readonly CryptoNationsDbContext dbContext;
        private readonly IMapper mapper; //Load the Injected Mapper Service. from the program.cs as 'mapper'

        public SQLNationsRepository(CryptoNationsDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }
        //
        // SingleNation
        //
        public async Task<NationsModel?> SingleNation(int id)
        {
            var Nations =  await dbContext.Nations
                .FirstOrDefaultAsync(n => n.Id == id);

            return Nations;
        }
        //
        // FullNation
        //
        public async Task<List<NationsDto?>> FullNation(int id)
        {
            try
            {
                var nations = await dbContext.Nations
                    .Where(n => n.Id == id)
                    .Include(n => n.Categories)
                    .Include(n => n.Crypto)
                    .ToListAsync();

                return mapper.Map<List<NationsDto>>(nations);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logger)
                Console.WriteLine($"Error fetching nation data: {ex.Message}");
                return null;
            }
        }
        //
        // NationsWithQuery
        //
        public async Task<List<NationsModel>> NationsWithQuery(string? filterOn = null, string? filterQuery = null,
        string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000)
        {
            //TYPE SAFE WAY- 
            var Countries = dbContext.Nations.AsQueryable();

            // Filtering
            if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                //Case Name is provided and isn't equal to null or WhiteSpace
                if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    //Will return a sub-total of walks where the filter matches!
                    Countries = Countries.Where(x => x.Name.Contains(filterQuery));
                }
            }

            // Sorting 
            if (string.IsNullOrWhiteSpace(sortBy) == false)
            {
                //Case Name is provided and isn't equal to null or WhiteSpace
                if (sortBy.Equals("Name", StringComparison.OrdinalIgnoreCase)) // "Name" is the user input in swagger
                {
                    Countries = isAscending ? Countries.OrderBy(x => x.Name) : Countries.OrderByDescending(x => x.Name);
                }
                //Case Length is provided and isn't equal to null or WhiteSpace
                else if (sortBy.Equals("TokenAcro", StringComparison.OrdinalIgnoreCase)) // "Length" is the user input in swagger
                {
                    Countries = isAscending ? Countries.OrderBy(x => x.TokenAcro) : Countries.OrderByDescending(x => x.TokenAcro);
                }
            }

            // Pagination
            var skipResults = (pageNumber - 1) * pageSize; //Example, Skip pages 1 and 2 and only return page 3

            //Explanation: Skip pages 1 and 2 and only return page 3
            return await Countries.Skip(skipResults).Take(pageSize).ToListAsync();
        }
        //
        // GetNationalPortfolio
        //
        public async Task<List<CryptoModel?>> GetNationalPortfolio(int id)
        {
            var Nation = await dbContext.Nations.FirstOrDefaultAsync(x => x.Id == id && x.IsInitiated == true);
            if(Nation == null)
            {
                return null;
            }

            var NationalPortfolio = await dbContext.Cryptos
                                            .Where(x => x.CurrentOwner == id && x.TypeOf != "NationalToken" && (x.HoldingAmount > 0 || x.ForSaleAmount > 0))
                                            .ToListAsync();
            return NationalPortfolio;
        }
        //
        // GetNationalSellOrders
        //
        public async Task<List<CryptoModel?>> GetNationalSellOrders(int id)
        {
            var Nation = await dbContext.Nations.FirstOrDefaultAsync(x => x.Id == id && x.IsInitiated == true);
            if (Nation == null)
            {
                return null;
            }

            var SellOrders = await dbContext.Cryptos
                                            .Where(x => x.CurrentOwner == id && x.ForSaleAmount > 0)
                                            .ToListAsync();
     
            return SellOrders;
        }
        //
        // GetOtherSellOrders
        //
        public async Task<List<CryptoModel?>> GetOtherSellOrders(int id)
        {

            var SellOrders = await dbContext.Cryptos
                                            .Where(x => x.CurrentOwner != id && x.ForSaleAmount > 0)
                                            .ToListAsync();
            return SellOrders;
        }
        //
        // SliderCategories
        //
        public async Task<List<CategoriesDto>> SliderCategories(int id)
        {
            var categories = await dbContext.Categories
                                            .Where(x => x.NationId == id)
                                            .ToListAsync();

            // Map the result to CategoriesDto
            return mapper.Map<List<CategoriesDto>>(categories);
        }
        //
        // InitiateCategories
        //
        public async Task<List<CategoriesDto?>> InitiateCategories(int id, CategoriesModel GovType, CategoriesModel GunControl, CategoriesModel Alliance)
        {
            //Ειδικό fetch - επιστρέφει τις επιλογές
            var GovTypeCategory = await dbContext.Categories
                                            .FirstOrDefaultAsync(x => x.NationId == id
                                                                      && x.TypeOf == GovType.TypeOf
                                                                      && x.Class == GovType.Class);
            var GunControlcategory = await dbContext.Categories
                                .FirstOrDefaultAsync(x => x.NationId == id
                                                          && x.TypeOf == GunControl.TypeOf
                                                          && x.Class == GunControl.Class);
            var Alliancecategory = await dbContext.Categories
                    .FirstOrDefaultAsync(x => x.NationId == id
                                              && x.TypeOf == Alliance.TypeOf
                                              && x.Class == Alliance.Class);
            // If no match is found, return null
            if (GovTypeCategory == null || GunControlcategory == null || Alliancecategory == null)
            {
                return null;
            }

            // Update the category
            GovTypeCategory.IsActive = true;
            GunControlcategory.IsActive = true;
            Alliancecategory.IsActive = true;
            var NotGovTypeCategory = await dbContext.Categories
                                    .Where(x => x.NationId == id
                                              && x.TypeOf == GovType.TypeOf
                                              && x.Class != GovType.Class).ToListAsync();
            var NotGunControlcategory = await dbContext.Categories
                                    .Where(x => x.NationId == id
                                              && x.TypeOf == GunControl.TypeOf
                                              && x.Class != GunControl.Class).ToListAsync();
            var NotAlliancecategory = await dbContext.Categories
                                    .Where(x => x.NationId == id
                                              && x.TypeOf == Alliance.TypeOf
                                              && x.Class != Alliance.Class).ToListAsync();
            NotGovTypeCategory.ForEach(c => c.IsActive = false);
            NotGunControlcategory.ForEach(c => c.IsActive = false);
            NotAlliancecategory.ForEach(c => c.IsActive = false);

            // Save changes to the database
            await dbContext.SaveChangesAsync();
            var ActiveCategories = new List<CategoriesModel>
            {
                GovTypeCategory,
                GunControlcategory,
                Alliancecategory
            };

            var combinedCategories = ActiveCategories
                                    .Concat(NotGovTypeCategory)
                                    .Concat(NotGunControlcategory)
                                    .Concat(NotAlliancecategory)
                                    .ToList();
            //return categories;
            return mapper.Map<List<CategoriesDto?>>(combinedCategories);

        }
        //
        // UpdateNation
        //
        public async Task<NationsModel?> UpdateNation(int id, NationsModel Country)
        {
            //Ειδικό fetch - επιστρέφει τις επιλογές
            var Nations = await dbContext.Nations
                .FirstOrDefaultAsync(x => x.Id == id 
            );

            //Αν το Match δεν υπάρχει
            if (Nations == null)
            {
                return null;
            }

            await dbContext.SaveChangesAsync();//και αποθήκευση!

            return Nations;
        }
        //
        // SetAcategory
        //
        public async Task<CategoriesModel?> SetAcategory(int id, CategoriesModel category)
        {
            //Ειδικό fetch - επιστρέφει τις επιλογές
            var AlteredCategory = await dbContext.Categories
                                            .FirstOrDefaultAsync(x => x.NationId == id
                                            && x.CategoryName == category.CategoryName);
            if (AlteredCategory == null)
            {
                return null;
            }
            if (AlteredCategory.CategoryName == "Dictatorship" ||
                AlteredCategory.CategoryName == "Democracy" ||
                AlteredCategory.CategoryName == "Republic" ||
                AlteredCategory.CategoryName == "Total Ban" ||
                AlteredCategory.CategoryName == "Home Defence" ||
                AlteredCategory.CategoryName == "Open Carry" ||
                AlteredCategory.CategoryName == "Solo Campaign" ||
                AlteredCategory.CategoryName == "Small Alliance" ||
                AlteredCategory.CategoryName == "Intercontinental Block"
                ) {
                
                var ResetTypeCategories = await dbContext.Categories
                                            .Where(x => x.NationId == id
                                             && x.TypeOf == AlteredCategory.TypeOf).ToListAsync();
                foreach (var Row in ResetTypeCategories)
                {
                    Row.IsActive = false;
                }
                AlteredCategory.IsActive = true;
            }
            
            AlteredCategory.Value = category.Value;
            AlteredCategory.Gains = category.Gains;

            await dbContext.SaveChangesAsync();

            var totalGains = await dbContext.Categories
                .Where(c => c.NationId == id && c.IsActive == true)
                .SumAsync(c => c.Gains);
            var Nation = await dbContext.Nations.FirstOrDefaultAsync(x => x.Id == id);
                Nation.InternationalStanding = totalGains;

            await dbContext.SaveChangesAsync();
            return AlteredCategory;
        }
        //
        // UpdateTheCoin
        //
        public async Task<UpdateMainCryptoDto?> UpdateTheCoin(int id, UpdateMainCryptoDto Crypto)
        {
            var Nation = await dbContext.Nations.FirstOrDefaultAsync(x => x.Id == id && x.IsInitiated == true);
            if (Nation == null)
            {
                return null;
            }
            //Ειδικό fetch - επιστρέφει τις επιλογές
            var AlteredCrypto = await dbContext.Cryptos
                                            .FirstOrDefaultAsync(x => x.CurrentOwner == id
                                                                      && x.TypeOf == Crypto.TypeOf);
            if (AlteredCrypto == null)
            {
                return null;
            }
            if (Crypto.Inflation.HasValue &&
                (0 <= (AlteredCrypto.HoldingAmount + Crypto.Inflation) && // Min deflation
                (AlteredCrypto.Inflation + Crypto.Inflation) <= AlteredCrypto.MaxSupply)) // Max inflation
            {
                AlteredCrypto.Inflation += Crypto.Inflation;
            }
            // --> ok

            if (Crypto.IniCirculation.HasValue &&
                ((Crypto.IniCirculation > 0 && AlteredCrypto.HoldingAmount >= Crypto.IniCirculation) || // Subsidy
                 (Crypto.IniCirculation < 0 && AlteredCrypto.IniCirculation >= Math.Abs(Crypto.IniCirculation.Value)))) // Taxes
            {
                AlteredCrypto.IniCirculation += Crypto.IniCirculation;
            }

            if (Crypto.ReservedForPayments.HasValue &&
                ((Crypto.ReservedForPayments > 0 && AlteredCrypto.HoldingAmount >= Crypto.ReservedForPayments) || // Adding
                 (Crypto.ReservedForPayments < 0 && AlteredCrypto.ReservedForPayments >= Math.Abs(Crypto.ReservedForPayments.Value)))) // Subtracting
            {
                AlteredCrypto.ReservedForPayments += Crypto.ReservedForPayments;
            }
            // --> ok

            if (Crypto.BankingDept.HasValue &&
                ((Crypto.BankingDept > 0 && AlteredCrypto.HoldingAmount >= Crypto.BankingDept) || // Adding
                 (Crypto.BankingDept < 0 && AlteredCrypto.BankingDept >= Math.Abs(Crypto.BankingDept.Value)))) // Subtracting
            {
                AlteredCrypto.BankingDept += Crypto.BankingDept;
            }
            // --> ok

            if (Crypto.InvestmentDept.HasValue &&
                 ((Crypto.InvestmentDept > 0 && AlteredCrypto.HoldingAmount >= Crypto.InvestmentDept) || // Adding
                  (Crypto.InvestmentDept < 0 && AlteredCrypto.InvestmentDept >= Math.Abs(Crypto.InvestmentDept.Value)))) // Subtracting
            {
                AlteredCrypto.InvestmentDept += Crypto.InvestmentDept;
            }
            // --> ok

            var NewHoldingAmount =
                AlteredCrypto.Inflation -
                AlteredCrypto.IniCirculation -
                AlteredCrypto.ForSaleAmount -
                AlteredCrypto.ForeignHolding -
                AlteredCrypto.ReservedForPayments -
                AlteredCrypto.BankingDept -
                AlteredCrypto.InvestmentDept;
                AlteredCrypto.HoldingAmount = NewHoldingAmount;

            await dbContext.SaveChangesAsync();
            return mapper.Map<UpdateMainCryptoDto>(AlteredCrypto);

        }
        //
        // SellOrder
        //
        public async Task<CryptoModel?> SellOrder(Guid id, NationalSellOrderDto SellOrder)
        {
            var ForSellOrder = await dbContext.Cryptos
                                            .FirstOrDefaultAsync(x => x.Id == id);
            if (ForSellOrder.HoldingAmount >= SellOrder.SellOrderAmount)
            {

                ForSellOrder.ForSaleAmount += SellOrder.SellOrderAmount;
            }

            var NewHoldingAmount =
                ForSellOrder.Inflation -
                ForSellOrder.IniCirculation -
                ForSellOrder.ForSaleAmount -
                ForSellOrder.ForeignHolding -
                ForSellOrder.ReservedForPayments -
                ForSellOrder.BankingDept -
                ForSellOrder.InvestmentDept;
                ForSellOrder.HoldingAmount = NewHoldingAmount;

            await dbContext.SaveChangesAsync();
            return ForSellOrder;
        }
        //
        // ExchangeCoinsStepA
        //
        public async Task<ExchangeCoinsStepAresponseDto?> ExchangeCoinsStepA(ExchangeCoinsStepADto StepA)
        {
            var CoinA = await dbContext.Cryptos.FirstOrDefaultAsync(x => x.Id == StepA.CoinA);
            if (CoinA == null) return null;
    
            var OriginalA = await dbContext.Cryptos.FirstOrDefaultAsync(x => x.TypeOf == "NationalCoin" && x.OriginalNationId == CoinA.OriginalNationId);
            
            var NationA = await dbContext.Nations.FirstOrDefaultAsync(x => x.Id == CoinA.CurrentOwner);
            if (NationA == null) return null;

            var CoinB = await dbContext.Cryptos.FirstOrDefaultAsync(x => x.Id == StepA.CoinB);
            if (CoinB == null) return null;

            var OriginalB = await dbContext.Cryptos.FirstOrDefaultAsync(x => x.TypeOf == "NationalCoin" && x.OriginalNationId == CoinB.OriginalNationId);

            var NationB = await dbContext.Nations.FirstOrDefaultAsync(x => x.Id == CoinB.CurrentOwner);
            if (NationB == null) return null;

            var AmountA = StepA.AmountA;

            if (CoinA.HoldingAmount >= AmountA)//Available funds
            {
                var ValuationA = (1 - (OriginalA.Inflation / 1000)) *
                    (NationA.InternationalStanding - 2350) / (4000 - 2350); // (Max - Min)

                var ValuationB = (1 - (CoinB.Inflation / 1000)) *
                    (NationB.InternationalStanding - 2350) / (4000 - 2350);

                var AmountB = (AmountA * ValuationA) / ValuationB;
                if (AmountB <= CoinB.ForSaleAmount)
                {
                    var response = new ExchangeCoinsStepAresponseDto
                    {
                        CoinA = CoinA.Id,
                        AmountA = AmountA,
                        ValuationA = ValuationA,
                        CoinB = CoinB.Id,
                        AmountB = AmountB,
                        ValuationB = ValuationB
                    };
                    return response;

                }
                else {
                    var response = new ExchangeCoinsStepAresponseDto
                    {
                        CoinA = CoinA.Id,
                        AmountA = AmountA,
                        ValuationA = ValuationA,
                        CoinB = CoinB.Id,
                        AmountB = 0,
                        ValuationB = ValuationB
                    };
                    return response;
                }
            }

            return null;
        }

        //
        // ExchangeCoinsStepB
        //
        public async Task<ExchangeCoinsStepBresponseDto?> ExchangeCoinsStepB(ExchangeCoinsStepBDto StepB)
        {
            var CoinA = await dbContext.Cryptos.FirstOrDefaultAsync(x => x.Id == StepB.CoinA);
            if (CoinA == null) return null;

            var NationA = await dbContext.Nations.FirstOrDefaultAsync(x => x.Id == CoinA.CurrentOwner);
            if (NationA == null) return null;

            var CoinB = await dbContext.Cryptos.FirstOrDefaultAsync(x => x.Id == StepB.CoinB);
            if (CoinB == null) return null;

            var NationB = await dbContext.Nations.FirstOrDefaultAsync(x => x.Id == CoinB.CurrentOwner);
            if (NationB == null) return null;

            var CoinBinPortfolioA = await dbContext.Cryptos.FirstOrDefaultAsync(x => x.CurrentOwner == NationA.Id && x.Name == CoinB.Name);
            var CoinAinPortfolioB = await dbContext.Cryptos.FirstOrDefaultAsync(x => x.CurrentOwner == NationB.Id && x.Name == CoinA.Name);

            var AmountA = StepB.AmountA;
            var AmountB = StepB.AmountB;

            if (CoinA.HoldingAmount >= AmountA &&
                CoinB.HoldingAmount >= AmountB) //Available funds
            {

                CoinA.HoldingAmount -= AmountA;
                CoinA.ForeignHolding += AmountA;

                if (CoinB.OriginalNationId == CoinB.CurrentOwner) //Seller is Owner
                {
                    CoinB.ForSaleAmount -= AmountB;
                    CoinB.ForeignHolding += AmountB;
                }
                else // Seller is Other
                {
                    CoinB.ForSaleAmount -= AmountB;
                }
                if (CoinBinPortfolioA == null)
                {
                    var NewPortfolioAcoin = new CryptoModel
                    {
                        TypeOf = "Other",
                        Name = CoinB.Name,
                        Acro = CoinB.Acro,
                        HoldingAmount = AmountB ?? 0,
                        OriginalNationId = CoinB.OriginalNationId,
                        CurrentOwner = NationA.Id,
                    };

                    await dbContext.Cryptos.AddAsync(NewPortfolioAcoin);
                }
                else
                {
                    CoinBinPortfolioA.HoldingAmount += AmountB ?? 0;
                }
                if (CoinAinPortfolioB == null)
                {
                    var NewPortfolioBcoin = new CryptoModel
                    {
                        TypeOf = "Other",
                        Name = CoinA.Name,
                        Acro = CoinA.Acro,
                        HoldingAmount = AmountA ?? 0,
                        OriginalNationId = CoinA.OriginalNationId,
                        CurrentOwner = NationB.Id,
                    };

                    await dbContext.Cryptos.AddAsync(NewPortfolioBcoin);
                }
                else
                {
                    CoinAinPortfolioB.HoldingAmount += AmountA ?? 0;
                }

                var ExchangeSuccessM = new ExchangeCoinsStepBresponseDto
                {
                    CoinA = StepB.CoinA,
                    AmountA = AmountA,
                    CoinB = StepB.CoinB,
                    AmountB = AmountB,
                    SuccessMessage = $"Sccessful trnasaction between {NationA} and {NationB}"
                };

                await dbContext.SaveChangesAsync();
                return ExchangeSuccessM;
            }

            return null;
        }
        //
        // DeleteNation
        //
        public async Task<NationsModel?> DeleteNation(int id)
        {
            var MatchedData = await dbContext.Nations.FirstOrDefaultAsync(x => x.Id == id);

            if (MatchedData == null) { return null; }

            dbContext.Nations.Remove(MatchedData); 
            await dbContext.SaveChangesAsync(); 
            return MatchedData;
        }
    }
}
