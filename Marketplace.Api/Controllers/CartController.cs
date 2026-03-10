
namespace Marketplace.Api.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Marketplace.BusinessLogic.Dtos.Cart;
using Microsoft.AspNetCore.Authorization;
using Marketplace.BusinessLogic.Models.Cart;

[ApiController]
[Route("api/cart")]
[Authorize]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    }

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var userId = GetUserId();

        var cart = await _cartService.GetCartAsync(userId);



        if (cart == null)
            cart = new Cart
            {
                Items = new List<CartItem>()
            };

        return Ok(cart);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddToCart(AddToCartDto dto) // из API
    {
        var userId = GetUserId();

        var serviceDto = new AddToCartDto
        {
            ProductId = dto.ProductId,
            Quantity = dto.Quantity
        };

        var cart = await _cartService.AddToCartAsync(userId, serviceDto);
        return Ok(cart);
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateItem(int productId, int quantity)
    {
        var userId = GetUserId();

        var cart = await _cartService.UpdateItemAsync(userId, productId, quantity);

        if (cart == null)
            return NotFound();

        return Ok(cart);
    }

    [HttpDelete("remove")]
    public async Task<IActionResult> RemoveItem(int productId)
    {
        var userId = GetUserId();

        var result = await _cartService.RemoveItemAsync(userId, productId);

        if (!result)
            return NotFound();

        return Ok();
    }

    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCart()
    {
        var userId = GetUserId();

        await _cartService.ClearCartAsync(userId);

        return Ok();
    }
}