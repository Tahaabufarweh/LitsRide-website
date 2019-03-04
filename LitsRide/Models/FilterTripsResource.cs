using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LitsRide.Models
{
    public class FilterTripsResource
    {
        string FromDest { get; set; } 
        string ToDest { get; set; } 
        DateTime StartTime { get; set; } 
        float PriceMin { get; set; } 
        float PriceMax { get; set; } 
    }
}
