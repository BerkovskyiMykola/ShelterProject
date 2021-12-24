using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShelterProject.Models
{
    public class Animal
    {
        public int AnimalId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Name { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Type { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Сategory { set; get; }

        public int ShelterId { get; set; }
        public Shelter Shelter { get; set; }

        public List<Walk> Walks { get; set; } = new List<Walk>();
    }
}
