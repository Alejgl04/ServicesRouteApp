import { Component, Input, AfterViewInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/interfaces/customers.interfaces';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'type', 'status', 'action'];
  @Input() dataSource = new MatTableDataSource<Customer>([]);
  @Input() user!: User;

  @Output() customerEvent = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros Por página';

  }


  applySearch( event: Event ) {
    const userValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = userValue.trim().toLowerCase();
  }

  removeCustomer( customer: Customer ) {
    this.customerEvent.emit( customer );
  }

}
