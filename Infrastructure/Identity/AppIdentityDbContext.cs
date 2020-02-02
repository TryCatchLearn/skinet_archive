using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContext : IdentityDbContext<AppUser>
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>().Property(a => a.DisplayName)
                .HasMaxLength(20)
                .IsRequired();

            builder.Entity<Address>().Property(a => a.FirstName).IsRequired();
            builder.Entity<Address>().Property(a => a.LastName).IsRequired();
            builder.Entity<Address>().Property(a => a.Street).IsRequired();
            builder.Entity<Address>().Property(a => a.City).IsRequired();
            builder.Entity<Address>().Property(a => a.State).IsRequired();
            builder.Entity<Address>().Property(a => a.Zipcode).IsRequired();
        }
    }
}