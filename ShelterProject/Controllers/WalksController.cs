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
    public class WalksController : ControllerBase
    {
        private readonly DataContext _context;

        public WalksController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet("all/{id}")]
        public async Task<IActionResult> GetWalks(int id)
        {
            var animal = await _context.Animals
                .Include(x => x.Walks)
                .SingleOrDefaultAsync(x => x.Shelter.User.Email == HttpContext.User.Identity.Name && x.AnimalId == id);

            if (animal == null)
            {
                return BadRequest();
            }

            return Ok(new
            {
                animal.Name,
                animal.Category,
                animal.Type,
                Walks = animal.Walks.Select(x => new {
                    x.WalkId,
                    x.Volunteer,
                    x.DateStart,
                    x.DateEnd
                })
            });
        }

        [Authorize(Roles = "User")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutWalk(int id, Walk walk)
        {
            if (id != walk.WalkId)
            {
                return BadRequest();
            }

            var model = await _context.Walks
                .SingleOrDefaultAsync(x => x.Animal.Shelter.User.Email == HttpContext.User.Identity.Name && x.WalkId == id);

            if (model == null)
            {
                return BadRequest();
            }

            model.Volunteer = walk.Volunteer;
            model.DateEnd = walk.DateEnd;


            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "User")]
        [HttpPost("create")]
        public async Task<ActionResult<Walk>> PostWalk(Walk walk)
        {
            var animal = await _context.Animals
                .SingleOrDefaultAsync(x => x.Shelter.User.Email == HttpContext.User.Identity.Name && x.AnimalId == walk.AnimalId);

            if (animal == null)
            {
                return BadRequest();
            }

            walk.DateStart = DateTime.Now;

            _context.Walks.Add(walk);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                walk.WalkId,
                walk.Volunteer,
                walk.DateStart,
                walk.DateEnd
            });
        }

        [Authorize(Roles = "User")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteWalk(int id)
        {
            var walk = await _context.Walks
                .SingleOrDefaultAsync(x => x.Animal.Shelter.User.Email == HttpContext.User.Identity.Name && x.WalkId == id);

            if (walk == null)
            {
                return NotFound();
            }

            _context.Walks.Remove(walk);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WalkExists(int id)
        {
            return _context.Walks.Any(e => e.WalkId == id);
        }
    }
}
