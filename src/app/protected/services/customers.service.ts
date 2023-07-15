import { HttpClient } from '@angular/common/http';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from 'src/app/interfaces/customers.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private http: HttpClient

  ) { }
  private baseUrl: string = environment.apiUrl;

  getCustomers() {
    return this.http.get<{customer:Customer[]}>( `${this.baseUrl}/customer` );
  }

  registerNewCustomer( customer: Customer ) {
    const url  = `${this.baseUrl}/customer/`;
    return this.http.post<Customer>(url, customer);
  }

  updateCustomer( id : string, customer:Customer ): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/customer/${id}`, customer);
  }

  getCustomerById( id : string ) {
    return this.http.get<{customer:Customer}>(`${this.baseUrl}/customer/${id }`);
  }

  removeCustomer( customer: Customer ): Observable<Customer> {
    return this.http.delete<Customer>(`${this.baseUrl}/customer/${customer._id}`);
  }
}
