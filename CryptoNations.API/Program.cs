using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using CryptoNations.API.Data;
using CryptoNations.API.Mappings;
using CryptoNations.API.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;
using Serilog;
using CryptoNations.API.Middlewares;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using CryptoNations.API;
using System.Security.Cryptography;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//Write logs inside the console() and in a txt file inside the logs folder - Automatically with every Http request fail!
var logger = new LoggerConfiguration() 
    .WriteTo.Console()
    .WriteTo.File("Logs/CryptoNations_Log.txt", rollingInterval: RollingInterval.Minute)
    //.WriteTo.File("Logs/CryptoNations_Log.txt", rollingInterval: RollingInterval.Day)
    .MinimumLevel.Warning()
    .CreateLogger();
//logger
builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);
//logger

//Second logger
// UseSerilog(context, loggerConfig)
builder.Host.UseSerilog((ctx, lc) => lc.WriteTo.Console().ReadFrom.Configuration(ctx.Configuration));

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null; //Force returning dtos and models AS-IS in the frontend response
});

//Versioning
builder.Services.AddApiVersioning(options => { 
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.DefaultApiVersion = new Microsoft.AspNetCore.Mvc.ApiVersion(1,0); //Deprecated Versioning 5.1
    options.ReportApiVersions = true;   //Will display the possible available versions  in swagger ��. api-supported-versions: 1.0, 2.0
});
builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'V.M"; // Deprecated Versioning 5.1
    options.SubstituteApiVersionInUrl = true; // Deprecated Versioning 5.1
});

builder.Services.AddHttpContextAccessor();

//
// -------
//

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

//    //
//    // -------
//    //

//    //Add notations to Swagger 
//    options.EnableAnnotations();
//});//end of authorization to swagger

//instruction about how to Authorize in swagger
//https://medium.com/@deidra108/oauth-bearer-token-with-swagger-ui-net-6-0-86835e616deb
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
    //Add notations to Swagger 
    options.EnableAnnotations();
});
//Make V1 and V2 appear in swagger
builder.Services.ConfigureOptions<ConfigureSwaggerOptions>();
//
// -------
//

// Add Service to both the DbContexts
builder.Services.AddDbContext<CryptoNationsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CryptoNationsConnectionString")));

builder.Services.AddDbContext<CryptoNationsAuthDbContext>
    (options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("CryptoNationsAuthConnectionString"))
    );
//Integrated Database

builder.Services.AddDbContext<HotelListingDbContext>(
    options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("HotelListingDbConnectionString"));
    });
//
// -------
//

// Add Service & Scope to the Interfaces
// Inject the Interface in to the SQL repositories!
builder.Services.AddScoped<ITokenRepository, TokenRepository>();
builder.Services.AddScoped<IImageRepository, LocalImageRepository>();
builder.Services.AddScoped<IRegionRepository, SQLRegionRepository>();
builder.Services.AddScoped<IWalkRepository, SQLWalkRepository>();
builder.Services.AddScoped<INationsRepository, SQLNationsRepository>(); //new


//
// -------
//

// Add Service to the AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

//
// -------
//

/* 
 * This line registers the core identity services in the ASP.NET Core dependency injection system.
 * IdentityCore is a lightweight version of Identity meant for API applications.
 * IdentityUser is the default class provided by ASP.NET Core to represent a user in the system.
 * IdentityUser: This is the class used to store user information, such as username, password, email, etc.
 */
builder.Services.AddIdentityCore<IdentityUser>()
/* AddRoles<>
 * This method adds role management to the Identity system,
 * allowing users to be assigned roles and to have access controlled by their roles.
 */

/* IdentityRole:
 * This class represents a role in the system, 
 * allowing for role-based authorization (e.g., Admin, User, etc.).
 */

.AddRoles<IdentityRole>()

/* AddTokenProvider<>
 * This adds a token provider to handle generating tokens for user activities,
 * like email confirmation, password resets, etc.
 */

/* DataProtectorTokenProvider<IdentityUser>
 * This is the default token provider that uses 
 * data protection to generate and validate tokens.
 */

// ("CryptoNations") is probably the token provider, can be more than one!

.AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("CryptoNations")//No matter - just a name

/* AddEntityFrameworkStores<>
 * This registers the Entity Framework store,
 * which is responsible for storing user and role information in the database. 
 * It configures Identity to use the CryptoNationsAuthDbContext for data persistence.
 */

/*  CryptoNationsAuthDbContext
 *  This is the Entity Framework DbContext that is specific to your
 *  application and handles communication with the database for Oauth2.
 */
.AddEntityFrameworkStores<CryptoNationsAuthDbContext>()

/* AddDefaultTokenProviders()
 * This registers the default token providers for things like email confirmation and password resets.
 * It includes the necessary providers for generating tokens for common operations in Identity.
 */
.AddDefaultTokenProviders();

//
// -------
//

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6; //Max password length 6
    options.Password.RequiredUniqueChars = 1; //Min password length 1
});

//
// -------
//

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
    options.TokenValidationParameters = new TokenValidationParameters
    {
        AuthenticationType = "Jwt",
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])), 
    }
) ;

//
// -------
//
// CORPS Policy
// Declare and then tell the pipeline to use it!
builder.Services.AddCors(
    options =>
    {
        options.AddPolicy(// Make API accessible for pages and apps from other Servers! 
            "AllowAll",
            b => b.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
    }
    );
//
// -------
//

var app = builder.Build();

//Get all the versioning Descriptions
var versionDescriptionsProvider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
app.UseSwagger();
app.UseSwaggerUI(options =>
    {
    foreach (var description in versionDescriptionsProvider.ApiVersionDescriptions)
    {
        options.SwaggerEndpoint(
                $"/swagger/{description.GroupName}/swagger.json",
                description.GroupName.ToUpperInvariant()
            );
    }
});
}

//
// -------
//

//This is adding the exception middleware to the program pipeline!
app.UseMiddleware<ExceptionHandlerMiddleware>(); //Globally handle all exceptions, try all httpRequests and log all errors

//
// -------
//

//Second logger
app.UseSerilogRequestLogging(); //log the httpGet, post, put and delete!

//app.UseHttpsRedirection();/*<-This is another middleware that makes http to https....*/

app.UseCors("AllowAll"); //Tell the pipeline to use CORS

app.UseAuthentication();/*<-This is another middleware*/
app.UseAuthorization();/*<-This is another middleware*/

//
// -------
//

//Inject middleware for serving  STATIC files, like images,css, html ect
//app.UseStaticFiles(new StaticFileOptions
//{
//    /*This will ovveride the 
//     * https://Localhost:1234/Images
//     * and make it point to a physical File path of a folder*/
//    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Images")),
//    RequestPath = "/Images"
//});

//
// -------
//

app.MapControllers(); /*<-This is another middleware*/

//Minimap API example
//Test => http://localhost:5249/MinimalWeatherforecast
var summaries = new[]
{
 "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};
app.MapGet("/MinimalWeatherforecast", () =>
{
var forecast = Enumerable.Range(1, 5).Select(index =>
new MinimalWeatherForecast(
    DateTime.Now.AddDays(index),
    Random.Shared.Next(-20, 55),
    summaries[Random.Shared.Next(summaries.Length)]
    )).ToArray();
    return forecast;

}).WithName("GetMinimalWeatherForecast");


app.Run();

//Minimap API example - Full definition
internal record MinimalWeatherForecast(DateTime Date, int TemperatureC, String? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
