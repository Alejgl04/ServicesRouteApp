import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from 'src/app/interfaces/dashboard.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient

  ) { }

  
  getDataDashboard()  {
    return this.http.get<Dashboard>( `${this.baseUrl}/dashboard` );
  }
}
