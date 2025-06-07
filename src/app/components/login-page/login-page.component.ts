import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginDTO } from 'src/app/interfaces/login-dto.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public messageService: MessageService
  ) {}

  login() {
    const loginDTO: LoginDTO = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(loginDTO).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error logging in',
          detail: 'Check your credentials',
        });
      },
    });
  }
}
