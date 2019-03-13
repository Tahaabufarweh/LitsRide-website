using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LitsRide.Models;
using LitsRide.Models.Enum;
using LitsRide.Models.Notifications;

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
            string passengerName = _context.User.Find(tripRequest.PassengerId).Username;

            if (Status == (int)Models.Enum.TripRequestStatus.Approved)
            {
                string notificationText = ReplaceNotificationBody(passengerName, NotificationsTemplates.requestAccepted);
                PushNotification(notificationText, tripRequest.TripId);

            }
            else if (Status == (int)Models.Enum.TripRequestStatus.Reject)
            {
                string notificationText = ReplaceNotificationBody(passengerName, NotificationsTemplates.requestReject);
                PushNotification(notificationText, tripRequest.TripId);

            }

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
        public async Task<IActionResult> NewRequest([FromBody] TripRequest NewTripRequest,int tripid)
        {
            NewTripRequest.RequestDate = DateTime.Now;
            NewTripRequest.TripId = tripid;
            List<TripRequest> list = _context.TripRequest.Where(request => request.TripId == NewTripRequest.TripId).ToList().ToList();
            Trip TripObj = _context.Trip.Where(trip => trip.Id == NewTripRequest.TripId).FirstOrDefault();
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
                await _context.SaveChangesAsync();
                string passengerName = _context.User.Find(NewTripRequest.PassengerId).Username;
                string notificationText = ReplaceNotificationBody(passengerName, NotificationsTemplates.newRequest);
                PushNotification(notificationText, NewTripRequest.TripId);
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

        public string ReplaceNotificationBody(string username , string notifyBody) {
            notifyBody = notifyBody.Replace("User", username);
            return notifyBody;
        }

        public void PushNotification(string notificationText , int tripId) {

            Notification notification = new Notification
            {
                NotificationText = notificationText,
                IsOpened = false,
                NotifyDate = DateTime.Now,
                NotifyLink = "trip-details/" + tripId
            };

            try
            {
                _context.Notification.Add(notification);
                _context.SaveChanges();
            }
            catch(Exception e)
            {
                throw e;
            }
        }

    }
}
