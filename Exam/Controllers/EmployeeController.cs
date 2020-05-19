using System;
using System.Collections.Generic;
using System.Linq;
using DAL.Repository;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet("[action]")]
        public IEnumerable<Employee> Get()
        {
            return _employeeRepository.GetAll();
        }

        [HttpGet("[action]")]
        public Employee GetById(int id)
        {
            return _employeeRepository.GetById(id);
        }

        [HttpPost("[action]")]
        public void Post(Employee employee)
        {
            _employeeRepository.Create(employee);
        }

        [HttpPut("[action]")]
        public void Put(Employee employee)
        {
            _employeeRepository.Update(employee);
        }

        [HttpDelete("[action]")]
        public void Delete(int id)
        {
            _employeeRepository.Delete(id);
        }
    }
}
