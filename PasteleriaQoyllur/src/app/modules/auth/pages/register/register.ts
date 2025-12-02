import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RolesService } from '../../../roles/services/roles-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: false
})
export class Register implements OnInit {

  roles: any[] = [];

  registerForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    roleId: new FormControl('', Validators.required)
  });

  constructor(
    private http: HttpClient,
    private roleService: RolesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleService.getAll().subscribe(r => this.roles = r);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const form = this.registerForm.value;

    // 1️⃣ Crear usuario
    this.http.post<any>('http://localhost:3002/users', {
      username: form.username,
      password: form.password
    })
    .subscribe({
      next: (userCreated) => {

        // 2️⃣ Crear empleado vinculado al usuario
        this.http.post('http://localhost:3002/employees', {
          fullName: form.fullName,
          roleId: form.roleId,
          userId: userCreated.id,
          active: true
        })
        .subscribe(() => {
          alert('Usuario registrado con éxito 😎');
          this.router.navigate(['/auth']);
        });
      },
      error: () => alert('Error registrando usuario')
    });
  }
}
