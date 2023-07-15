import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RecoveyService } from '../../services/recovey.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  loader: boolean = false;
  clicked: boolean = false;

  recoveryForm = this.formBuilder.group({

    email:['',[ Validators.required,Validators.email ]],

  });

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private recoveryService:RecoveyService
  ) { }

  ngOnInit(): void {
  }

  fieldNotValid( value:string): boolean {
		if ( this.recoveryForm.get( value )?.invalid && this.recoveryForm.touched ){
			return true;
		}
		else{
			return false;
		}
	}

  get dataControls() {
    return this.recoveryForm.controls;
  }

  submitEmail(): void {
    if ( this.recoveryForm.invalid ) {
      this.recoveryForm.markAllAsTouched();
      return;
    }
    this.loader = true;
    this.clicked = true;

    this.recoveryService.recoveryPassword( this.recoveryForm.value.email! ).subscribe(
      resp => {
        this.loader = false;
        this.clicked = false;
        if( resp.ok == true ) {
          this.openSnackBar( resp.message );
          this.recoveryForm.patchValue({'email':''});
        }
        else {
          this.openSnackBar( resp.message );
        }
      },
      error => {
        this.clicked = false;
        this.loader = false;
        this.openSnackBar(error.error.message);

      }
    )
  }
  openSnackBar( message: any ): void {
    this._snackBar.open( message, 'Aceptar' );
  }
}
