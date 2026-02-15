namespace Marketplace.BusinessLogic.Models.Authentication.Requests;

public class RegisterRequestModel
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;

    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Phone { get; set; } = null!;
}