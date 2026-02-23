using Microsoft.EntityFrameworkCore;
using Marketplace.DataAccess;
using Marketplace.Api.Dtos.Product;

public class ProductService : IProductService
{
    private readonly MarketplaceDbContext _context;

    public ProductService(MarketplaceDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<ProductDto>> GetAllAsync(int page, int pageSize)
    {
        var query = _context.Products.AsNoTracking();

        var totalCount = await query.CountAsync();

        var products = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                ImageUrl = p.ImageUrl,
            })
            .ToListAsync();

        return new PagedResult<ProductDto>
        {
            Items = products,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        return await _context.Products
            .AsNoTracking()
            .Where(p => p.Id == id)
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                ImageUrl = p.ImageUrl,
            })
            .FirstOrDefaultAsync();
    }
}