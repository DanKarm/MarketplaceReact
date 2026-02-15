using Marketplace.BusinessLogic.Helpers.Interfaces;
using Marketplace.BusinessLogic.Models.Authentication.Requests;
using Marketplace.BusinessLogic.Models.Authentication.Responses;
using Marketplace.BusinessLogic.Services.Interfaces;
using Marketplace.DataAccess;
using Marketplace.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.BusinessLogic.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly MarketplaceDbContext _dbContext;
    private readonly IHashHelper _hashHelper;

    public AuthenticationService(MarketplaceDbContext dbContext, IHashHelper hashHelper)
    {
        _dbContext = dbContext;
        _hashHelper = hashHelper;
    }

    public LoginResponseModel? Login(LoginRequestModel loginRequestModel)
    {
        var user = _dbContext.Users
            .FirstOrDefault(u => u.Email == loginRequestModel.Email);

        if (user == null)
            return null;

        var isPasswordCorrect = _hashHelper.Verify(loginRequestModel.Password, user.PasswordHash);

        if (!isPasswordCorrect)
            return null;

        return new LoginResponseModel
        {
            UserId = user.Id
        };
    }

    public void Register(RegisterRequestModel registerRequestModel)
    {
        var isEmailExists = _dbContext.Users
            .Any(u => u.Email == registerRequestModel.Email);

        if (isEmailExists)
            return;

        var user = new User
        {
            Email = registerRequestModel.Email,
            PasswordHash = _hashHelper.Hash(registerRequestModel.Password),

            FirstName = registerRequestModel.FirstName,
            LastName = registerRequestModel.LastName,
            Phone = registerRequestModel.Phone,

            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();
    }
}