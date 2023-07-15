import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TypeCustomerService } from 'src/app/protected/services/type-customer.service';
import { TypeCustomer } from 'src/app/interfaces/type-customer.interfaces';
import { CustomersService } from 'src/app/protected/services/customers.service';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  loading:     boolean = false;
  messageSend: boolean = false;
  submittedErr:boolean = false;

  messageError:string  = '';
  customerId: string   = '';
  customerForm!: FormGroup;
  typeNames: TypeCustomer[] = [];
  customerData!: any;

  constructor(
		private _activatedroute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private typeCustomer: TypeCustomerService,
    private customer: CustomersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this._activatedroute.params
    .pipe(
      switchMap( ({ id }) => this.customer.getCustomerById( id ) )
    )
    .subscribe(
      resp => {
        this.loadTypeData();
        this.customerId = resp.customer._id;
        this.loading = false;
        const { name, email, address, status } = resp.customer;
        const phone = resp.customer.phone;
        const customerType = resp.customer.customerType._id;
        this.customerForm = this.formBuilder.group({
          name:[name, [ Validators.required ]],
          email:[email, [ Validators.required, Validators.email]],
          phone:[phone, [ Validators.required ]],
          address:[address, [ Validators.required ]],
          customerType:[customerType, [ Validators.required ]],
          status:[status, [ Validators.required ]],
        });
      }
    );   
  }

  loadTypeData() {
    this.typeCustomer.getTypeCustomer().subscribe(
      resp => {
        this.typeNames = resp.typeCustomer;
      }
    );
  }

  get dataControls() {
    return this.customerForm.controls;
  }

  fieldNotValid( value:string): boolean {
		if ( this.customerForm.get(value)?.invalid && this.customerForm.touched ){
			return true;
		}
		else{
			return false;
		}
	}

  saveDataCustomer(): void {

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
      const { name, email, phone, address, customerType, status } = this.customerForm.value;
      this.customerData = { name, email, phone, address, customerType, status };
      this.customer.updateCustomer( this.customerId, this.customerData ).subscribe(
        resp => {
          if (resp.ok) {
            this.messageSend = false;
            this.router.navigateByUrl('/customers');
            this.openSnackBar(resp.message);
          }
        },
        error => {
          this.messageSend = false;
          this.openSnackBar(error.error.message);
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
