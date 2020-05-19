using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task = Domain.Task;

namespace DAL.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private Context _context;

        public TaskRepository(Context context)
        {
            _context = context;
        }

        public List<Task> GetAll()
        {
            var tasks = _context.Tasks.OrderBy(t => t.Priority).ToList();
            return tasks;
        }

        public Task GetById(int id)
        {
            var task = _context.Tasks.FirstOrDefault(e => e.Id == id);

            if (task == null)
            {
                throw new Exception("Employee was not found!");
            }

            return task;
        }
        public List<Task> GetByEmployeeId(int employeeId)
        {
            var tasks = _context.Tasks.OrderBy(t => t.Priority)
                .Where(e => e.EmployeeId == employeeId).ToList();

            return tasks;
        }

        public void Create(Task task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
        }

        public void Update(Task task)
        {
            var t = _context.Tasks.FirstOrDefault(e => e.Id == task.Id);

            if (t == null)
            {
                throw new Exception("Employee was not found!");
            }

            t.Title = task.Title;
            t.Description = task.Description;
            t.EmployeeId = task.EmployeeId;
            t.Estimate = task.Estimate;
            t.Priority = task.Priority;
            t.State = task.State;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var task = _context.Tasks.FirstOrDefault(e => e.Id == id);

            if (task == null)
            {
                throw new Exception("Employee was not found!");
            }

            _context.Remove(task);
            _context.SaveChanges();
        }
    }
}
