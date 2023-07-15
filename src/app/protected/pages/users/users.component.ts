import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from 'src/app/models/user.model';
import { UserDialogComponent } from 'src/app/protected/components/user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit  {
  loading: boolean = false;
  message: string  = '';
  dataSource = new MatTableDataSource<User>([]);
  
  get user() {
    return this.authService.userAuth;
  }

  constructor(

    private authService: AuthService,
    private userService: UsersService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.getUsersData();
  }

  
  getUsersData(): void {
    this.loading = true;
    this.userService.getUsers().subscribe(
      (userResponse) => {
        this.loading = false;
        this.dataSource.data = userResponse.users;  
      },
      error => {
        this.loading = false;
        this.openSnackBar('Ocurrio un error inesperado, intente nuevamente' + error);
      }
    );  
  }

  editUser( user: User ): void {
    console.log(user);
    const dialog = this.dialog.open(UserDialogComponent, {
      width:'400px',
      data: {user, item: 1}
    });
    dialog.afterClosed().subscribe(result => {
      if( result ) {
        console.log(result)
      }
    });
  }

  deletedUser( user: User ): void {
    const dialog = this.dialog.open(UserDialogComponent, {
      width:'300px',
      data: user
    });
    dialog.afterClosed().subscribe(result => {
      if( result ) {
        this.loading = true;
        this.userService.removeUser( user ).subscribe(
          resp => {
            if ( resp ) {
              this.getUsersData();
              this.openSnackBar( resp.message )
            }
            else {
              this.getUsersData();
              this.openSnackBar( resp )
            }
          }
        )
      }
    });
  }
  
  openSnackBar( message: any ): void {
    this._snackBar.open( message, 'Aceptar', {
      duration: 3000
    } );
  }
}
