﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LitsRide.Models
{
    public class ReportModelPage
    {
        public IEnumerable<Report> Reports { get; set; }
        public int? TotalReports { get; set; }
    }
}
