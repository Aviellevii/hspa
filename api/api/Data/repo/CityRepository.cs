using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data.repo
{
    public class CityRepository:ICityRepository
    {
        private readonly DataContext dc;
        public CityRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddCity(City city)
        {
            dc.Cities.Add(city);
        }

        public void DeleteCity(int id)
        {
            var city = dc.Cities.Find(id);
            dc.Cities.Remove(city);
        }

        public async Task<IEnumerable<City>> GetCities()
        {
            return await dc.Cities.ToListAsync();
        }

        public async Task<City> GetCity(int id)
        {
            return await dc.Cities.FindAsync(id);
        }
    }
}
