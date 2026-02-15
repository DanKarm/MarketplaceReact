namespace Marketplace.Api.ViewModels.Authentication.Requests;

public class LoginRequestViewModel
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}