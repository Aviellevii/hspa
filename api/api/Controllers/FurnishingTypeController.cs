using api.Dto;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FurnishingTypeController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public FurnishingTypeController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllPropertyType()
        {
            var furnishingType = await uow.FurnishingTypeRepository.GetFurnishingTypes();
            var furnishingTypeDto = mapper.Map<IEnumerable<KeyValuePairDto>>(furnishingType);
            return Ok(furnishingTypeDto);
        }
    }
}
