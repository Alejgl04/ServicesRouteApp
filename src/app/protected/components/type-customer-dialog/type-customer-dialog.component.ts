import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeCustomer } from 'src/app/interfaces/type-customer.interfaces';

@Component({
  selector: 'app-type-customer-dialog',
  templateUrl: './type-customer-dialog.component.html',
  styleUrls: ['./type-customer-dialog.component.scss']
})
export class TypeCustomerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TypeCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeCustomer
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
