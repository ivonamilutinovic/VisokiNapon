using AutoMapper;
using VISOKI_NAPON.Controllers.Resources;
using VISOKI_NAPON.Questions; 
using VISOKI_NAPON.PlayersTopList; 

namespace VISOKI_NAPON.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Question, QuestionResource>();
            CreateMap<TopList, TopListResource>();
        }
    }
}