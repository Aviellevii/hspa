using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace api.Data.repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string userName, string passwordText)
        {
            var user = await dc.Users.FirstOrDefaultAsync(x => x.Username == userName);
            if (user == null)
                return null;
            if (!MatchPasswordHash(passwordText, user.Password, user.PasswordKey))
                return null;
            return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
               var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));
               for(int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i])
                        return false;
                }
                return true;
            }
        }

        public void Register(string userName, string Password)
        {
            byte[] passwordHash, passwordKey;
            using(var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
            }
            var user = new User();
            user.Username = userName;
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;
            dc.Users.Add(user);
        }
        public async Task<bool> UserAlreadyExist(string userName)
        {
            return await dc.Users.AnyAsync(x => x.Username == userName);
        }
    }
}
