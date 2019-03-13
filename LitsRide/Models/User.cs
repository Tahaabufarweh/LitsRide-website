using System;
using System.Collections.Generic;

namespace LitsRide.Models
{
    public partial class User
    {
        public User()
        {
            Notification = new HashSet<Notification>();
            RatingRatedUserNavigation = new HashSet<Rating>();
            RatingUser = new HashSet<Rating>();
            ReportReportedUserNavigation = new HashSet<Report>();
            ReportUser = new HashSet<Report>();
            Trip = new HashSet<Trip>();
            TripRequest = new HashSet<TripRequest>();
        }

        public int Id { get; set; }
        public string Country { get; set; }
        public bool? Gender { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CarInfo { get; set; }
        public string MobileNumber { get; set; }
        public DateTime? BirthDate { get; set; }
        public string ProfileImageName { get; set; }
        public string CarNumber { get; set; }

        public virtual ICollection<Notification> Notification { get; set; }
        public virtual ICollection<Rating> RatingRatedUserNavigation { get; set; }
        public virtual ICollection<Rating> RatingUser { get; set; }
        public virtual ICollection<Report> ReportReportedUserNavigation { get; set; }
        public virtual ICollection<Report> ReportUser { get; set; }
        public virtual ICollection<Trip> Trip { get; set; }
        public virtual ICollection<TripRequest> TripRequest { get; set; }
    }
}
