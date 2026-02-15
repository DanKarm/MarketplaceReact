using System.Security.Cryptography;
using Marketplace.BusinessLogic.Helpers.Interfaces;

namespace Marketplace.BusinessLogic.Helpers;

 public class HashHelper : IHashHelper
    {
        private const int SaltSize = 16; // 128 bit
        private const int HashSize = 32; // 256 bit
        private const int Iterations = 100_000;
        private static readonly HashAlgorithmName _hashAlgorithmName = HashAlgorithmName.SHA256;
        private const char Delimiter = ';';
        
        public string Hash(string value)
        {
            ArgumentNullException.ThrowIfNull(value);

            // 1. Create a cryptographically secure random salt
            var salt = RandomNumberGenerator.GetBytes(SaltSize);

            // 2. Hash the password using PBKDF2
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                value,
                salt,
                Iterations,
                _hashAlgorithmName,
                HashSize);

            // 3. Combine salt and hash and convert to a storable format (Base64)
            return $"{Convert.ToBase64String(salt)}{Delimiter}{Convert.ToBase64String(hash)}";
        }

        public bool Verify(string value, string hash)
        {
            ArgumentNullException.ThrowIfNull(value);
            ArgumentNullException.ThrowIfNull(hash);

            // 1. Extract the salt and hash from the stored string
            var parts = hash.Split(Delimiter);
            if (parts.Length != 2)
            {
                // Invalid format, treat as a failed verification
                return false;
            }

            var salt = Convert.FromBase64String(parts[0]);
            var hashWithoutSalt = Convert.FromBase64String(parts[1]);

            // 2. Re-hash the incoming password using the *same* salt and parameters
            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(
                value,
                salt,
                Iterations,
                _hashAlgorithmName,
                HashSize);

            // 3. Compare the hashes in a constant-time manner to prevent timing attacks
            return CryptographicOperations.FixedTimeEquals(hashWithoutSalt, hashToCompare);
        }
    }