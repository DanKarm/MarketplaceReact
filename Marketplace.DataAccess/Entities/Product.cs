namespace Marketplace.DataAccess.Entities;

public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;

    public decimal Price { get; set; }

    public string CategoryName { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
    
    public string? ImageUrl { get; set; }

    public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}