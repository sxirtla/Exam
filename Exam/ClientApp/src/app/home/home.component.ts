import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { EmployeeDto } from '../../shared/dtos/employee.dto';
import { TaskService } from '../../shared/services/task.service';
import { TaskDto } from '../../shared/dtos/task.dto';
import { State } from '../../shared/dtos/state.enum.dto';
import { Priority } from '../../shared/dtos/priority.enum.dto';
import { TaskDialogService } from './task-dialog/task-dialog.service';
import { Subscription } from 'rxjs';
import { EmployeeDialogService } from './employee-dialog/employee-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();

  public employees: EmployeeDto[];
  public tasks: TaskDto[];
  public selectedEmployee: number;
  State = State;
  Priority = Priority;

  constructor(public employeeService: EmployeeService,
    public employeeDialogService: EmployeeDialogService,
    public taskService: TaskService,
    private taskDialogService: TaskDialogService) {
  }

  ngOnInit(): void {
    this.sub.add(
      this.employeeService.getAll().subscribe(result => {
        this.employees = result;
        this.selectedEmployee = this.employees[0].id;

        this.showTasks(this.selectedEmployee);
      }, error => console.error(error))
    );

    this.employeeDialogService.OnDialogSuccess.subscribe(res => {
      this.GetEmployees();
    });

    this.taskDialogService.OnDialogSuccess.subscribe(res => {
      this.showTasks(this.selectedEmployee);
    });
  }

  GetEmployees(): void {
    this.sub.add(
      this.employeeService.getAll().subscribe(result => {
        this.employees = result;
      }, error => console.error(error))
    );
  }

  showTasks(employeeId): void {
    this.selectedEmployee = employeeId;
    this.sub.add(
      this.taskService.getByEmployeeId(employeeId).subscribe(data => {
        this.tasks = data;
      }, error => console.error(error))
    );
  }

  OpenTaskDialog(taskId): void {
    this.taskDialogService.ShowDialog(taskId);
  }

  OpenEmployeeDialog(): void {
    this.employeeDialogService.ShowDialog(null);
  }

  EditEmployee(employeeId): void {
    this.employeeDialogService.ShowDialog(employeeId);
  }

  DeleteEmployee(employeeId): void {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.sub.add(
        this.employeeService.delete(employeeId).subscribe(data => {
          this.GetEmployees();
        }, error => console.error(error))
      );
    }
  }

  DeleteTask(taskId): void {
    if (confirm("Are you sure you want to delete this task?")) {
      this.sub.add(
        this.taskService.delete(taskId).subscribe(data => {
          this.showTasks(this.selectedEmployee);
        }, error => console.error(error))
      );
    }
    return;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

