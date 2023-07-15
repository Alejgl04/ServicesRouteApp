import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  loader!: boolean ;
  username?: string = "";
  messageError!: boolean;
  message: string = "";
  constructor(
    private _activatedroute:ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this._activatedroute.params.pipe(
      switchMap( ( { id } ) => this.authService.activeUsername( id ))
    ).subscribe( 
      resp => {
        this.loader = false;
        this.messageError = false;
        this.username = resp.username;
      },
      error => {
        this.loader = false;
        this.messageError = true;
        this.message = 'El parametro no es un id válido';
      }
    )
  }

}
