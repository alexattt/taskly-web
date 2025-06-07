import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewTask, Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-add-edit-form',
  templateUrl: './task-add-edit-form.component.html',
  styleUrl: './task-add-edit-form.component.css',
})
export class TaskAddEditFormComponent implements OnInit {
  id = 0;
  name = '';
  description = '';
  taskPriority = 1;
  deadline = new Date();
  isFinished = false;

  taskPriorities = [
    {
      label: 'Low',
      value: 1,
    },
    {
      label: 'Medium',
      value: 2,
    },
    {
      label: 'High',
      value: 3,
    },
  ];

  isUpdatedMode = false;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    if (this.config.data && this.config.data.task) {
      this.isUpdatedMode = true;

      this.id = this.config.data.task.id;
      this.name = this.config.data.task.name;
      this.description = this.config.data.task.description;
      this.deadline = new Date(this.config.data.task.deadline);
      this.taskPriority = this.config.data.task.priority;
      this.isFinished = this.config.data.task.isFinished ?? false;
    }
  }

  saveTask() {
    const newTask: NewTask = {
      name: this.name,
      description: this.description,
      priority: this.taskPriority,
      deadline: this.deadline,
      isFinished: this.isFinished,
    };

    this.ref.close(newTask);
  }

  updateTask() {
    const updatedTask: Task = {
      id: this.id,
      name: this.name,
      description: this.description,
      priority: this.taskPriority,
      deadline: this.deadline,
      isFinished: this.isFinished,
    };

    this.ref.close({
      task: updatedTask,
      isForDelete: false,
    });
  }

  deleteTask() {
    this.ref.close({
      task: this.config.data.task,
      isForDelete: true,
    });
  }
}
