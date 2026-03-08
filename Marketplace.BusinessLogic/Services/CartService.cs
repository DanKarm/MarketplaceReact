using Marketplace.BusinessLogic.Dtos.Cart;
using Marketplace.BusinessLogic.Models.Cart;
using Marketplace.DataAccess;
using Microsoft.EntityFrameworkCore;

using CartEntity = Marketplace.DataAccess.Entities.Cart;
using CartItemEntity = Marketplace.DataAccess.Entities.CartItem;

namespace Marketplace.BusinessLogic.Services;

public class CartService : ICartService
{
    private readonly MarketplaceDbContext _context;

    public CartService(MarketplaceDbContext context)
    {
        _context = context;
    }

    public async Task<Cart?> GetCartAsync(int userId)
    {
        var cart = await _context.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null) return null;

        return MapCart(cart);
    }

    public async Task<Cart> AddToCartAsync(int userId, AddToCartDto dto)
    {
        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
        {
            cart = new CartEntity
            {
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                Items = new List<CartItemEntity>()
            };

            _context.Carts.Add(cart);
        }

        var existingItem = cart.Items
            .FirstOrDefault(i => i.ProductId == dto.ProductId);

        if (existingItem != null)
        {
            existingItem.Quantity += dto.Quantity;
        }
        else
        {
            cart.Items.Add(new CartItemEntity
            {
                ProductId = dto.ProductId,
                Quantity = dto.Quantity
            });
        }

        await _context.SaveChangesAsync();

        cart = await _context.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .FirstAsync(c => c.Id == cart.Id);

        return MapCart(cart);
    }

    public async Task<Cart?> UpdateItemAsync(int userId, int productId, int quantity)
    {
        var cart = await _context.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null) return null;

        var item = cart.Items
            .FirstOrDefault(i => i.ProductId == productId);

        if (item == null) return MapCart(cart);

        item.Quantity = quantity;

        await _context.SaveChangesAsync();

        return MapCart(cart);
    }

    public async Task<bool> RemoveItemAsync(int userId, int productId)
    {
        var item = await _context.CartItems
            .Include(i => i.Cart)
            .FirstOrDefaultAsync(i =>
                i.ProductId == productId &&
                i.Cart.UserId == userId);

        if (item == null) return false;

        _context.CartItems.Remove(item);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task ClearCartAsync(int userId)
    {
        var items = await _context.CartItems
            .Include(i => i.Cart)
            .Where(i => i.Cart.UserId == userId)
            .ToListAsync();

        _context.CartItems.RemoveRange(items);

        await _context.SaveChangesAsync();
    }

    private Cart MapCart(CartEntity cart)
    {
        return new Cart
        {
            Id = cart.Id,
            UserId = cart.UserId,
            Items = cart.Items.Select(i => new CartItem
            {
                Id = i.Id,
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                CartId = i.CartId,
                Product = new Marketplace.BusinessLogic.Models.Product.Product
                {
                    Id = i.Product.Id,
                    Name = i.Product.Name,
                    Description = i.Product.Description,
                    Price = i.Product.Price,
                    ImageUrl = i.Product.ImageUrl,
                }
            }).ToList()
        };
    }
}