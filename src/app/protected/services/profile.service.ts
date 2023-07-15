import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserMessage } from 'src/app/interfaces/user.interfaces'
import { User } from 'src/app/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(
    private http: HttpClient
  ) { }
    
  private baseUrl: string = environment.apiUrl;

  updateImageProfile( user : User, file: any ): Observable<UserMessage> {
     // Create form data
     const formData = new FormData(); 
        
     // Store form name as "file" with file data
     formData.append("file", file, file.name);
    return this.http.put<UserMessage>(`${this.baseUrl}/uploads/users/${user.uid}`, formData);
  }
}
