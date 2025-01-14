import { UserService } from './../Services/user.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResponsAPI } from '../SharedClass/respons-api';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BsDropdownModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  loggedIn: string | null = null;
  loginForm: FormGroup;
  responseAPI: ResponsAPI | null = null;
  _userService = inject(UserService);

  constructor(private formbuilder: FormBuilder) {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: [''],
    });
  }
  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('userName');
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      this._userService.LogIn(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => console.log(err),
      });

      console.log(this.loginForm.value);
    }
  }
  logOut() {
    this._userService.Logout();
  }
}
