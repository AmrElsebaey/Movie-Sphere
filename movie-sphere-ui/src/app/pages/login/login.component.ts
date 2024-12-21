import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';
import { AuthenticationResponse } from '../../services/models/authentication-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.token) {
      this.router.navigate(['movies']);
    }
  }

  login() {
    this.errorMsg = [];
    if (!this.authRequest.email || !this.authRequest.password) {
      this.errorMsg.push('Please enter both email and password.');
      return;
    }
    if (this.authRequest.password.length < 8) {
      this.errorMsg.push('Password must be at least 8 characters.');
      return;
    }
    this.authService
      .authenticate({
        body: this.authRequest,
      })
      .subscribe({
        next: (res: AuthenticationResponse) => {
          this.tokenService.token = res.token as string;
          this.router.navigate(['movies']);
        },
        error: (err) => {
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg.push(err.error.error);
          }
        },
      });
  }

  register() {
    this.router.navigate(['register']);
  }
}
