import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProfileDeleteComponent } from '../../components/profile-delete/profile-delete.component';
import { ProfileService } from '../../services/profile.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading:        boolean = true;
  loadingImage:   boolean = false;
  messageSend:    boolean = false;
  progressRemove: boolean = false;
  pictureBoolean: boolean = false;
  messageError: string = "";
  idUser:       string = "";
  pictureProfile: any;
  file?: File; 
  userImage!: User | any;
  profileForm!: FormGroup;
  
  get user() {
    return this.authService.userAuth;
  }

  constructor(
    private authService:AuthService,
    private profileService: ProfileService,
    private UserService: UsersService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _router: Router

  ) { }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.getUserImage();
    }, 500);
  }

  getUserImage(): void {
    this.UserService.getUserById( this.user.uid ).subscribe(
      resp => {
        this.loading   = false;
        this.userImage = resp.user;
        this.idUser    = resp.user.uid;
        this.profileForm = this.formBuilder.group({
          name: [this.userImage.name, [Validators.required]],
          email: [this.userImage.email, [Validators.required]],
        });
      }
    )
  }

  onselectFile( event: any): void {

    if ( event.target.files ) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = ( e:any ) => {
        this.loadingImage = true;
        this.pictureBoolean = true;
        this.pictureProfile = e.target.result;
        this.file = event.target.files[0];
        this.profileService.updateImageProfile( this.user , this.file ).subscribe(
          resp => {
           if ( resp.ok ) {
            this.loadingImage = false;
            this.openSnackBar( resp.message );
           }
          }
        )
      }
    }
  }

  get dataControls() {
    return this.profileForm.controls;
  }


  saveProfileData(): void {
    const keys = Object.keys(this.profileForm.controls);
    let controlIndex = 0;
    Object.values(this.profileForm.controls).forEach((control) => {
      console.log(keys[controlIndex], control.value, control.status);
      controlIndex++;
    });
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    else {
      this.messageSend = true;
      this.UserService.UpdateProfileUser(this.profileForm.value, this.idUser).subscribe(
        resp => {
          this.messageSend = false;
          if( resp.ok ) {
            this.openSnackBar( resp.message )
          }
        },
        error => {
          this.messageSend = false;
          this.messageError = '';
          if( error.status == 400 ) {
            this.loading = false;
            let errorResponse = error.error.errors;
            errorResponse.forEach((element:any) => {
              this.messageError += `${ element.msg } \n`;
            }); 
            this.openSnackBar( this.messageError );
          }
          else if( error.status == 404 ) {
            this.loading = false;
            this.openSnackBar( error.error.message );
          }   
        }
      )
    }
  }

  deleteAccount(): void {
    const dialog = this.dialog.open(ProfileDeleteComponent, {
      width:'350px',
      data:this.userImage
    });
    dialog.afterClosed().subscribe(result => {
      if( result ) {
        this.progressRemove = true;
        this.UserService.removeUserProfile( this.userImage ).subscribe(
          resp => {
            if ( resp ) {
              this.progressRemove = false;
              this._router.navigateByUrl('/auth/login');
              this.openSnackBar( resp.message )
            }
          },
          error => {
            this.progressRemove = false;
            if ( error.status == 401 ) {
              this.openSnackBar( 'Token no válido, intente nuevamente' );
            }
            else if (error.status == 400 ) {
              this.openSnackBar( error.error.errors[0].msg );
            }
          }
        )
      }
    });
  }
    
  openSnackBar( message: any ): void {
    this._snackBar.open( message, 'Aceptar', {
      duration: 5000
    } );
  }

}
