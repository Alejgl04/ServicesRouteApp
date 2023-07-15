import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Service } from 'src/app/interfaces/services.interfaces';
import { ServicesDialogComponent } from '../../components/services-dialog/services-dialog.component';
import { GetServicesService } from '../../services/get-services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  loading: boolean = false;
  dataSource = new MatTableDataSource<Service>([]);
  messageError: string = "";

  get user() {
    return this.authService.userAuth;
  }
  
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private servicesApp:GetServicesService
  ) { }

  ngOnInit(): void {
    this.getServicesApp();
  }

  getServicesApp(): void {
    this.loading = true;
    this.servicesApp.getServicesApp().subscribe(
      (resp) => {
        this.loading = false;
        this.dataSource.data = resp.services;  
      },
      error => {
        this.loading = false;
        this.openSnackBar('Ocurrio un error inesperado, intente nuevamente' + error);
        console.log( error );
      }
    )
  }

  deleteService( service: Service ): void {
    const dialog = this.dialog.open( ServicesDialogComponent, {
      width: '300px',
      data: service
    });
    dialog.afterClosed().subscribe( result => {
      if( result ) {
        this.loading = true;
        this.servicesApp.removeService( service ).subscribe(
          resp => {
            if ( resp ) {
              this.getServicesApp();
              this.openSnackBar( resp.message );
            }
            else {
              console.log('error')
              this.openSnackBar( 'Ocurrio un error, intente nuevamente' )
            }
          },
          error => {
            console.log(error)
            if( error.status == 400 ) {
              this.loading = false;
              this.messageError = '';
              let errorResponse = error.error.errors;
              errorResponse.forEach((element:any) => {
                this.messageError += `${ element.msg } \n`;
              }); 
              this.openSnackBar( this.messageError );
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
