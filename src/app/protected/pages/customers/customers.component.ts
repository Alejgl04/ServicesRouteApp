import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Customer } from 'src/app/interfaces/customers.interfaces';
import { CustomersDialogComponent } from '../../components/customers-dialog/customers-dialog.component';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  loading: boolean = false;
  message: string  = '';
  dataSource = new MatTableDataSource<Customer>([]);

  get user() {
    return this.authService.userAuth;
  }

  constructor(
    private customerService:CustomersService,
    private _snackBar: MatSnackBar,
    private authService:AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCustomerData();
  }

  getCustomerData(): void {
    this.loading = true;
    this.customerService.getCustomers().subscribe(
      (customerResponse) => {
        this.loading = false;
        this.dataSource.data = customerResponse.customer;
      },
      error => {
        this.loading = false;
        this.openSnackBar('Ocurrio un error inesperado, intente nuevamente' + error);

      }
    );  
  }

  deletedCustomer( customer: Customer ): void {
    let errorResponse = [];
    this.message = "";
    const dialog = this.dialog.open(CustomersDialogComponent, {
      width:'300px',
      data: customer
    });
    dialog.afterClosed().subscribe(result => {
      if( result ) {
        this.loading = true;
        this.customerService.removeCustomer( customer ).subscribe(
          resp => {
            console.log(resp)
            this.getCustomerData();
            this.openSnackBar( resp.message )
          },
          error => {
            this.loading = false;
            if( error.status == 401 ){
              this.openSnackBar( '¡ No esta autorizado para eliminar un cliente !' );
            }
            else {
              this.openSnackBar( error.error.message );
            }
          }
        )
      }
    });
  }

  openSnackBar( message: any ): void {
    this._snackBar.open( message, 'Aceptar', {
      duration: 4000
    } );
  }

}
