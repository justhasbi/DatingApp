using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      // automap from and automap to
      CreateMap<AppUser, MemberDto>()
      // map individual property
      .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
        // get first photo where is main and get the url
        src.Photos.FirstOrDefault(x => x.IsMain).Url))
      .ForMember(dest => dest.Age, opt => opt.MapFrom(src => 
        src.DateOfBirth.CalculateAge()));
      CreateMap<Photo, PhotoDto>();
    }
  }
}