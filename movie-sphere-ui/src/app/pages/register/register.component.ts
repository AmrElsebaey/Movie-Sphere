import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  errorMsg: { [key: string]: string } = {};
  passwordConfirm: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = {};

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (
      !this.registerRequest.firstName ||
      !this.registerRequest.lastName ||
      !this.registerRequest.email ||
      !this.registerRequest.password ||
      !this.passwordConfirm
    ) {
      if (!this.registerRequest.firstName)
        this.errorMsg['firstName'] = 'First name is required';
      if (!this.registerRequest.lastName)
        this.errorMsg['lastName'] = 'Last name is required';
      if (!this.registerRequest.email)
        this.errorMsg['email'] = 'Email is required';
      if (!this.registerRequest.password)
        this.errorMsg['password'] = 'Password is required';
      if (!this.passwordConfirm)
        this.errorMsg['passwordConfirm'] = 'Password confirmation is required';
      return;
    } else if (!emailPattern.test(this.registerRequest.email)) {
      this.errorMsg['email'] = 'Please enter a valid email address';
      return;
    } else if (this.registerRequest.password !== this.passwordConfirm) {
      this.errorMsg['passwordConfirm'] = 'Passwords do not match';
      return;
    } else if (this.registerRequest.password.length < 8) {
      this.errorMsg['password'] = 'Password must be at least 8 characters';
      return;
    }

    this.authService.register({ body: this.registerRequest }).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (err) => {
        if (err.error && err.error.error) {
          this.errorMsg['general'] = err.error.error;
        }
        if (err.error && err.error.validationErrors) {
          this.errorMsg['general'] = err.error.validationErrors.join(', ');
        }
        if (!this.errorMsg['general']) {
          this.errorMsg['general'] = 'An unknown error occurred.';
        }
      },
    });
  }
}
