import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { TypeCustomerComponent } from './pages/type-customer/type-customer.component';
import { AddTypeComponent } from './pages/type-customer/add-type/add-type.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AddCustomerComponent } from './pages/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './pages/customers/edit-customer/edit-customer.component';
import { ServicesComponent } from './pages/services/services.component';
import { AddServiceComponent } from './pages/services/add-service/add-service.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';


const childRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ]},

  {path: 'users', component: UsersComponent, canActivate: [ AuthGuard ]},
  {path: 'users/add', component: AddUserComponent, canActivate: [ AuthGuard ]},
  {path: 'users/edit/:id', component: AddUserComponent, canActivate: [ AuthGuard ]},

  {path: 'type-customer', component: TypeCustomerComponent, canActivate: [ AuthGuard ]},
  {path: 'type-customer/add', component: AddTypeComponent, canActivate: [ AuthGuard ]},
  {path: 'type-customer/edit/:id', component: AddTypeComponent, canActivate: [ AuthGuard ]},

  {path: 'customers', component: CustomersComponent, canActivate: [ AuthGuard ]},
  {path: 'customers/add', component: AddCustomerComponent, canActivate: [ AuthGuard ]},
  {path: 'customers/edit/:id', component: EditCustomerComponent, canActivate: [ AuthGuard ]},

  {path: 'services', component: ServicesComponent, canActivate: [ AuthGuard ]},
  {path: 'services/add', component: AddServiceComponent, canActivate: [ AuthGuard ]},
  {path: 'services/edit/:id', component: AddServiceComponent, canActivate: [ AuthGuard ]},

  {path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ]},

  {
    path:'**',
    redirectTo: 'dashboard'
  }

]

@NgModule({
	imports: [ RouterModule.forChild( childRoutes ) ],
	exports: [ RouterModule ]
})
export class ChildrenRoutingModule { }
