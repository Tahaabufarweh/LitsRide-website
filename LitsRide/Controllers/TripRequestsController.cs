﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LitsRide.Models;
using LitsRide.Models.Enum;

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
        
        [HttpPost]
        [Route("ApproveOrRejectRequest")]
        public async Task<ActionResult<TripRequest>> ApproveOrRejectRequest(int id, int Status)
        {
            var tripRequest = await _context.TripRequest.FindAsync(id);
            if (tripRequest == null)
            {
                return NotFound();
            }
            tripRequest.Status = Status;
            await _context.SaveChangesAsync();

            return tripRequest;
        }

        private bool TripRequestExists(int id)
        {
            return _context.TripRequest.Any(e => e.Id == id);
        }

        /// <summary>
        /// Get All And Search Trip Request By Passenger Id 
        /// </summary>
        /// <param name="SearchModel">Object of TripRequest</param>
        /// <param name="PageNo">integer variable</param>
        /// <param name="PageSize">integer variable</param>
        [HttpGet]
        [Route("GetAllAndSearchTripRequestByPassengerId")]
        public async Task<ActionResult<IEnumerable<TripRequest>>> GetAllAndSearchTripRequestByPassengerId(TripRequest SearchModel = default(TripRequest), int PageNo = 1, int PageSize = 10)
        {
            return await _context.TripRequest.Include(request => request.Trip).Where(request => request.PassengerId == SearchModel.PassengerId &&
                                            (SearchModel.Status == 0 || request.Status == SearchModel.Status))
                 .OrderByDescending(y => y.Id).Skip((PageNo - 1) * PageSize).Take(PageSize).ToListAsync();
        }


        /// <summary>
        /// New Request 
        /// </summary>
        /// <param name="NewTripRequest">Object of Trip Request</param>
        /// <returns>TripRequest </returns>
        [HttpPost]
        [Route("NewRequest")]
        public async Task<IActionResult> NewRequest([FromBody] TripRequest NewTripRequest)
        {
            List<TripRequest> list = _context.TripRequest.Where(request => request.TripId == NewTripRequest.TripId).ToList().ToList();
            Trip TripObj = _context.Trip.Where(trip => trip.Id == NewTripRequest.Id).FirstOrDefault();
            if (TripObj.StartTime < DateTime.Now)
            {
                return BadRequest("This trip is expired!");
            }
            else if (list.Where(x => x.PassengerId == NewTripRequest.PassengerId).Count() > 0)
            {
                return BadRequest("Passenger exist in this trip!");
            }
            else if (list.Count() >= TripObj.SeatsNo)
            {
                return BadRequest("Trip is full board!");
            }
            else
            {
                NewTripRequest.Status = (int)TripRequestStatus.New;
                await _context.TripRequest.AddAsync(NewTripRequest);
            }
            return CreatedAtAction("GetTripRequest", new { id = NewTripRequest.Id }, NewTripRequest);

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
    }
}
