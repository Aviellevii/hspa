using api.Dto;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public CityController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await uow.CityRepository.GetCities();
            var cityDto = mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(cityDto);
        }
        [HttpPost]
        public async Task<IActionResult> AddCity(CityDto citydto)
        {
            var city = mapper.Map<City>(citydto);
            city.LastUpdatedOn = DateTime.Now;
            city.LastUpdatedBy = 1;
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return Ok(201);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {
            if (id != cityDto.Id)
                return BadRequest("Update not allowed");

            var cityFromDb = await uow.CityRepository.GetCity(id);

            if (cityFromDb == null)
                return BadRequest("Update not allowed");

            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);

            await uow.SaveAsync();
            return StatusCode(200);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}
