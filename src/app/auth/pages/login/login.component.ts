import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  durationInSeconds = 5;
  loader: boolean = false;
  clicked: boolean = false;
  loginForm = this.formBuilder.group({

    username:['',[ Validators.required ]],
    password:['',[ Validators.required ]],

  });

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
  }

  fieldNotValid( value:string): boolean {
		if ( this.loginForm.get( value )?.invalid && this.loginForm.touched ){
			return true;
		}
		else{
			return false;
		}
	}


  sendLogin(): void {
    if ( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loader = true;
    this.clicked = true;
    this.authService.login( this.loginForm.value ).subscribe(
      resp => {
        if( resp==true ) {
          this.loader = false;
        }
        else {
          this.loader = false;
          this.clicked = false;
          this.openSnackBar( resp );
        }
      },
      error => {
        this.clicked = false;
        this.openSnackBar( error ); 
      }
    )
  }

  openSnackBar( message: string ): void {
    this._snackBar.open(message, 'Aceptar', {
      duration: 3000
    });
  }

}
