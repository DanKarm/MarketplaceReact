using Marketplace.BusinessLogic.Dtos.Cart;

namespace Marketplace.Api.Controllers;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/cart")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var userId = 123;

        var cart = await _cartService.GetCartAsync(userId);

        return Ok(cart);
    }

    [HttpPost]
    public async Task<IActionResult> AddToCart(AddToCartDto dto)
    {
        var userId = 123;

        var cart = await _cartService.AddToCartAsync(userId, dto);

        return Ok(cart);
    }

    [HttpPut("{productId}")]
    public async Task<IActionResult> UpdateItem(
        int productId,
        UpdateCartItemDto dto)
    {
        var userId = 123;

        var cart = await _cartService.UpdateItemAsync(
            userId,
            productId,
            dto.Quantity);

        return Ok(cart);
    }

    [HttpDelete("{productId}")]
    public async Task<IActionResult> RemoveItem(int productId)
    {
        var userId = 123;

        var result = await _cartService.RemoveItemAsync(userId, productId);

        if (!result)
            return NotFound();

        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        var userId = 123;

        await _cartService.ClearCartAsync(userId);

        return NoContent();
    }
}