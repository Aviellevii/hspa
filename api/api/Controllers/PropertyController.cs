using api.Dto;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public PropertyController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        [HttpGet("type/{sellrent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int sellrent)
        {
            var properties = await uow.PropertyRepository.GetPropertiesAsync(sellrent);
            var propertylist = mapper.Map<IEnumerable<PropertyListDto>>(properties);
            return Ok(propertylist);
        }
        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyDetails(int id)
        {
            var properties = await uow.PropertyRepository.GetPropertyDetailAsync(id);
            var propertyDetails = mapper.Map<PropertyDetailDto>(properties);
            return Ok(propertyDetails);
        }
        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        {
            var property = mapper.Map<Property>(propertyDto);
            property.PostedBy = GetAuth();
            property.LastUpdatedBy = GetAuth();
            uow.PropertyRepository.AddProperty(property);
            await uow.SaveAsync();
            return Ok(property);
        }
        private int GetAuth()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }

    }
}
