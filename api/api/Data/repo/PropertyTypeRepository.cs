using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data.repo
{
    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly DataContext dc;
        public PropertyTypeRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<PropertyType>> GetPropertyTypes()
        {
            return await dc.PropertyTypes.ToListAsync();
        }
    }
}
