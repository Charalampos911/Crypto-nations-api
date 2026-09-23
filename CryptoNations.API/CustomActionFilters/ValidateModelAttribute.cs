using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

// This is a "Custom Action Filter" για να δημιουργείς [CustomAttribute]
namespace CryptoNations.API.CustomActionFilters // και να το χρησιμοποιείς σαν [Custom] μέσα σε controllers!
{
    //Αυτό το χρησιμοποιούμε για να ενεργοποιήσουμε τα [attributes]:
    /*
     * [Required]
     * [MinLength(3, ErrorMessage = "Code has to be a minimum of 3 characters")]
     * [Range(0,50)] e.c.t
     *  found inside the Dtos
     */
    // SOS: [ValidateModel] Πάλι το convention, [ValidateModel χωρίς το Attribute]
    public class ValidateModelAttribute : ActionFilterAttribute 
        // -->  you can use this as [ValidateModel] στα controllers - Χωρίς το Attribute!
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ModelState.IsValid == false)
            {
                context.Result = new BadRequestResult();
            }
        }
    }
}
