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
    public class LogPointsController : ControllerBase
    {
        private readonly DataContext _context;

        public LogPointsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User")]
        [HttpGet("all/{id}")]
        public async Task<IActionResult> GetLogPoins(int id)
        {
            var walk = await _context.Walks
                .Include(x => x.LogPoints)
                .SingleOrDefaultAsync(x => x.Animal.Shelter.User.Email == HttpContext.User.Identity.Name && x.WalkId == id);

            if (walk == null)
            {
                return BadRequest();
            }

            return Ok(new
            {
                walk.Volunteer,
                walk.DateStart,
                walk.DateEnd,
                LogPoints = walk.LogPoints.OrderByDescending(x => x.DateTime).Select(x => new {
                    x.LogPointId,
                    x.Point,
                    x.DateTime
                })
            });
        }

        [Authorize(Roles = "User")]
        [HttpPost("createRandom/{id}")]
        public async Task<IActionResult> PostLogPoin(int id)
        {
            var walk = await _context.Walks
                .Include(x => x.LogPoints)
                .SingleOrDefaultAsync(x => x.Animal.Shelter.User.Email == HttpContext.User.Identity.Name && x.WalkId == id);

            if (walk == null)
            {
                return BadRequest();
            }

            if(walk.DateEnd < DateTime.Now)
            {
                return BadRequest();
            }

            Random random = new Random();

            var logPoin = new LogPoint
            {
                DateTime = DateTime.Now,
                Point = $"{random.NextDouble(-180, 180)}, {random.NextDouble(-180, 180)}",
                WalkId = id
            };

            _context.LogPoints.Add(logPoin);
            await _context.SaveChangesAsync();

            return Ok(new {
                logPoin.LogPointId,
                logPoin.Point,
                logPoin.DateTime
            });
        }

        [HttpPost("createRandomFromIOT/{id}")]
        public async Task<IActionResult> PostLogPoinFromIOT(int id)
        {
            var walk = await _context.Walks
                .Include(x => x.LogPoints)
                .SingleOrDefaultAsync(x => x.WalkId == id);

            if (walk == null)
            {
                return BadRequest();
            }

            if (walk.DateEnd < DateTime.Now)
            {
                return BadRequest();
            }

            Random random = new Random();

            var logPoin = new LogPoint
            {
                DateTime = DateTime.Now,
                Point = $"{random.NextDouble(-180, 180)}, {random.NextDouble(-180, 180)}",
                WalkId = id
            };

            _context.LogPoints.Add(logPoin);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public static class RandomExtensions
    {
        public static double NextDouble(
            this Random random,
            double minValue,
            double maxValue)
        {
            return random.NextDouble() * (maxValue - minValue) + minValue;
        }
    }
}
