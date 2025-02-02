import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe((users) => {
      if (users.length > 0) {
        const user = users[0];
        const localStorage = document.defaultView?.localStorage;
        if (localStorage) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        this.router.navigate([user.role === 'manager' ? '/manager' : '/staff']);
      } else {
        alert('Invalid credentials!');
      }
    });
  }
}
