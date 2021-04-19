import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MainuserinterfaceComponent } from './mainuserinterface/mainuserinterface.component';
import { HttpClientModule } from '@angular/common/http';
import { LeftNavComponent } from './mainuserinterface/left-nav/left-nav.component';
import { RightNavComponent } from './mainuserinterface/right-nav/right-nav.component';
import { BookkeepingComponent } from './mainuserinterface/bookkeeping/bookkeeping.component';
import { BookkeepingformComponent } from './mainuserinterface/bookkeepingform/bookkeepingform.component';
import { AccountpayableComponent } from './mainuserinterface/accountpayable/accountpayable.component';
import { TaxfilingComponent } from './mainuserinterface/taxfiling/taxfiling.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BottomNavComponent } from './mainuserinterface/bottom-nav/bottom-nav.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TaxfilingService } from './taxfiling.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    MainuserinterfaceComponent,
    LeftNavComponent,
    RightNavComponent,
    BookkeepingComponent,
    BookkeepingformComponent,
    AccountpayableComponent,
    TaxfilingComponent,
    BottomNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PdfViewerModule,
    FormsModule,
    FontAwesomeModule,
    AutocompleteLibModule
  ],
  providers: [TaxfilingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
