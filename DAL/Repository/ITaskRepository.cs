using Domain;
using System.Collections.Generic;

namespace DAL.Repository
{
    public interface ITaskRepository
    {
        void Create(Task task);
        void Delete(int id);
        List<Task> GetAll();
        Task GetById(int id);
        void Update(Task task);
        List<Task> GetByEmployeeId(int id);
    }
}