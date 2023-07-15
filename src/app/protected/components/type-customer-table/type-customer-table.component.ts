import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TypeCustomer } from 'src/app/interfaces/type-customer.interfaces';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-type-customer-table',
  templateUrl: './type-customer-table.component.html',
  styleUrls: ['./type-customer-table.component.scss']
})
export class TypeCustomerTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['typename', 'description', 'action'];

  @Input() dataSource = new MatTableDataSource<TypeCustomer>([]);
  @Input() user!: User;
  @Output() customerEvent = new EventEmitter<TypeCustomer>();


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

  removeCustomer( typecustomer: TypeCustomer ) {
    this.customerEvent.emit( typecustomer );
  }

}
