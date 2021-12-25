using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShelterProject.Models;

namespace ShelterProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsController : ControllerBase
    {
        private readonly DataContext _context;

        public AnimalsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet("all/{id}")]
        public async Task<IActionResult> GetAnimals(int id)
        {
            var shelter = await _context.Shelters
                .Include(x => x.Animals)
                .SingleOrDefaultAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.ShelterId == id);

            if (shelter == null)
            {
                return BadRequest();
            }

            return Ok(new
            {
                shelter.Name,
                shelter.Address,
                Animals = shelter.Animals.Select(x => new {
                    x.AnimalId,
                    x.Name,
                    x.Category,
                    x.Type
                })
            });
        }

        [Authorize(Roles = "User")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutAnimal(int id, Animal animal)
        {
            if (id != animal.AnimalId)
            {
                return BadRequest();
            }

            var model = await _context.Animals
                .SingleOrDefaultAsync(x => x.AnimalId == id && x.Shelter.User.Email == HttpContext.User.Identity.Name);

            if (model == null)
            {
                return BadRequest();
            }

            model.Name = animal.Name;
            model.Category = animal.Category;
            model.Type = animal.Type;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "User")]
        [HttpPost("create")]
        public async Task<ActionResult<Animal>> PostAnimal(Animal animal)
        {
            var shelter = await _context.Shelters
                .SingleOrDefaultAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.ShelterId == animal.ShelterId);

            if (shelter == null)
            {
                return BadRequest();
            }

            _context.Animals.Add(animal);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                animal.AnimalId,
                animal.Name,
                animal.Category,
                animal.Type
            });

        }

        [Authorize(Roles = "User")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAnimal(int id)
        {
            var animal = await _context.Animals
                .SingleOrDefaultAsync(x => x.Shelter.User.Email == HttpContext.User.Identity.Name && x.AnimalId == id);

            if (animal == null)
            {
                return NotFound();
            }

            _context.Animals.Remove(animal);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
