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
    public class TripRequestsController : ControllerBase
    {
        private readonly LetsRideinContext _context;

        public TripRequestsController(LetsRideinContext context)
        {
            _context = context;
        }

        // GET: api/TripRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripRequest>>> GetTripRequest()
        {
            return await _context.TripRequest.ToListAsync();
        }

        // GET: api/TripRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TripRequest>> GetTripRequest(int id)
        {
            var tripRequest = await _context.TripRequest.FindAsync(id);

            if (tripRequest == null)
            {
                return NotFound();
            }

            return tripRequest;
        }

        // PUT: api/TripRequests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTripRequest(int id, TripRequest tripRequest)
        {
            if (id != tripRequest.Id)
            {
                return BadRequest();
            }

            _context.Entry(tripRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripRequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TripRequests
        [HttpPost]
        public async Task<ActionResult<TripRequest>> PostTripRequest(TripRequest tripRequest)
        {
            _context.TripRequest.Add(tripRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTripRequest", new { id = tripRequest.Id }, tripRequest);
        }

        // DELETE: api/TripRequests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TripRequest>> DeleteTripRequest(int id)
        {
            var tripRequest = await _context.TripRequest.FindAsync(id);
            if (tripRequest == null)
            {
                return NotFound();
            }

            _context.TripRequest.Remove(tripRequest);
            await _context.SaveChangesAsync();

            return tripRequest;
        }

        private bool TripRequestExists(int id)
        {
            return _context.TripRequest.Any(e => e.Id == id);
        }
    }
}
