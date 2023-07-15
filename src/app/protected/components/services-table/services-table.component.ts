import { Component, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/interfaces/services.interfaces';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss']
})
export class ServicesTableComponent implements AfterViewInit  {
  displayedColumns: string[] = ['name', 'programmable', 'description', 'action'];

  @Input() dataSource = new MatTableDataSource<Service>([]);
  @Input() user!: User
  @Output() serviceEvent = new EventEmitter<Service>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros Por página';

  }

  applySearch( event: Event ) {
    const typeValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = typeValue.trim().toLowerCase();
  }

  removeService( service: Service) {
    this.serviceEvent.emit( service );
  }
}
