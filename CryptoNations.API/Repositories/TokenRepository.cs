using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
/*
 * This is a "CONCRETE" class, meaning the class that contains the "IMPLEMENTATION"
 */
namespace CryptoNations.API.Repositories
{
    //This class implements the ITokenRepository interface. It provides methods for creating JWT tokens used in authentication.
    public class TokenRepository : ITokenRepository
    {
        /* Οταν λέμε inject ενοούμε pass it as parameter
         * Get some Interface from an Integrated library
         * Dependency Injection
         */
         private readonly IConfiguration configuration; //The Interface that will help create JWT tokens
        
        /* IConfiguration:
         * This interface is used to access the application’s configuration settings,
         * such as JWT keys and issuer information stored in appsettings.json.
         */
        public TokenRepository(IConfiguration configuration) //Dependency Injection
        {
            /* Constructor:
             * This class receives IConfiguration as a parameter via dependency injection,
             * allowing the class to retrieve settings like the secret key, issuer,
             * and audience needed to create the JWT token.
             */
            this.configuration = configuration;
        }

        /* IdentityUser:
         * This class is part of Microsoft.AspNetCore.Identity.
         * It represents a user in the identity system, containing properties 
         * such as Email, UserName, and PasswordHash. In this code,
         * it is passed to the "CreateJWTToken" method to create a JWT token
         * based on the user's identity.
         */
        public string CreateJWTToken(IdentityUser user, List<string> roles)
        {
            // Create claims
            var claims = new List<Claim>();
            //Provide user credentials
            claims.Add(new Claim(ClaimTypes.Email, user.Email));// Ex. Haralabos911@gmail.com 

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role)); // is a "writer"
            }

            /* SymmetricSecurityKey:
             * This class, part of Microsoft.IdentityModel.Tokens, 
             * is used to represent the secret key that will sign the JWT token.
             * The key is retrieved from the app's configuration
             * (usually from appsettings.json under Jwt:Key).
             * JWT Key: The secret key is essential for signing and verifying the token,
             *  ensuring that the token has not been tampered with.
             */
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));

            /* SigningCredentials: 
             * This object contains the security key (key)
             * and the algorithm used to sign the JWT. 
             * In this case, it's using HmacSha256 to securely sign the token.
             */
            /* SecurityAlgorithms.HmacSha256:
             * A commonly used algorithm for creating a secure hash for the JWT token.
             */
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            /*
                JwtSecurityToken:
                This class is used to create the JWT token. It takes several parameters:

                Issuer: Identifies the issuer (the authority that created the token), typically specified in the appsettings.json under Jwt:Issuer.
                Audience: Identifies the intended recipients of the token (e.g., the API), stored under Jwt:Audience.
                Claims: The user information (email, roles, etc.) that is embedded in the token.
                Expires: Specifies the expiration time for the token. Here, it is set to 60 minutes.
                SigningCredentials: The credentials that securely sign the token.

             */
            var token = new JwtSecurityToken(
                            configuration["Jwt:Issuer"],
                            configuration["Jwt:Audience"],
                            claims,
                            expires: DateTime.Now.AddMinutes(60),//Token will expire after 60 minutes
                            signingCredentials: credentials
                        );
            /*
             * JwtSecurityTokenHandler:
             * This class serializes the JwtSecurityToken into a string representation
             * (the actual JWT) that can be returned to the client.
             * The token can then be used in the Authorization header of API requests to authenticate the user.
             */
return new JwtSecurityTokenHandler().WriteToken(token);
}
}
}
