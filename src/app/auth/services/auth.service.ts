import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { Auth, UserMessage } from '../../interfaces/user.interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.apiUrl;
  private userLog!: User;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string | any;
  public redirectURL?: any

  get userAuth() {
    return { ...this.userLog };
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  login( user: { username?: string | null, password?: string | null } ): Observable<any> {
    const url  = `${this.baseUrl}/auth/login`;
    return this.http.post<Auth>(url, user)
    .pipe(
      tap( resp => {
        if( resp.ok ) {
          this.doLoginUser(resp.user, resp.token);
          let params = this.route.snapshot.queryParams;
          if( params['redirectURL'] ) {
            this.redirectURL = params['redirectURL'];
            if( this.redirectURL ){
              this.router.navigateByUrl(this.redirectURL,)
              .catch(() => this.router.navigate(['dashboard']))
            }
          }
          else{
            this.router.navigate(['/dashboard']);
          }

        }
      }),
      map( resp => resp.ok ),
      catchError( error => of( error.error.message ) )
    );
  }

  logout() {
    this.doLogoutUser();
    return true;
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }


  register( user?:User | any ): Observable<any> {
    const url  = `${this.baseUrl}/users/`;
    return this.http.post<Auth>(url, user).pipe(
      map( resp => resp.ok ),
      catchError( error => of( error ) )
    );
  }

  activeUsername( id: string ) {
    return this.http.put<UserMessage>(`${this.baseUrl}/users/active/${id}`, {status: true}).pipe(
      map( resp => resp.user ),
    );
  }

  refreshToken() {
    const url  = `${this.baseUrl}/auth/refresh`;
    const headers = new HttpHeaders().set('x-token', this.getRefreshToken() || '' );

    return this.http.post<Auth>(url, { headers } ).pipe(
      tap(( resp ) => {
      // const { name, email,username, image="", role, uid, status } = resp.user;
      this.doLoginUser(resp.user, resp.token);
      this.storeJwtToken(resp.token);
    }));
  }

  keepLogin(): Observable<boolean> {
    const url  = `${this.baseUrl}/auth/refresh`;
    const headers = new HttpHeaders().set('x-token', this.getJwtToken() );

    return this.http.get<Auth>( url, { headers } ).pipe(
      map( resp => {
        // const { name, email,username, image="", role, uid, status } = resp.user;
        this.doLoginUser(resp.user, resp.token);
        return resp.ok;
      }),
      catchError( err => of(false) )
    )
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN) || '' ;
  }

  private doLoginUser(user: User, tokens:any) {
    this.loggedUser = user.username;
    this.userLog = new User(user.name, user.email, user.username, user.image , user.role, user.uid, user.status);
    this.storeTokens(tokens);
  }

  private doLogoutUser(){
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens);
    localStorage.setItem(this.REFRESH_TOKEN, tokens);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

}
