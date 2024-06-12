using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompnayController : ControllerBase
    {
        private applicationDbContext _context { get; }
        private IMapper _mapper {  get; }
        public CompnayController(applicationDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        //crud

        //create
       [HttpPost]
        [Route("Create")]
       public async Task<IActionResult> CreateCompany([FromBody]CompanyCreateDto dto)
        {
            var newCompany = _mapper.Map<Company>(dto);
            await _context.Companies.AddAsync(newCompany);
            await _context.SaveChangesAsync();

            return Ok("Company Created Succesfully");

        }
        //read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompanies()
        {
            var companies=await _context.Companies.OrderByDescending(q => q.CreateAt).ToListAsync();
            var convertedCompanies=_mapper.Map <IEnumerable<CompanyGetDto>>(companies);
            return Ok(convertedCompanies);

        }

        //read (Get Company by ID)

        //update

        //delete

     
    }
}
