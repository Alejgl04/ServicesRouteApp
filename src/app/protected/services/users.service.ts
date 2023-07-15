import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserMessage } from '../../interfaces/user.interfaces';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  constructor(
    private http: HttpClient
  ) { }
    
  private baseUrl: string = environment.apiUrl;
  
  getUsers() {
    return this.http.get<{users:User[]}>( `${this.baseUrl}/users` );
  }

  getUserById( id : string | any ): Observable<UserMessage> {
    return this.http.get<UserMessage>(`${this.baseUrl}/users/${id }`);
  }

  updateUser( id : string, user:User ): Observable<UserMessage> {
    return this.http.put<UserMessage>(`${this.baseUrl}/users/${id}`, user);
  }
  
  UpdateProfileUser( user: User, id: string ): Observable<UserMessage> {
    return this.http.put<UserMessage>(`${this.baseUrl}/users/profile/${id}`, user);
  }
  
  removeUser( user: User ): Observable<UserMessage> {
    return this.http.delete<UserMessage>(`${this.baseUrl}/users/${user.uid}`).pipe(
      map( resp => resp.ok ),
      catchError( error => of( error.error.errors[0].msg ) )
    );
  }

  removeUserProfile( user: User ): Observable<UserMessage> {
    return this.http.delete<UserMessage>(`${this.baseUrl}/users/profile/remove/${user.uid}`);
  }
}
