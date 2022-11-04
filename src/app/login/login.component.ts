import { Component, OnInit } from '@angular/core';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Res } from '../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private builder: FormBuilder
  ) {}

  loginForm = this.builder.group({
    username: this.builder.control<string>('', Validators.required),
    password: this.builder.control<string>('', Validators.required),
  });

  getValue() {
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.valid);
  }

  login(): void {
    this.authService
      .validate(
        '/login',
        this.loginForm.value.username!,
        this.loginForm.value.password!
      )
      .subscribe((response) => {
        console.log('login response', response);
        if (response.status === 200) {
          this.router.navigate(['/home']);
        }
      });
  }

  ngOnInit() {}
}
