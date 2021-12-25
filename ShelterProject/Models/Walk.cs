using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShelterProject.Models
{
    public class Walk
    {
        public int WalkId { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Volunteer { set; get; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }

        public int AnimalId { get; set; }
        public Animal Animal { get; set; }

        public List<LogPoint> LogPoints { get; set; } = new List<LogPoint>();
    }
}
