using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using CryptoNations.API.Models.Domain;
using CryptoNations.API.Models.DTO;
using CryptoNations.API.Models.DTO.CryptoNationsDtos;
using CryptoNations.API.Models.Domain.CryptoNationsModels;
using System;

namespace CryptoNations.API.Mappings
{
    public class AutoMapperProfiles : Profile // Must Inject Automapper in the program.cs
    {
        public AutoMapperProfiles()
        {
            //Automatically translate the Domains to Dtos and vice versa!
            CreateMap<Region, RegionDto>().ReverseMap();                    /* GET */
            CreateMap<Region, AddRegionRequestDto>().ReverseMap();          /* POST */
            CreateMap<Region, UpdateRegionRequestDto>().ReverseMap();       /* PUT */

            CreateMap<Walk, WalkDto>().ReverseMap();                        /* GET */
            CreateMap<Walk, AddWalkRequestDto>().ReverseMap();              /* POST */
            CreateMap<Walk, UpdateWalkRequestDto>().ReverseMap();           /* PUT */

            CreateMap<Difficulty, DifficultyDto>().ReverseMap();

            // new
            CreateMap<NationsModel, NationsDto>().ReverseMap();
            //CreateMap<NationsModel, FullNationDto>().ReverseMap();
            // Map Nation to NationsDto
            CreateMap<NationsModel, NationsDto>()
                .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.Categories))
                .ForMember(dest => dest.Crypto, opt => opt.MapFrom(src => src.Crypto));


            CreateMap<CategoriesModel, CategoriesDto>().ReverseMap();
            CreateMap<CategoriesModel, SetAcategoryDto>().ReverseMap();

            //CreateMap<SliderModel, SliderDto>().ReverseMap();
            //CreateMap<SliderModel, FullNationSliderDto>().ReverseMap();
            



            CreateMap<CryptoModel, CryptoDto>().ReverseMap();
            CreateMap<CryptoModel, UpdateMainCryptoDto>().ReverseMap();
            CreateMap<CryptoModel, PortfolioListDto>().ReverseMap();
            CreateMap<CryptoModel, NationalSellOrderDto>().ReverseMap();
            CreateMap<CryptoModel, OtherSellOrderDto>().ReverseMap();
            CreateMap<CryptoModel, NationalSellOrderResponseDto>().ReverseMap();
            //CreateMap<CryptoModel, FullNationCryptoDto>().ReverseMap();
            
        }
    }
}
