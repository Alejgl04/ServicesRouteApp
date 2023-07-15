import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TypeCustomerService } from 'src/app/protected/services/type-customer.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {

  loading: boolean = false;
  messageSend: boolean = false;
  messageError: string = '';
  paramId: string = '';
  typeForm!: FormGroup;
  typeId?: boolean;

  constructor(
    private router: Router,
    private typeService: TypeCustomerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.loading = true;
    if (this.route.snapshot.url[1].path == 'edit') {
      this.typeId = true;
      this.route.params
        .pipe(
          switchMap( ({ id }) => this.typeService.getTypeById( id ) )
        )
        .subscribe(
          resp => {
            const { typename, _id, description } = resp.typeCustomer;
            if (resp ) {
              this.paramId = _id;
              this.loading = false;
              this.typeForm = this.formBuilder.group({
                typename: [typename, [Validators.required]],
                description: [description],
              });
            }
          }
        );
    }
    else {
      this.loading = false;
      this.typeId = false;
      this.typeForm = this.formBuilder.group({
        typename: ['', [Validators.required]],
        description: [''],
      });
    }
  }

  get dataControls() {
    return this.typeForm.controls;
  }

  saveTypeData(value: number): void {
    if (value == 1) { // edit type
      if (this.typeForm.invalid) {
        this.typeForm.markAllAsTouched();
        return;
      }
      else {
        this.messageSend = true;
        this.typeService.updateType( this.paramId, this.typeForm.value ).subscribe(
          resp => {
            if ( resp.ok == true) {
              this.router.navigateByUrl('/type-customer');
              this.openSnackBar( resp.message )
            }
          },
          error => {
            this.messageError = '';
            this.messageSend = false;
            this.messageError = error.error.message;
            this.openSnackBar( this.messageError );
          }
        );
      }
    }
    else { // new typename
      if (this.typeForm.invalid) {
        this.typeForm.markAllAsTouched();
        return;
      }
      else {
        this.messageSend = true;
        this.typeService.registerNewType(this.typeForm.value).subscribe(
          resp => {
            if (resp.ok == true) {
              console.log(resp)
              this.messageSend = false;
              this.typeForm = this.formBuilder.group({
                typename: ['', [Validators.required]],
                description: [''],
              });
              this.openSnackBar(resp.message);
            }
          },
          error => {
            this.messageError = '';
            this.messageSend = false;
            let errorResponse = error.error.errors;
            errorResponse.forEach((element: any) => {
              this.messageError += `${element.msg} \n`;
            });
            this.openSnackBar(this.messageError);
          }
        )
      }
    }
  }

  openSnackBar(message: any): void {
    this._snackBar.open(message, 'Aceptar', { duration: 3000 });
  }

}
