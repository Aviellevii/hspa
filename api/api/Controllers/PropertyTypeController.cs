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
    public class PropertyTypeController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public PropertyTypeController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllPropertyType()
        {
            var propertyType = await uow.PropertyTypeRepository.GetPropertyTypes();
            var propertyTypeDto = mapper.Map<IEnumerable<KeyValuePairDto>>(propertyType);
            return Ok(propertyTypeDto);
        }
    }
}
