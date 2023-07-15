import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeCustomer, TypeMessage } from 'src/app/interfaces/type-customer.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeCustomerService {

  constructor(
    private http: HttpClient
  ) { }
    
  private baseUrl: string = environment.apiUrl;
  
  getTypeCustomer()  {
    return this.http.get<{typeCustomer:TypeCustomer[]}>( `${this.baseUrl}/typecustomer` );
  }

  getTypeById( id : string ) {
    return this.http.get<{typeCustomer:TypeCustomer}>(`${this.baseUrl}/typecustomer/${id }`);
  }
  
  registerNewType( typeData: TypeCustomer ) {
    const url  = `${this.baseUrl}/typecustomer/`;
    return this.http.post<TypeCustomer>(url, typeData);
  }

  updateType( id : string, typeCustomer:TypeCustomer ): Observable<TypeMessage> {
    return this.http.put<TypeMessage>(`${this.baseUrl}/typecustomer/${id}`, typeCustomer);
  }

  removeTypeCustomer( type: TypeCustomer ): Observable<TypeMessage> {
    return this.http.delete<TypeMessage>(`${this.baseUrl}/typecustomer/${type._id}`);
  }
}
