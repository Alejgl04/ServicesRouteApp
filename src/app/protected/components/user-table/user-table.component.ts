import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'username', 'image', 'role', 'status', 'action'];

  @Input() dataSource = new MatTableDataSource<User>([]);
  @Output() userEvent = new EventEmitter<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros Por página';

  }

  removeUser( user: User) {
    this.userEvent.emit( user );
  }

  applySearch( event: Event ) {
    const userValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = userValue.trim().toLowerCase();
  }
}
