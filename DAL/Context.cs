using Domain;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
          : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}