import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authcontainer',
  templateUrl: './authcontainer.component.html',
  styleUrls: ['./authcontainer.component.scss'],
})
export class AuthcontainerComponent implements OnInit {
  constructor(private router: Router) {}

  checkItem() {
    console.log(localStorage.getItem('userinfo'));
  }

  ngOnInit(): void {
    this.router.navigate(['./budgetbites/login']);
  }
}
