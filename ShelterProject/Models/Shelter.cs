using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShelterProject.Models
{
    public class Shelter
    {
        public int ShelterId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Name { set; get; }
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Address { set; get; }
        
        public int UserId { get; set; }
        public User User { get; set; }

        public List<Animal> Animals { get; set; } = new List<Animal>();
    }
}
