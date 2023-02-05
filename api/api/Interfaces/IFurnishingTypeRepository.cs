using api.Models;

namespace api.Interfaces
{
    public interface IFurnishingTypeRepository
    {
        Task<IEnumerable<FurnishingType>> GetFurnishingTypes();
    }
}
