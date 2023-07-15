import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeCustomer } from 'src/app/interfaces/type-customer.interfaces';
import { TypeCustomerService } from 'src/app/protected/services/type-customer.service';
import { CustomersService } from 'src/app/protected/services/customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  loading:     boolean = false;
  messageSend: boolean = false;
  submittedErr:boolean = false;
  customerId?:     boolean;
  messageError:string  = '';
  customerForm!: FormGroup;
  typeNames: TypeCustomer[] = [];
  customerData!: any;


  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar,
    private typeCustomer: TypeCustomerService,
    private customer: CustomersService 
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.showForm();
  }

  showForm(){
    this.loading = false;
    this.typeCustomer.getTypeCustomer().subscribe(
      resp => {
        this.typeNames = resp.typeCustomer;
      }
    );
    this.customerForm = this.formBuilder.group({
      name:['', [ Validators.required ]],
      email:['', [ Validators.required, Validators.email]],
      phone:[undefined, [ Validators.required ]],
      address:['', [ Validators.required ]],
      customerType:['', [ Validators.required ]],
    });
  }

  fieldNotValid( value:string): boolean {
		if ( this.customerForm.get(value)?.invalid && this.customerForm.touched ){
			return true;
		}
		else{
			return false;
		}
	}

  get dataControls() {
    return this.customerForm.controls;
  }

  saveDataCustomer( value1: number ): void {

    const keys = Object.keys(this.customerForm.controls);
    let controlIndex = 0;
    Object.values(this.customerForm.controls).forEach((control) => {
      console.log(keys[controlIndex], control.value, control.status);
      controlIndex++;
    });
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      this.submittedErr = true;
      return;
    }
    else {
      this.messageSend = true;
      const { name, email, phone, address, customerType } = this.customerForm.value;
      this.customerData = { name, email, phone, address, customerType };
      this.customer.registerNewCustomer( this.customerData ).subscribe(
        resp => {
          if (resp.ok == true) {
            this.messageSend = false;
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
  openSnackBar( message: any ): void {
    this._snackBar.open( message, 'Aceptar', {
      duration: 6000
    } );
  }
}
