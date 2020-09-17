using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private IMediator _mediator;
        //Creating an object for mediatr
        protected IMediator Mediator => _mediator ?? (_mediator= HttpContext.RequestServices.GetService<IMediator>());
    }
}