using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=.;Database=backend;Trusted_Connection=true;TrustServerCertificate=true");
        }

        public DbSet<City> Cities { get; set; } 

    }
}
