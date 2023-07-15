import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecoveyService } from '../../services/recovey.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {
  clicked: boolean = false;
  paramId: string  = "";
  loader: boolean = false;
  changeForm: FormGroup = this.formBuilder.group({

    password:['',[ Validators.required ]],
    confirmPassword:['',[ Validators.required, Validators.minLength(6) ]],

  }, {
    validators:[ this._recoveryService.confirmPassword( 'password', 'confirmPassword' )]
  });
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _recoveryService:RecoveyService
  )

  { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params:Params) => {
      this.paramId = params['id'];
    });
  }

  fieldNotValid( value:string): boolean {
		if ( this.changeForm.get( value )?.invalid && this.changeForm.touched ){
			return true;
		}
		else{
			return false;
		}
	}


  submitPassword(): void {

    if ( this.changeForm.invalid ) {
      this.changeForm.markAllAsTouched();
      return;
    }
    this.clicked = true;
    this.loader = true;
    this._recoveryService.changePassword( this.paramId, this.changeForm.value ).subscribe(
      resp => {
        this.loader = false;
        this.clicked = false;
        if( resp.ok == true ) {
          this.openSnackBar( resp.message );
          setTimeout(() =>{
            this.router.navigate(['/auth/login']);
          },1000);
        }
        else {
          this.openSnackBar( resp.message );
        }
      },
      error => {
        this.clicked = false;
        this.loader = false;
        this.openSnackBar(error.error.errors[0].msg);

      }
    )
  }
  openSnackBar( message: any ): void {
    this._snackBar.open( message, 'Aceptar',{
      duration:3000
    });
  }
}
