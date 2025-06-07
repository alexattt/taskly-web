import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskAddEditFormComponent } from './components/task-add-edit-form/task-add-edit-form.component';
import { AuthGuard } from './guards/AuthGuard';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: 'log-in', component: LoginPageComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
