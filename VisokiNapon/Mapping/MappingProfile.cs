using AutoMapper;
using VISOKI_NAPON.Controllers.Resources;
using VISOKI_NAPON.Questions; 
namespace VISOKI_NAPON.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Question, QuestionResource>();

        }
    }
}