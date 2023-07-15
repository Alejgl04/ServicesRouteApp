import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor( 
    private router: Router,
    private authService: AuthService
  ){}

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/');
  }
}
