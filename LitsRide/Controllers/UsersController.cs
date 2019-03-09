namespace Triviaa.Controllers
{
    #region References
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using LitsRide.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;
    using System.IdentityModel.Tokens.Jwt;
    using System;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    #endregion

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        #region Variables
        private readonly LetsRideinContext _context;
        #endregion

        #region Constructor
        public UsersController(LetsRideinContext context)
        {
            _context = context;
        }
        #endregion

        #region Public API

        /// <summary>
        /// Create New User 
        /// </summary>
        /// <param name="NewUser"></param>
        /// <returns>user </returns>
        [HttpPost]
        [Route("SignUp")]
        public async Task<ActionResult<User>> SignUp([FromBody] User NewUser)
        {
            if (CheckUniqueUsername(NewUser.Username))
            {
                return BadRequest("Username is exist!");
            }
            else if (CheckUniqueEmail(NewUser.Email))
            {
                return BadRequest("Email is exist!");
            }

            else
            {
                NewUser.Password = Encrypt(NewUser.Password);
                _context.User.Add(NewUser);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetUser", new { id = NewUser.Id }, NewUser);
            }
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var User = await _context.User.FindAsync(id);

            if (User == null)
            {
                return NotFound();
            }

            return User;
        }
        [HttpGet]
        [Route("GetUser/{id}")]
        public IActionResult getUser(int id) {
            return Ok(_context.User.Where(x => x.Id == id)
                      .Include(x=>x.RatingRatedUserNavigation)
                      .Include("RatingRatedUserNavigation.User")
                      .Include(x=>x.TripRequest)
                      .Include("TripRequest.Passenger")
                      .Include(x=>x.Trip)
                      .FirstOrDefault());
        }
       
        // GET api/values
        [HttpPost, Route("Login")]
        public IActionResult Login([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            var userInDb = _context.User.Where(u => u.Username.Trim().ToLower() == user.Username.Trim().ToLower() && Decrypt(u.Password) == user.Password).FirstOrDefault();
            if (userInDb != null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("LitsRideSecurity@hasanDaaja"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim>
                    {
                      new Claim(ClaimTypes.Name, userInDb.Username),
                      new Claim(ClaimTypes.Sid, userInDb.Id.ToString()),
                      new Claim(ClaimTypes.Email , userInDb.Email)
                    };
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:44390",
                    audience: "https://localhost:44390",
                    claims: new List<Claim>(claims),
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }

        /// <summary>
        /// Get User info by UserId
        /// </summary>
        /// <param name="UsernameOrEmail"> string </param>
        /// <returns>Object of user type</returns>
        [HttpGet]
        [Route("SignIn/{UsernameOrEmail}")]
        [Authorize]
        public string SignIn(string UsernameOrEmail)
        {

            return UsernameOrEmail;
        }

        /// <summary>
        /// Update user infomation 
        /// </summary>
        /// <param name="NewUserInfo"></param>
        /// <returns>user </returns>
        [HttpPost]
        [Route("UpdateUserInfo")]
        public async Task<IActionResult> UpdateUserInfo([FromBody] User NewUserInfo)
        {
            User OldUser = _context.User.Where(user => user.Id == NewUserInfo.Id).FirstOrDefault();
            if (OldUser == null)
            {
                return BadRequest("Invalid client request");
            }
            OldUser.FullName = NewUserInfo.FullName;
            OldUser.Gender = NewUserInfo.Gender;
            OldUser.CarInfo = NewUserInfo.CarInfo;
            OldUser.Country = NewUserInfo.Country;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Check is the username is exist
        /// </summary>
        /// <param name="Username">string</param>
        /// <returns>boolean true/false</returns>
        [HttpGet]
        [Route("IsUniqueUsername")]
        public bool IsUniqueUsername(string Username)
        {
            return CheckUniqueUsername(Username);
        }

        /// <summary>
        /// Check is the email is exist
        /// </summary>
        /// <param name="Email">string</param>
        /// <returns>boolean true/false</returns>
        [HttpGet]
        [Route("IsUniqueEmail")]
        public bool IsUniqueEmail(string Email)
        {
            return CheckUniqueEmail(Email);
        }

        #endregion

        #region Private Methods
        private User UpdateInfo(User NewUserInfo)
        {
            User OldUser = _context.User.Where(user => user.Id == NewUserInfo.Id).FirstOrDefault();
            OldUser.FullName = NewUserInfo.FullName;
            OldUser.Gender = NewUserInfo.Gender;
            OldUser.CarInfo = NewUserInfo.CarInfo;
            OldUser.Country = NewUserInfo.Country;
            _context.SaveChanges();
            return OldUser;
        }

        private static string Encrypt(string data)
        {
            byte[] encData_byte = new byte[data.Length];
            encData_byte = System.Text.Encoding.UTF8.GetBytes(data);
            string encodedData = Convert.ToBase64String(encData_byte);
            return encodedData;

        }

        private static string Decrypt(string sData)
        {
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            System.Text.Decoder utf8Decode = encoder.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(sData);
            int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
            string result = new String(decoded_char);
            return result;
        }
        private User CreateNewUser(User NewUser)
        {

            _context.User.Add(NewUser);
            _context.SaveChanges();
            return NewUser;
        }

        private User GetUser(User user)
        {
            List<User> UsersList = _context.User.Where(u => u.Email.Trim().ToLower() == user.Email.Trim().ToLower() ||
                                  u.Username.Trim().ToLower() == user.Username.Trim().ToLower() && u.Password == u.Password).ToList();
            return UsersList.FirstOrDefault();
        }

        private bool CheckUniqueUsername(string Username)
        {
            List<User> UsersList = _context.User.Where(user => user.Username.Trim().ToLower() == Username.Trim().ToLower()).ToList();
            return UsersList.Count() > 0;
        }

        private bool CheckUniqueEmail(string Email)
        {
            List<User> UsersList = _context.User.Where(user => user.Email.Trim().ToLower() == Email.Trim().ToLower()).ToList();
            return UsersList.Count() > 0;
        }
        #endregion
    }
}