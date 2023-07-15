import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/interfaces/customers.interfaces';

@Component({
  selector: 'app-customers-dialog',
  templateUrl: './customers-dialog.component.html',
  styleUrls: ['./customers-dialog.component.scss']
})
export class CustomersDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CustomersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) { }

  ngOnInit(): void {
    
  }
  
  borrarPopup() {
    this.dialogRef.close( true );
  }
  ClosePopup() {
    this.dialogRef.close( false );
  }

}
