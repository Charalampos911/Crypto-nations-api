using CryptoNations.API.Models.Domain;

namespace CryptoNations.API.Repositories
{
    public interface IImageRepository
    {
        /*Οταν λέμε inject ενοούμε pass it as parameter*/
        //Ολα αύτα υπάρχουν με definitions στο LocalImageRepository.cs
        //To Interface απλα είναι ο μεσαζοντας ανάμεσα στο SQL και τα Controllers
        Task<Image> Upload(Image image);
    }
}
