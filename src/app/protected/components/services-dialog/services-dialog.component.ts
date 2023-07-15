import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from 'src/app/interfaces/services.interfaces';

@Component({
  selector: 'app-services-dialog',
  templateUrl: './services-dialog.component.html',
  styleUrls: ['./services-dialog.component.scss']
})
export class ServicesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ServicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service
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
