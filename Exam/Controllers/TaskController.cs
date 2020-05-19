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
    public class TaskController : ControllerBase
    {
        private ITaskRepository _taskRepository;

        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet("[action]")]
        public IEnumerable<Task> Get()
        {
            return _taskRepository.GetAll();
        }

        [HttpGet("[action]")]
        public Task GetById(int id)
        {
            return _taskRepository.GetById(id);
        }

        [HttpGet("[action]")]
        public IEnumerable<Task> GetByEmployeeId(int id)
        {
            return _taskRepository.GetByEmployeeId(id);
        }

        [HttpPost("[action]")]
        public void Post([FromBody]Task task)
        {
            _taskRepository.Create(task);
        }

        [HttpPut("[action]")]
        public void Put(Task task)
        {
            _taskRepository.Update(task);
        }

        [HttpDelete("[action]")]
        public void Delete(int id)
        {
            _taskRepository.Delete(id);
        }
    }
}
