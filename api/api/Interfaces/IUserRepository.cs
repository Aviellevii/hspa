using api.Models;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string userName, string Password);
        void Register(string userName, string Password);
        Task<bool> UserAlreadyExist(string userName);
    }
}
