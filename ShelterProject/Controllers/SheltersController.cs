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
    public class SheltersController : ControllerBase
    {
        private readonly DataContext _context;

        public SheltersController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet("all")]
        public async Task<IActionResult> GetShelters()
        {
            var shelters = await _context.Shelters.Where(x => x.User.Email == HttpContext.User.Identity.Name).ToListAsync();
            return Ok(shelters.Select(x => new
            {
                x.ShelterId,
                x.Name,
                x.Address
            }));
        }

        [Authorize(Roles = "User")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutShelter(int id, Shelter shelter)
        {
            if (id != shelter.ShelterId)
            {
                return BadRequest();
            }

            if (!await _context.Shelters.AnyAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.ShelterId == id))
            {
                return BadRequest();
            }

            _context.Entry(shelter).State = EntityState.Modified;
            _context.Entry(shelter).Property(x => x.UserId).IsModified = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShelterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Authorize(Roles = "User")]
        [HttpPost("create")]
        public async Task<ActionResult<Shelter>> PostShelter(Shelter shelter)
        {
            shelter.User = await _context.Users
                .SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            _context.Shelters.Add(shelter);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                shelter.ShelterId,
                shelter.Name,
                shelter.Address
            });
        }

        [Authorize(Roles = "User")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteShelter(int id)
        {
            var shelter = await _context.Shelters
                .Where(x => x.User.Email == HttpContext.User.Identity.Name)
                .SingleOrDefaultAsync(x => x.ShelterId == id);

            if (shelter == null)
            {
                return NotFound();
            }

            _context.Shelters.Remove(shelter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShelterExists(int id)
        {
            return _context.Shelters.Any(e => e.ShelterId == id);
        }
    }
}
