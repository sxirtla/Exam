using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private Context _context;

        public EmployeeRepository(Context context)
        {
            _context = context;
        }

        public List<Employee> GetAll()
        {
            var employees = _context.Employees.OrderBy(e => e.Name).ToList();
            return employees;
        }

        public Employee GetById(int id)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Id == id);

            if (employee == null)
            {
                throw new Exception("Employee was not found!");
            }

            return employee;
        }

        public void Create(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
        }

        public void Update(Employee employee)
        {
            var emp = _context.Employees.FirstOrDefault(e => e.Id == employee.Id);

            if (emp == null)
            {
                throw new Exception("Employee was not found!");
            }

            emp.Name = employee.Name;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Id == id);

            if (employee == null)
            {
                throw new Exception("Employee was not found!");
            }

            _context.Remove(employee);
            _context.SaveChanges();
        }
    }
}
