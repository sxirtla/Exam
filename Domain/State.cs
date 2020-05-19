using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public enum State
    {
        [Display(Name = "New")]
        New = 1,
        [Display(Name = "Active")]
        Active = 2,
        [Display(Name = "Resolved")]
        Resolved = 3,
        [Display(Name = "Closed")]
        Closed = 4
    }
}
