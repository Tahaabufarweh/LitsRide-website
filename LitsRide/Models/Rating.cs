using System;
using System.Collections.Generic;

namespace LitsRide.Models
{

    public partial class Rating
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Rating1 { get; set; }
        public string Note { get; set; }
        public int RatedUser { get; set; }

        public virtual User RatedUserNavigation { get; set; }
        public virtual User User { get; set; }
    }
}
