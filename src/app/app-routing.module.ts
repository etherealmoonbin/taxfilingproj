import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AccountpayableComponent } from './mainuserinterface/accountpayable/accountpayable.component';
import { BookkeepingComponent } from './mainuserinterface/bookkeeping/bookkeeping.component';
import { BookkeepingformComponent } from './mainuserinterface/bookkeepingform/bookkeepingform.component';
import { MainuserinterfaceComponent } from './mainuserinterface/mainuserinterface.component';
import { TaxfilingComponent } from './mainuserinterface/taxfiling/taxfiling.component';


const routes: Routes = [
  { 
    path: '',
     component: AuthenticationComponent 
    },
  { 
    path: 'dashboard', 
    component: MainuserinterfaceComponent 
  },
  { 
    path: 'bookkeeping', 
    component: BookkeepingComponent,
    children: [
      {
        path: 'accountpayable', 
        component: AccountpayableComponent 
      },
      {
        path: 'bookkeepingform', 
        component: BookkeepingformComponent 
      },
    ]
  },
  { 
    path: 'taxfiling', 
    component: TaxfilingComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
