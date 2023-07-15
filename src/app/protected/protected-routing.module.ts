import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedComponent } from './protected.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component:ProtectedComponent,
    canActivate:[AuthGuard],
		canLoad:[AuthGuard],
		loadChildren: () => import('./children-routing.module').then(m => m.ChildrenRoutingModule)	
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
