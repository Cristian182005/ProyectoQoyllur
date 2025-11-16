// src/app/modules/auth/pages/register/register.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../../../shared/models/users';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
})
export class Register {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const newUser: Users = {
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!
    };

    this.http
      .post<Users>('http://localhost:3002/users', newUser) // <-- SIN id
      .subscribe({
        next: () => {
          alert('Administrador registrado con éxito 😎');
          this.router.navigate(['/auth']);
        },
        error: () => {
          alert('Error al registrar usuario.');
        },
      });
  }
}
