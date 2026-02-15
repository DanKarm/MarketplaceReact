using Marketplace.BusinessLogic.Models.Authentication.Requests;
using Marketplace.BusinessLogic.Models.Authentication.Responses;

namespace Marketplace.BusinessLogic.Services.Interfaces;

public interface IAuthenticationService
{
    LoginResponseModel? Login(LoginRequestModel loginRequestModel);

    void Register(RegisterRequestModel registerRequestModel);
}