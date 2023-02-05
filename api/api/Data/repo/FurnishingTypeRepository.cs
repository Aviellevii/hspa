using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data.repo
{
    public class FurnishingTypeRepository : IFurnishingTypeRepository
    {
        private readonly DataContext dc;
        public FurnishingTypeRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<IEnumerable<FurnishingType>> GetFurnishingTypes()
        {
            return await dc.FurnishingTypes.ToListAsync();
        }
    }
}
