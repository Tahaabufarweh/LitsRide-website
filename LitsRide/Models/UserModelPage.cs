﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LitsRide.Models
{
    public class UserModelPage
    {
        public IEnumerable<User> Users { get; set; }
        public int? TotalUsers { get; set; }
    }
}
