import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './layout/footer/footer.component';
import { UsersComponent } from './pages/users/users.component';
import { ProtectedComponent } from './protected.component';
import { MaterialModule } from '../material/material.module';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeCustomerComponent } from './pages/type-customer/type-customer.component';
import { TypeCustomerTableComponent } from './components/type-customer-table/type-customer-table.component';
import { AddTypeComponent } from './pages/type-customer/add-type/add-type.component';
import { TypeCustomerDialogComponent } from './components/type-customer-dialog/type-customer-dialog.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { AddCustomerComponent } from './pages/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './pages/customers/edit-customer/edit-customer.component';
import { CustomersDialogComponent } from './components/customers-dialog/customers-dialog.component';
import { ServicesComponent } from './pages/services/services.component';
import { ServicesTableComponent } from './components/services-table/services-table.component';
import { AddServiceComponent } from './pages/services/add-service/add-service.component';
import { ServicesDialogComponent } from './components/services-dialog/services-dialog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileDeleteComponent } from './components/profile-delete/profile-delete.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    UsersComponent,
    ProtectedComponent,
    AddUserComponent,
    UserDialogComponent,
    UserTableComponent,
    TypeCustomerComponent,
    TypeCustomerTableComponent,
    AddTypeComponent,
    TypeCustomerDialogComponent,
    CustomersComponent,
    CustomersTableComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    CustomersDialogComponent,
    ServicesComponent,
    ServicesTableComponent,
    AddServiceComponent,
    ServicesDialogComponent,
    ProfileComponent,
    ProfileDeleteComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ProtectedModule { }
