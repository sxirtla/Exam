import { Injectable } from "@angular/core";
import { BaseDialogService } from "../../../shared/services/dialog.service";

@Injectable({
  providedIn: 'root'
})
export class TaskDialogService extends BaseDialogService<any, any, any>
{
  constructor() {
    super();
  }
}
