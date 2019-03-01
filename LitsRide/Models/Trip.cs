using System;
using System.Collections.Generic;

namespace LitsRide.Models
{
    public partial class Trip
    {
        public Trip()
        {
            TripRequest = new HashSet<TripRequest>();
        }

        public int Id { get; set; }
        public string FromDestination { get; set; }
        public string ToDestination { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? ArriveTime { get; set; }
        public int DriverId { get; set; }
        public DateTime? ExpectedArrivalTime { get; set; }
        public string Details { get; set; }
        public string CarInfo { get; set; }
        public double Price { get; set; }
        public int Status { get; set; }
        public int SeatsNo { get; set; }
        public bool IsArrived { get; set; }
        public string CarNo { get; set; }

        public virtual User Driver { get; set; }
        public virtual ICollection<TripRequest> TripRequest { get; set; }
    }
}
