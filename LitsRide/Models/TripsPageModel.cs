﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LitsRide.Models
{
    public class TripsPageModel
    {
        public IEnumerable<Trip> Trips { get; set; }
        public int? TotalTrips {get;set;}
    }
}
