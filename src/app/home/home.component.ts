import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userService = inject(UserService);
}
