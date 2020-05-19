import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { TaskDialogService } from "./task-dialog.service";
import { TaskService } from "../../../shared/services/task.service";
import { TaskDto } from "../../../shared/dtos/task.dto";
import { State } from "../../../shared/dtos/state.enum.dto";
import { Priority } from "../../../shared/dtos/priority.enum.dto";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeeDto } from "../../../shared/dtos/employee.dto";
import { EmployeeService } from "../../../shared/services/employee.service";

@Component({
  selector: "task-dialog",
  templateUrl: "./task-dialog.component.html"
})
export class TaskDialogComponent implements OnInit, OnDestroy {

  public IsShow: boolean = false;
  public task: TaskDto;
  public myForm: FormGroup;
  public formError: string;
  public employees: EmployeeDto[];

  State = State;
  Priority = Priority;

  private sub: Subscription = new Subscription();

  constructor(public taskDialogService: TaskDialogService,
    public taskService: TaskService,
    public employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.sub.add(
      this.taskDialogService.OnDialogShow.subscribe(taskId => {
        this.IsShow = true;
        this.formError = "";
        this.task = new TaskDto();

        this.sub.add(
          this.employeeService.getAll().subscribe(result => {
            this.employees = result;
          }, error => console.error(error))
        );

        if (taskId) {
          this.sub.add(
            this.taskService.getById(taskId).subscribe(data => {
              this.task = data;
            }, error => console.error(error))
          );
        }

      })
    );

    this.myForm = new FormGroup({
      EmployeeId: new FormControl('', Validators.required),
      Title: new FormControl('', Validators.required),
      Description: new FormControl(''),
      State: new FormControl('', Validators.required),
      Priority: new FormControl('', Validators.required),
      Estimate: new FormControl(''),
    });
  }

  public OnCloseClick() {
    this.HideDialog();
  }

  HideDialog() {
    this.IsShow = false;
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      this.formError = "Please fill the form!";
      return;
    }

    this.task.employeeId = +form.value.EmployeeId;
    this.task.title = form.value.Title;
    this.task.description = form.value.Description;
    this.task.state = +form.value.State;
    this.task.priority = +form.value.Priority;
    this.task.estimate = +form.value.Estimate;

    if (this.task.id) {
      this.sub.add(
        this.taskService.put(this.task).subscribe(data => {
          this.taskDialogService.SuccessDialog(data);

          this.HideDialog();
        })
      );
      return;
    }

    this.sub.add(
      this.taskService.post(this.task).subscribe(data => {
        this.taskDialogService.SuccessDialog(data);

        this.HideDialog();
      })
    );
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
