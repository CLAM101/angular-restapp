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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  signupForm = this.builder.group({
    storename: this.builder.control<string>('', Validators.required),
    storeaddress: this.builder.control<string>('', Validators.required),
    firstname: this.builder.control<string>('', Validators.required),
    lastname: this.builder.control<string>('', Validators.required),
    email: this.builder.control<string>('', Validators.required),
    phone: this.builder.control<string>('', Validators.required),
    floorsuite: this.builder.control<string>('', Validators.required),
  });

  restApply(): void {
    this.authService
      .restApply(
        this.signupForm.value.storename!,
        this.signupForm.value.storeaddress!,
        this.signupForm.value.firstname!,
        this.signupForm.value.lastname!,
        this.signupForm.value.email!,
        this.signupForm.value.phone!,
        this.signupForm.value.floorsuite!
      )
      .subscribe((response) => {
        console.log('apply response', response);
        this.signupForm.reset();
        alert('thank you for your details we will be in touch soon');
      });
  }

  ngOnInit(): void {}
}
