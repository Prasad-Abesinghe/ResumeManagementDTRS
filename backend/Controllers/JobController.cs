using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Job;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private applicationDbContext _context { get; }
        private IMapper _mapper { get; }
        public JobController(applicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD 

        //Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateJob([FromBody] JobCreateDto dto)
        {
            var newJob = _mapper.Map<Job>(dto);
            await _context.Jobs.AddAsync(newJob);
            await _context.SaveChangesAsync();
            return Ok("Job Created Succesfully");
        }
        //read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<JobGetDto>>> GetJobs()
        {
            var jobs=await _context.Jobs.Include(job=>job.Company).OrderByDescending(q=>q.CreateAt).ToListAsync();
            var convertJobs=_mapper.Map <IEnumerable < JobGetDto >> (jobs);

            return Ok(convertJobs);
        }

        //read (Get Company by ID)

        //update

        //delete
    }
}
