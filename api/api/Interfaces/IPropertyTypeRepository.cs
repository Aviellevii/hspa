using api.Models;

namespace api.Interfaces
{
    public interface IPropertyTypeRepository
    {
        Task<IEnumerable<PropertyType>> GetPropertyTypes();
    }
}
