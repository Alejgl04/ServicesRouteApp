import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebardComponent } from './sidebard/sidebard.component';
import { RouterModule } from '@angular/router';
import { ImageUserPipe } from './pipes/image-user.pipe';
import { ProgrammablePipe } from './pipes/programmable.pipe';



@NgModule({
  declarations: [
    SidebardComponent,
    ImageUserPipe,
    ProgrammablePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  exports: [
    SidebardComponent,
    ImageUserPipe,
    ProgrammablePipe

  ]
})
export class SharedModule { }
