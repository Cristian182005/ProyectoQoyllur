// src/app/modules/auth/pages/login/login.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.isSubmitting = true;

    this.authService.login(username!, password!).subscribe({
      next: (ok) => {
        this.isSubmitting = false;

        if (ok) {
          alert('Bienvenido a QOYLLUR Pastelería 🍰');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Usuario no encontrado. Registre un nuevo administrador.');
          this.router.navigate(['/auth/register']);
        }
      },
      error: () => {
        this.isSubmitting = false;
        alert('Error al conectarse con el servidor.');
      },
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
