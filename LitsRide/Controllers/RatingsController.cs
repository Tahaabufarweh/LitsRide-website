using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LitsRide.Models;

namespace LitsRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly LetsRideinContext _context;

        public RatingsController(LetsRideinContext context)
        {
            _context = context;
        }

        // GET: api/Ratings
        [HttpGet]
        [Route("GetUserRating/{userId}")]
        public async Task<ActionResult<IEnumerable<Rating>>> GetUserRating(int userId)
        {
            return await _context.Rating.Where(x=>x.Id == userId).Include(x=>x.User).OrderByDescending(x=>x.Id).ToListAsync();
        }

        // POST: api/Ratings
        [HttpPost]
        [Route("CreateNewRate")]
        public async Task<ActionResult<Rating>> PostRating(Rating rating)
        {
            _context.Rating.Add(rating);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRating", new { id = rating.Id }, rating);
        }

        // DELETE: api/Ratings/5
        [HttpDelete]
        [Route("DeleteRate/{id}")]
        public async Task<ActionResult<Rating>> DeleteRating(int id)
        {
            var rating = await _context.Rating.FindAsync(id);
            if (rating == null)
            {
                return NotFound();
            }

            _context.Rating.Remove(rating);
            await _context.SaveChangesAsync();

            return rating;
        }

        private bool RatingExists(int id)
        {
            return _context.Rating.Any(e => e.Id == id);
        }
    }
}
