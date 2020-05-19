using Domain;
using System.Collections.Generic;

namespace DAL.Repository
{
    public interface IEmployeeRepository
    {
        void Create(Employee employee);
        void Delete(int id);
        List<Employee> GetAll();
        Employee GetById(int id);
        void Update(Employee employee);
    }
}