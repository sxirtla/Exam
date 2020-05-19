import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { EmployeeDialogService } from "./employee-dialog.service";
import { EmployeeDto } from "../../../shared/dtos/employee.dto";
import { EmployeeService } from "../../../shared/services/employee.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "employee-dialog",
  templateUrl: "./employee-dialog.component.html"
})
export class EmployeeDialogComponent implements OnInit, OnDestroy {

  public IsShow: boolean = false;
  public IsEditMode: boolean = false;
  public myForm: FormGroup;
  public formError: string;
  public employee: EmployeeDto;

  private sub: Subscription = new Subscription();

  constructor(public employeeDialogService: EmployeeDialogService,
    public employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.sub.add(
      this.employeeDialogService.OnDialogShow.subscribe(employeeId => {
        this.IsShow = true;
        this.formError = "";
        this.employee = new EmployeeDto();

        if (employeeId) {
          this.IsEditMode = true;
          this.employeeService.getById(employeeId).subscribe(res => {
            this.employee = res;
          });
        }
      })
    );

    this.myForm = new FormGroup({
      Name: new FormControl('', Validators.required),
    });
  }

  public OnCloseClick() {
    this.HideDialog();
  }

  HideDialog() {
    this.IsShow = false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      this.formError = "Please fill the form!";
      return;
    }

    let employee = new EmployeeDto();
    employee.name = form.value.Name;

    if (this.IsEditMode) {
      employee.id = this.employee.id;
      this.sub.add(
        this.employeeService.put(employee).subscribe(data => {
          this.employeeDialogService.SuccessDialog(data);

          this.HideDialog();
        })
      );
      return;
    }

    this.sub.add(
      this.employeeService.post(employee).subscribe(data => {
        this.employeeDialogService.SuccessDialog(data);

        this.HideDialog();
      })
    );
  }

}
