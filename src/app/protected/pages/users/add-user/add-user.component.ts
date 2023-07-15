import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UsersService } from 'src/app/protected/services/users.service';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  loading:     boolean = false;
  messageSend: boolean = false;
  userId?:     boolean;
  messageError:string  = '';
  paramId:     string  = '';
  userForm!:   FormGroup;

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private userService: UsersService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.loading = true;
    if ( this.route.snapshot.url[1].path == 'edit' ) {
      this.userId = true;
      this.route.params
      .pipe(
        switchMap( ({ id }) => this.userService.getUserById( id ) )
      )
      .subscribe(
        resp => {
          if( resp.ok == true ) {
            this.paramId = resp.user.uid;
            this.loading = false;
            this.userForm = this.formBuilder.group({
              name:[resp.user.name, [ Validators.required ]],
              email:[resp.user.email, [ Validators.required, Validators.email]],
              username:[resp.user.username, [ Validators.required ]],
              role:[resp.user.role, [ Validators.required ]],
              status:[resp.user.status, [ Validators.required ]],
            })
          }
        }
      );
    }
    else {
      this.loading = false;
      this.userForm = this.formBuilder.group({
        name:['', [ Validators.required ]],
        email:['', [ Validators.required, Validators.email]],
        username:['', [ Validators.required ]],
        password:['', [ Validators.required ]],
        role:['', [ Validators.required ]],
        status:['', [ Validators.required ]],
      })
    }
  }

  get dataControls() {
    return this.userForm.controls;
  }

  saveDataUser( value: number ): void {
    if( value == 1 ) { // edit user
      if ( this.userForm.invalid ) {
        this.userForm.markAllAsTouched();
        return;
      }
      else {
        this.messageSend = true;
        this.userService.updateUser( this.paramId, this.userForm.value ).subscribe(
          resp => {
            if ( resp) {
              this.router.navigateByUrl('/users');
              this.openSnackBar( resp.message )
            }
          },
          error => {
            this.messageError = '';
            this.messageSend = false;
            let errorResponse = error.error.errors;
            errorResponse.forEach((element:any) => {
              this.messageError += `${ element.msg } \n`;
            }); 
            this.openSnackBar( this.messageError );
          }
        );
      }
    }
    else { // new user
      if ( this.userForm.invalid ) {
        this.userForm.markAllAsTouched();
        return;
      }
      else {
        this.messageSend = true;
        this.authService.register( this.userForm.value ).subscribe(
          resp => {
            if( resp == true ) {
              this.messageSend = false;
              this.userForm.reset();
              this.userForm.markAsUntouched();
              this.openSnackBar( 'Se ha completado el registro de este usuario' );
            }
          },
          error => {
            this.messageError = '';
            this.messageSend = false;
            let errorResponse = error.error.errors;
            errorResponse.forEach((element:any) => {
              this.messageError += `${ element.msg } \n`;
            }); 
            this.openSnackBar( this.messageError );
          }
        )
      }
    }
  }

  openSnackBar( message: any ): void {
    this._snackBar.open( message, 'Aceptar', {
      duration: 3000
    });
  }
}
