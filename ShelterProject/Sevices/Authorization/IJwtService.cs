using ShelterProject.Services.Authorization.Models;

namespace ShelterProject.Sevices.Authorization
{
    public interface IJwtService
    {
        public string GetToken(JwtUser user);
    }
}
