namespace Marketplace.BusinessLogic.Models.Authentication.Requests;

public class LoginRequestModel
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}
