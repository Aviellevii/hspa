using api.Dto;
using api.Models;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<Property, PropertyDto>().ReverseMap();

            CreateMap<Property, PropertyListDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name))
                .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name));

            CreateMap<Property, PropertyDetailDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name))
                .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name));
            

            CreateMap<PropertyType, KeyValuePairDto>().ReverseMap();
            CreateMap<FurnishingType, KeyValuePairDto>().ReverseMap();


        }
    }
}
