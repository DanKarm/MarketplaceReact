using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Marketplace.Api.ViewModels.Authentication.Requests;
using Marketplace.Api.ViewModels.Authentication.Responses;
using Marketplace.BusinessLogic.Models.Authentication.Requests;
using Marketplace.BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Marketplace.Api.Models.Settings;


namespace Marketplace.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    private readonly TokenSettings _tokenSettings;

    public AuthenticationController(
        IAuthenticationService authenticationService,
        IOptions<TokenSettings> tokenSettings)
    {
        _authenticationService = authenticationService;
        _tokenSettings = tokenSettings.Value;
    }

    [HttpPost("Login")]
    public IActionResult Login(LoginRequestViewModel loginRequestViewModel)
    {
        var loginRequestModel = new LoginRequestModel
        {
            Email = loginRequestViewModel.Email,
            Password = loginRequestViewModel.Password
        };

        var responseModel = _authenticationService.Login(loginRequestModel);

        if (responseModel == null)
        {
            return BadRequest("Invalid email or password.");
        }

        var token = GenerateJwtToken(responseModel.UserId);

        var responseViewModel = new LoginResponseViewModel
        {
            Token = token
        };

        return Ok(responseViewModel);
    }

    [HttpPost("Registration")]
    public IActionResult Register(RegisterRequestViewModel registerRequestViewModel)
    {
        var registerRequestModel = new RegisterRequestModel
        {
            Email = registerRequestViewModel.Email,
            Password = registerRequestViewModel.Password,

            FirstName = registerRequestViewModel.FirstName,
            LastName = registerRequestViewModel.LastName,
            Phone = registerRequestViewModel.Phone
        };

        _authenticationService.Register(registerRequestModel);

        return Ok();
    }

    private string GenerateJwtToken(int userId)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sid, userId.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenSettings.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _tokenSettings.Issuer,
            audience: _tokenSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_tokenSettings.ExpirationInMinutes),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
