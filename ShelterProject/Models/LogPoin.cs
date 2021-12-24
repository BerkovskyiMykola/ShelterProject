using System;

namespace ShelterProject.Models
{
    public class LogPoin
    {
        public int LogPoinId { get; set; }
        public string Point { get; set;}
        public DateTime DateTime { get; set;}

        public int WalkId { get; set; }
        public Walk Walk { get; set; }

    }
}
