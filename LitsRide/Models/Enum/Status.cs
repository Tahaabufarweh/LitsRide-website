using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LitsRide.Models.Enum
{
    public enum TripStatus
    {
        Opened = 1,
        Closed = 2,
        FullBoard = 3,
        Deleted = 4
    }

    public enum TripRequestStatus
    {
        Approved = 1,
        Reject = 2
    }
}
