using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        //To Query the data and get the list of activities
        public class Query : IRequest<List<ActivityDto>> { }

        //To handle the request coming from the api adding constructor will make the api more thin and uses only http requests in and out.
        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                .ToListAsync();

                if (activities == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not Found records" });

                return _mapper.Map<List<Activity>,List<ActivityDto>>(activities);
            }
        }

    }
}