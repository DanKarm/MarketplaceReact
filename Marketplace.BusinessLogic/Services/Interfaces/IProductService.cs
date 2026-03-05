using Marketplace.Api.Dtos.Product;

public interface IProductService
{
    Task<PagedResult<ProductDto>> GetAllAsync(int page, int pageSize, string? search);
    Task<ProductDto?> GetByIdAsync(int id);
}