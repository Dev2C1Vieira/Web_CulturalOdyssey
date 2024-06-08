import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

import { getError } from '../../utils/utils';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async googleAuth() {
    this.authService.googleAuth();
  }

  async registerWithEmailPassword(event: Event) {
    event.preventDefault();

    console.log(this.email, this.password, this.confirmPassword);
    try {
      if (this.password !== this.confirmPassword) {
        this.toastr.error('Passwords do not match');
        return;
      }

      await this.authService.registerWithEmailPassword(
        this.email,
        this.password
      );
      //this.router.navigate(['/login']);

      console.log('registered');
    } catch (error: any) {
      const _error = getError(error);

      if (_error === 'auth/email-already-in-use') {
        this.toastr.error('The email ');
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
