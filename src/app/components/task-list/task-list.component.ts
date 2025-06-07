import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskPriority } from 'src/app/enums/task-priority.enum';
import { NewTask, Task } from 'src/app/interfaces/task.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { TaskAddEditFormComponent } from '../task-add-edit-form/task-add-edit-form.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  tasksLoading = false;

  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.tasksLoading = true;

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.tasksLoading = false;
      },
      error: (err) => {
        this.tasksLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error retrieving your task list',
        });
      },
    });
  }

  saveNewTask() {}

  openAddNewTaskModal() {
    this.ref = this.dialogService.open(TaskAddEditFormComponent, {
      width: '40vw',
      modal: true,
      closable: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });

    this.ref.onClose.subscribe((newTask: NewTask) => {
      if (newTask) {
        this.taskService.saveTask(newTask).subscribe({
          next: () => {
            this.getTasks();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error adding new task',
              detail: 'Please try again',
            });
          },
        });
      }
    });
  }

  openTaskEditForm(taskId: number) {
    const taskForEdit = this.tasks.find((t) => t.id === taskId);

    this.ref = this.dialogService.open(TaskAddEditFormComponent, {
      data: {
        task: taskForEdit,
      },
      width: '40vw',
      modal: true,
      closable: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });

    this.ref.onClose.subscribe(
      (result: { task: Task; isForDelete: boolean }) => {
        if (result && !result.isForDelete && result.task) {
          this.taskService.updateTask(result.task).subscribe({
            next: () => {
              this.getTasks();
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error while updating task',
                detail: 'Please try again',
              });
            },
          });
        }

        if (result && result.isForDelete) {
          this.taskService.deleteTask(result.task.id!).subscribe({
            next: () => {
              this.getTasks();
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error while deleting task',
                detail: 'Please try again',
              });
            },
          });
        }
      }
    );
  }

  logOut() {
    this.authService.logout();

    this.router.navigate(['/log-in']);
  }

  getTaskPriority(priority: number) {
    if (priority === TaskPriority.LOW) {
      return 'Low';
    }
    if (priority === TaskPriority.MEDIUM) {
      return 'Medium';
    }
    if (priority === TaskPriority.HIGH) {
      return 'High';
    }

    return '';
  }

  getTaskPriorityColor(priority: number): string {
    switch (priority) {
      case TaskPriority.LOW:
        return '#22C55E';
      case TaskPriority.MEDIUM:
        return '#F97316';
      case TaskPriority.HIGH:
        return '#EF4444';
      default:
        return '#666666';
    }
  }
}
