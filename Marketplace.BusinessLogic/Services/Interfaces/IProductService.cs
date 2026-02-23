using Marketplace.Api.Dtos.Product;

public interface IProductService
{
    Task<PagedResult<ProductDto>> GetAllAsync(int page, int pageSize);
    Task<ProductDto?> GetByIdAsync(int id);
}
