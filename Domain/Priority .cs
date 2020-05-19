using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public enum Priority
    {
        [Display(Name = "Critical")]
        Critical = 1,
        [Display(Name = "Medium")]
        Medium = 2,
        [Display(Name = "Low")]
        Low = 3
    }
}
