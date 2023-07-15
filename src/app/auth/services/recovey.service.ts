import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { Message } from 'src/app/interfaces/messages.interfaces';
import { UserMessage } from 'src/app/interfaces/user.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoveyService {

  constructor(
    private http: HttpClient
  ) { }
  private baseUrl: string = environment.apiUrl;

  recoveryPassword( email:string ): Observable<Message> {
    const url = `${this.baseUrl}/mails/recovery`;
    return this.http.post<Message>(url, email);
  }

  changePassword( id : string, password: string ): Observable<UserMessage> {
    return this.http.put<UserMessage>(`${this.baseUrl}/mails/newpassword/${id}`, password);
  }

  confirmPassword( value1: string, value2: string ) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = formGroup.get(value1)?.value;
      const pass2 = formGroup.get(value2)?.value;

      if (pass1 !== pass2 ) {
        formGroup.get(value2)?.setErrors({ equal: true})
        return { equal: true}
      }
      return null;
    }
  }

}
