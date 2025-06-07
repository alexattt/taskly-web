import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewTask, Task } from '../interfaces/task.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(`${this.backendUrl}/task`);
  }

  saveTask(newTask: NewTask) {
    return this.http.post(`${this.backendUrl}/task`, newTask);
  }

  updateTask(updatedTask: Task) {
    return this.http.put(
      `${this.backendUrl}/task/${updatedTask.id}`,
      updatedTask
    );
  }

  deleteTask(taskId: number) {
    return this.http.delete(`${this.backendUrl}/task/${taskId}`);
  }
}
