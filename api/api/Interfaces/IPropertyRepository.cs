using api.Models;

namespace api.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync(int sellrent);
        Task<Property> GetPropertyDetailAsync(int id); 
        Task<Property> GetPropertyByIdAsync(int id);
        Task<IEnumerable<Property>> GetPropertyByIdUserAsync();
        void AddProperty(Property property);
        void DeleteProperty(int id);
    }
}
