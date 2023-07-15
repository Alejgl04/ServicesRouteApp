import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service, ServicesCreate } from 'src/app/interfaces/services.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetServicesService {
  private baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getServicesApp()  {
    return this.http.get<{services:Service[]}>( `${this.baseUrl}/services` );
  }

  getServiceById( id : string ) {
    return this.http.get<{services:Service}>(`${this.baseUrl}/services/${id }`);
  }

  updateService( id : string, services:Service ): Observable<Service> {
    return this.http.put<Service>(`${this.baseUrl}/services/${id}`, services);
  }

  newService(service: ServicesCreate ) {
    const url  = `${this.baseUrl}/services/`;
    return this.http.post<ServicesCreate>(url, service);
  }

  removeService( service: Service ) {
    const url  = `${this.baseUrl}/services/${service._id}`;
    return this.http.delete<Service>(url);
  }

}
