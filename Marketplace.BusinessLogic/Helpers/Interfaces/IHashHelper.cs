namespace Marketplace.BusinessLogic.Helpers.Interfaces;

public interface IHashHelper
{
    string Hash(string value);
    bool Verify(string value, string hash);
}