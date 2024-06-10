import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

import { getError, validateEmail } from '../../utils/utils';
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

  googleAuth() {
    this.authService.googleAuth();
  }

  registerWithEmailPassword(event: Event) {
    event.preventDefault();

    if (this.email == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.warning('Fill all the fields');
      return;
    }

    if (validateEmail(this.email) === false) {
      this.toastr.error('Invalid email');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }

    if (this.password.length < 6) {
      this.toastr.warning('Password should be at least 6 characters');
      return;
    }

    this.authService
      .registerWithEmailPassword(this.email, this.password)
      .then(() => {
        this.toastr.success('Account created with success!!');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const _error = getError(error);

        if (_error === 'auth/email-already-in-use') {
          this.toastr.warning('The email is already in use.');
        } else {
          this.toastr.error('An error occurred. Please try again later.');
        }
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  goToMain() {
    this.router.navigate(['/']);
  }
}
