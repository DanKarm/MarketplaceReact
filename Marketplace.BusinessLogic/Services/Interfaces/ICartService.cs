using Marketplace.BusinessLogic.Dtos.Cart;
using Marketplace.BusinessLogic.Models.Cart;

public interface ICartService
{
    Task<Cart?> GetCartAsync(int userId);

    Task<Cart> AddToCartAsync(int userId, AddToCartDto dto);

    Task<Cart?> UpdateItemAsync(int userId, int productId, int quantity);

    Task<bool> RemoveItemAsync(int userId, int productId);

    Task ClearCartAsync(int userId);
}