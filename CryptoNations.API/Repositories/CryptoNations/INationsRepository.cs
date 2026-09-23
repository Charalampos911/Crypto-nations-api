using CryptoNations.API.Models.Domain;
using CryptoNations.API.Models.Domain.CryptoNationsModels;
using CryptoNations.API.Models.DTO.CryptoNationsDtos;

namespace CryptoNations.API.Repositories
{
    public interface INationsRepository
    {
        /*Οταν λέμε inject ενοούμε pass it as parameter*/
        //Ολα αύτα υπάρχουν με definitions στο SQLWalkRepository.cs
        //To Interface απλα είναι ο μεσαζοντας ανάμεσα στο SQL και τα Controllers
        Task<NationsModel?> SingleNation(int id);
        Task<List<NationsDto?>> FullNation(int id);
        Task<List<NationsModel>> NationsWithQuery(string? filterOn = null, string? filterQuery = null, 
            string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000);
        Task<List<CryptoModel?>> GetNationalPortfolio(int id);
        Task<List<CryptoModel?>> GetNationalSellOrders(int id);
        Task<List<CryptoModel?>> GetOtherSellOrders(int id);
        Task<List<CategoriesDto>> SliderCategories(int id);
        Task<List<CategoriesDto?>> InitiateCategories(int id, CategoriesModel NewGovType, CategoriesModel NewGunControl, CategoriesModel NewAlliance);
        Task<NationsModel?> UpdateNation(int id, NationsModel Nations);
        Task<CategoriesModel?> SetAcategory(int id, CategoriesModel Category);
        Task<UpdateMainCryptoDto?> UpdateTheCoin(int id, UpdateMainCryptoDto Category);
        Task<CryptoModel?> SellOrder(Guid id, NationalSellOrderDto SellOrder);
        Task<ExchangeCoinsStepAresponseDto?> ExchangeCoinsStepA(ExchangeCoinsStepADto StepA);
        Task<ExchangeCoinsStepBresponseDto?> ExchangeCoinsStepB(ExchangeCoinsStepBDto StepA);
        Task<NationsModel?> DeleteNation(int id);

  




       






    }
}
