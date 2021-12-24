using Microsoft.EntityFrameworkCore;

namespace ShelterProject.Models
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Shelter> Shelters { get; set; }
        public DbSet<Animal> Animals { get; set; }
        public DbSet<Walk> Walks { get; set; }
        public DbSet<LogPoin> LogPoins { get; set; }
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
    }
}
