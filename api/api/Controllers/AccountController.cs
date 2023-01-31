using api.Dto;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IConfiguration configuration;
        public AccountController(IUnitOfWork uow, IConfiguration configuration)
        {
            this.uow = uow;
            this.configuration = configuration;
        }
        [HttpPost("login")]
        public async Task<IActionResult> login(LoginReq loginreq)
        {
            var user = await uow.UserRepository.Authenticate(loginreq.userName, loginreq.Password);
            if (user == null)
                return BadRequest(401);
            var loginres = new LoginRes();
            loginres.userName = user.Username;
            loginres.Token = CreateJWT(user);
            return Ok(loginres);
        }
        [HttpPost("register")]
        public async Task<IActionResult> register(LoginReq loginreq)
        {
            if (await uow.UserRepository.UserAlreadyExist(loginreq.userName))
                return BadRequest("User Already Exist");
            uow.UserRepository.Register(loginreq.userName, loginreq.Password);
            await uow.SaveAsync();
            return Ok(201);
        }
        private string CreateJWT(User user) 
        {
            var secretkey = configuration.GetSection("AppSettings:Key").Value;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretkey));

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signingCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
