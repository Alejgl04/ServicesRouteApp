import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GetServicesService } from 'src/app/protected/services/get-services.service';


@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  loading:     boolean = false;
  serviceId?:  boolean;
  messageSend: boolean = false;
  messageError: string = '';
  paramId: string = "";
  serviceForm!: FormGroup;
  
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _service:GetServicesService
  ) { }
  
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    this.loading = true;
    if (this.route.snapshot.url[1].path == 'edit') {
      this.serviceId = true;
      this.route.params
        .pipe(
          switchMap( ({ id }) => this._service.getServiceById( id ) )
        )
        .subscribe(
          resp => {
            const { name, programmable, description, _id} = resp.services;
            if (resp ) {
              console.log(resp.services)
              this.paramId   = _id;
              this.loading   = false;
              this.serviceForm = this.formBuilder.group({
                name: [ name, [Validators.required]],
                programmable: [programmable, [Validators.required]],
                description: [description],
              });
            }
          }
        );
    }
    else {
      this.loading   = false;
      this.serviceId = false;
      this.serviceForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        programmable: ['', [Validators.required]],
        description: [''],
      });
    }
  }
  get dataControls() {
    return this.serviceForm.controls;
  }

  saveService( value: number ): void {
    const keys = Object.keys(this.serviceForm.controls);
    let controlIndex = 0;
    Object.values(this.serviceForm.controls).forEach((control) => {
      console.log(keys[controlIndex], control.value, control.status);
      controlIndex++;
    });
    if ( value == 1 ) { //edit
      if ( this.serviceForm.invalid ) {
        this.serviceForm.markAllAsTouched();
        return;
      }
      else {
        console.log( this.serviceForm.value)
        this.messageSend = true;
        this._service.updateService( this.paramId, this.serviceForm.value ).subscribe(
          resp => {
            if ( resp ) {
              this.router.navigateByUrl('/services');
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
    else { // new service
      if (this.serviceForm.invalid) {
        this.serviceForm.markAllAsTouched();
        return;
      }
      this.messageSend = true;
      this._service.newService( this.serviceForm.value ).subscribe(
          newService => {
          if ( newService.ok ) {
            this.messageSend = false;
            this.serviceForm = this.formBuilder.group({
              name: ['', [Validators.required]],
              programmable: ['', [Validators.required]],
              description: [''],
            });
            this.openSnackBar( newService.message );
          }
        }, 
        error => {
          this.messageError = '';
          this.messageSend = false;
          let errorResponse = error.error.errors;
          errorResponse.forEach((element: any) => {
            this.messageError += `${element.msg} \n`;
          });
          this.openSnackBar( this.messageError );
        }       
      )
    }
  }
  openSnackBar(message: any): void {
    this._snackBar.open(message, 'Aceptar', { duration: 5000 });
  }
}
