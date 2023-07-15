import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TypeCustomer } from 'src/app/interfaces/type-customer.interfaces';
import { TypeCustomerDialogComponent } from '../../components/type-customer-dialog/type-customer-dialog.component';
import { TypeCustomerService } from '../../services/type-customer.service';

@Component({
  selector: 'app-type-customer',
  templateUrl: './type-customer.component.html',
  styleUrls: ['./type-customer.component.scss']
})
export class TypeCustomerComponent implements OnInit {
  loading: boolean = false;
  message: string  = '';
  dataSource = new MatTableDataSource<TypeCustomer>([]);

  get user() {
    return this.authService.userAuth;
  }

  constructor(
    private typeCustomer:TypeCustomerService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
   this.getTypeCustomerData();
  }

  getTypeCustomerData(): void {
    this.loading = true;
    this.typeCustomer.getTypeCustomer().subscribe(
      (typeResponse) => {
        this.loading = false;
        this.dataSource.data = typeResponse.typeCustomer;  
      },
      error => {
        this.loading = false;
        this.openSnackBar('Ocurrio un error inesperado, intente nuevamente' + error);
        console.log( error );
      }
    )
  }

  deletedCustomer( typecustomer: TypeCustomer ): void {
    let errorResponse = [];
    this.message = "";
    const dialog = this.dialog.open(TypeCustomerDialogComponent, {
      width:'300px',
      data: typecustomer
    });
    dialog.afterClosed().subscribe(result => {
      if( result ) {
        this.loading = true;
        this.typeCustomer.removeTypeCustomer( typecustomer ).subscribe(
          resp => {
            this.getTypeCustomerData();
            this.openSnackBar( resp.message )
          },
          error => {
            if( error.status == 400 ) {
              this.loading = false;
              this.message = '';
              let errorResponse = error.error.errors;
              errorResponse.forEach((element:any) => {
                this.message += `${ element.msg } \n`;
              }); 
              this.openSnackBar( this.message );
            }
            else if( error.status == 401 ) {
              this.loading = false;
              this.openSnackBar( error.error.message );
            }
          }
        )
      }
    });
  }

  openSnackBar( message: any ): void {
    this._snackBar.open( message, 'Aceptar', {
      duration:4000
    });
  }
}
