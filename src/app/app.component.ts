import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from '@aws-amplify/ui-angular';
import { AuthService } from './core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AmplifyAuthenticatorModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public authenticator: AuthenticatorService,
    private router: Router,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    this.checkAuthStatus();
    this.authenticator.subscribe(() => this.checkAuthStatus());
  }

  async checkAuthStatus() {
    const authStatus = await this.authenticator.authStatus;
    if (authStatus === 'authenticated') {
      await this.redirectBasedOnRole();
    } else {
      this.authService.clearCache();
    }
  }

  async redirectBasedOnRole() {
    try {
      const role = await this.authService.getCurrentUserRole();
      console.log('🚀 ~ AppComponent ~ redirectBasedOnRole ~ role:', role);

      if (role === 'admin' && !this.router.url.includes('/admin')) {
        await this.router.navigate(['/admin']);
      } else if (role === 'user' && !this.router.url.includes('/profile')) {
        await this.router.navigate(['/profile']);
      }
    } catch (error) {
      console.error('Error determining role:', error);
      await this.router.navigate(['/profile']);
    }
  }
}
