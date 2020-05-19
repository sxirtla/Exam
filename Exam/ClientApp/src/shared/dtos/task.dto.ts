export class TaskDto {
  id: number;
  title: string = "";
  description: string = "";
  state: number = 0;
  employeeId: number = 0;
  priority: number = 0;
  estimate: number = 0;
}
