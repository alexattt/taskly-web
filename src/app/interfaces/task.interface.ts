export interface Task {
  id?: number;
  name: string;
  description: string;
  priority: number;
  deadline: Date;
  isFinished: boolean;
  createdAt?: Date;
  userId?: string;
}

export interface NewTask {
  name: string;
  description: string;
  priority: number;
  deadline: Date;
  isFinished: boolean;
}
