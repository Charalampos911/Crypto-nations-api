using CryptoNations.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;

namespace CryptoNations.API.Helpers
{
    public static class Helpers
    {   // Helper
        public static T? CheckForNull<T>(T? value) where T : class
        {
            return value ?? null;
        }// return CheckForNull(nationalPortfolio);

        // Extension 
        public static T? OrNull<T>(this T? value) where T : class
        {
            return value ?? null;
        }// return nationalPortfolio.OrNull();

        // Utility 
        public static T? ReturnOrNull<T>(T? value) where T : class
        {
            return value ?? null;
        }// return Utility.ReturnOrNull(nationalPortfolio);
    }

}
