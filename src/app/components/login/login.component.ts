import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  async googleAuth() {
    this.authService.googleAuth();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    this.authService.loginWithEmailPassword(this.email, this.password);
  }

  goToMain() {
    this.router.navigate(['/']);
  }
}
