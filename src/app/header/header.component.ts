import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Profile } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  profile!: Profile;

  logout(): void {
    this.authService.validate('/logout').subscribe((response) => {
      console.log('logout response', response);
      if (response.status === 200) {
        this.router.navigate(['/budgetbites']);
        alert(response.message);
      }
    });
  }

  getProfile() {
    this.authService.getProfile().subscribe((response) => {
      console.log('get profile response in ehader', response);
      this.profile = response;
    });
  }

  ngOnInit(): void {
    this.getProfile();
  }
}
