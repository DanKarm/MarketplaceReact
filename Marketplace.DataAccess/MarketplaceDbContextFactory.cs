using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Marketplace.DataAccess
{
    public class MarketplaceDbContextFactory : IDesignTimeDbContextFactory<MarketplaceDbContext>
    {
        public MarketplaceDbContext CreateDbContext(string[] args)
        {
            const string connectionString =
                "Host=localhost;Port=5432;Database=marketplace;Username=user;Password=password";

            return new MarketplaceDbContext((new DbContextOptionsBuilder<MarketplaceDbContext>()
                .UseNpgsql(connectionString)
                .Options));
        }
    }
}
