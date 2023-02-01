using api.Models;

namespace api.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync(int sellrent);
        void AddProperty(Property property);
        void DeleteProperty(int id);
    }
}
