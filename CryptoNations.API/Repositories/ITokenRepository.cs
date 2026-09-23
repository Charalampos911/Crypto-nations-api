using Microsoft.AspNetCore.Identity;

namespace CryptoNations.API.Repositories
{
    public interface ITokenRepository
    {
        /*Οταν λέμε inject ενοούμε pass it as parameter*/
        //Ολα αύτα υπάρχουν με definitions στο TokenRepository.cs
        //To Interface απλα είναι ο μεσαζοντας ανάμεσα στο SQL και τα Controllers
        string CreateJWTToken(IdentityUser user, List<string> roles);
    }
}
