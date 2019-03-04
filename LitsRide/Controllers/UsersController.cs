﻿namespace Triviaa.Controllers
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

        #region Users
        /// <summary>
        /// Create New User 
        /// </summary>
        /// <param name="NewUser"></param>
        /// <returns>user </returns>
        [HttpPost]
        [Route("SignUp")]
        public User SignUp([FromBody] User NewUser)
        {
            return CreateNewUser(NewUser);
        }

        // GET api/values
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            var userInDb = _context.User.Where(u => u.Username.Trim().ToLower() == user.Username.Trim().ToLower() && u.Password == user.Password).FirstOrDefault();
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

        #region Rating

        /// <summary>
        /// Insert new rate for specific user
        /// </summary>
        /// <param name="NewRate">object of Rating</param>
        /// <returns>Rating Object</returns>
        [HttpPost]
        [Route("InsertNewRate")]
        public Rating InsertNewRate([FromBody] Rating NewRate)
        {
            return InsertRate(NewRate);
        }

        /// <summary>
        /// Get All Ratings By User Id
        /// </summary>
        /// <param name="UserId">int variable</param>
        /// <returns>Rating List</returns>
        [HttpGet]
        [Route("GetAllRatingsByUserId")]
        public List<Rating> GetAllRatingsByUserId(int UserId)
        {
            return _context.Rating.Where(rate => rate.UserId == UserId).ToList();
        }
        #endregion

        #region Reporting
        /// <summary>
        /// Insert new report for specific user
        /// </summary>
        /// <param name="NewReport">object of Rating</param>
        /// <returns>Report Object</returns>
        [HttpPost]
        [Route("InsertNewReport")]
        public Report InsertNewReport([FromBody] Report NewReport)
        {
            return InsertReport(NewReport);
        }

        /// <summary>
        /// Get All Report By User Id
        /// </summary>
        /// <param name="UserId">int variable</param>
        /// <returns>Report List</returns>
        [HttpGet]
        [Route("GetAllReportByUserId")]
        public List<Report> GetAllReportByUserId(int UserId)
        {
            return _context.Report.Where(rate => rate.UserId == UserId).ToList();
        }
        #endregion

        #endregion

        #region Private Methods

        #region Users
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

        #region Rating
        private Rating InsertRate(Rating NewRate)
        {
            _context.Rating.Add(NewRate);
            _context.SaveChanges();
            return NewRate;
        }
        #endregion

        #region Reporting
        private Report InsertReport(Report NewReport)
        {
            _context.Report.Add(NewReport);
            _context.SaveChanges();
            return NewReport;
        }

        #endregion

        #endregion
    }
}