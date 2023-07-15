import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  durationInSeconds = 5;
  loader: boolean = false;
  clicked: boolean = false;
  message: string = '';
  registerForm = this.formBuilder.group({

    name:['',[ Validators.required ]],
    email:['',[ Validators.required, Validators.email ]],
    username:['',[ Validators.required ]],
    password:['',[ Validators.required]],
    status:[false],
    role:['USER_ROLE'],

  });
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
  ) { }

  fieldNotValid( value:string): boolean {
		if ( this.registerForm.get( value )?.invalid && this.registerForm.touched ){
			return true;
		}
		else{
			return false;
		}
	}

  sendRegister(): void {
    let errorResponse = [];
    this.message = "";
    if ( this.registerForm.invalid ) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.loader = true;
    this.clicked = true;
    this.authService.register( this.registerForm.value! ).subscribe(
      resp => {
        this.loader = false;
        if( resp == true ) {
          this.registerForm.reset();
          this.clicked = false;
          this.openSnackBar( 'Se ha completado el registro de manera exitosa, nuestros administradores activaran su cuenta ' );
        }
        else {
          this.clicked = false;
          this.loader = false;
          errorResponse = resp.error.errors;
          errorResponse.forEach((element:any) => {
            console.log(element);
            this.message += `${ element.msg } \n`;
          });
          this.openSnackBar( this.message );
        }
      },
      error => {
        this.clicked = false;
        this.loader = false;
        errorResponse = error.error.errors;
        errorResponse.forEach((element:any) => {
          this.message += `${ element.msg } `;
        });
        this.openSnackBar( this.message );
      }
    )
  }

  openSnackBar( message: string ): void {
    this._snackBar.open(message, 'Aceptar', {
      duration:4000
    });
  }
}
