using api.Models;

namespace api.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCities();
        Task<City> GetCity(int id);
        void AddCity(City city);
        void DeleteCity(int id);
    }
}
