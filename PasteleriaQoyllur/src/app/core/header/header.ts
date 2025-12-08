import { Component } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: false,
})
export class Header {

  userName: string = 'Usuario';  // nombre por defecto
  loggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const session = this.auth.getSession();
    this.loggedIn = this.auth.isAuthenticated();

    if (this.loggedIn) {
      this.userName =
        session?.employee?.fullName ||
        session?.user?.username ||
        'Usuario';
    }
  }

  logout(): void {
    this.auth.logout();
    this.loggedIn = false;
    this.userName = 'Usuario';
    this.router.navigate(['/auth']);
  }

  goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
