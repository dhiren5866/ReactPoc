using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                this._userManager = userManager;
                this._userAccessor = userAccessor;
                this._jwtGenerator = jwtGenerator;
   
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
               var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUserName());

               return new User
               {
                   DisplayName = user.DisplayName,
                   UserName = user.UserName,
                   Token = _jwtGenerator.CreateToken(user),
                   Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
               };

               
            }
        }
    }
}