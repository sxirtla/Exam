using DAL;
using DAL.Repository;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace DAL.Registrations
{
    public static class RepositoryRegistration
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddTransient<IEmployeeRepository, EmployeeRepository>();
            services.AddTransient<ITaskRepository, TaskRepository>();

            return services;
        }
    }
}
