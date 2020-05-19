import { Subject } from "rxjs";

export class BaseDialogService<TInfo, TClose, TResult>
{

  public OnDialogShow = new Subject<TInfo>();
  public OnDialogClose = new Subject<TClose>();
  public OnDialogSuccess = new Subject<TResult>();

  public ShowDialog(info: TInfo) {
    this.OnDialogShow.next(info);
  }

  public CloseDialog(close: TClose) {
    this.OnDialogClose.next(close);
  }

  public SuccessDialog(value: TResult) {
    this.OnDialogSuccess.next(value);
  }
}
