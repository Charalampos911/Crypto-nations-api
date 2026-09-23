using CryptoNations.API.Data;
using CryptoNations.API.Models.Domain;
/*
 * This is a "CONCRETE" class, meaning the class that contains the "IMPLEMENTATION"
 */
namespace CryptoNations.API.Repositories
{
    /*Οταν λέμε inject ενοούμε pass it as parameter*/
    //Τα απλά repository είναι αυτά που έχουν το definition
    //Τα Interface repository είναι αυτά που έχουν το  declaration 
    public class LocalImageRepository : IImageRepository
    {
        /*Οταν λέμε inject ενοούμε pass it as parameter*/
        private readonly IWebHostEnvironment webHostEnvironment; // Αυτο το πέρνει από την ενσωματωμενη για το WebHostEnvironment
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly CryptoNationsDbContext dbContext;

        public LocalImageRepository(IWebHostEnvironment webHostEnvironment,
            IHttpContextAccessor httpContextAccessor,//The IHttpContextAccessor has been injected from the program.cs
            CryptoNationsDbContext dbContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }


        public async Task<Image> Upload(Image image)
        {   //The local path
            var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images", //The folder to store images
                $"{image.FileName}{image.FileExtension}");

            // Upload Image to Local Path
            using var stream = new FileStream(localFilePath/*The image*/, FileMode.Create);//And create the file
            await image.File.CopyToAsync(stream); /*Perform the copy of the file to the path*/

            // https://localhost:1234/images/image.jpg
            // {Scheme}://{Host}:{PathBase}//Images/{image.FileName}{image.FileExtension}
            //Create the url path programatically so it can serve a web client
            var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/Images/{image.FileName}{image.FileExtension}";

            image.FilePath = urlFilePath;


            // Add Image to the Images table
            await dbContext.Images.AddAsync(image);//To image ειναι Dto
            await dbContext.SaveChangesAsync();

            return image;
        }
    }
}
