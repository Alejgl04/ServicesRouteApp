import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Menu } from 'src/app/interfaces/menu.interfaces';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styleUrls: ['./sidebard.component.scss']
})
export class SidebardComponent {

  constructor( 
    private router: Router,
    private authService: AuthService
  ){}

  get user() {
    return this.authService.userAuth;
  }

  logOut(): void {
    this.authService.logout();
    window.location.href="/auth/";
  }
  profile(): void {
    this.router.navigateByUrl('/profile');
  }

  menu: Menu[] = [
   
    { route: '/dashboard', text: 'Principal', icon: 'dashboard' },
    { route: '/type-customer', text: 'Tipo de clientes', icon: 'contact_mail' },
    { route: '/customers', text: 'Clientes', icon: 'supervisor_account' },
    { route: '/services', text: 'Servicios', icon: 'library_books' },
  ];
}
