import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/interfaces/dashboard.interfaces';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  result!: Dashboard;
  constructor( 
    private dashService:DashboardService  
  ) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.showDataDashboard();
    }, 500);
  }

  showDataDashboard(): void {
    this.dashService.getDataDashboard().subscribe(
      dashboard => {
        this.result  = dashboard;
        this.loading = false;
      },
      error => {

      }
    )
  }
}
