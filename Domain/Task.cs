using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Task
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Priority Priority { get; set; }
        public State State { get; set; }
        public int Estimate { get; set; } //in minutes
    }
}
