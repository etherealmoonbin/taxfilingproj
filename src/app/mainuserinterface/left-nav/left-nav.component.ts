import { Component, OnInit } from '@angular/core';
import { TaxfilingService } from 'src/app/taxfiling.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  inDashboard : boolean = true;
  inFormPage : boolean = false;
  inTaxFiling : boolean = false;
  inTransaction : boolean = false;
  inSetting : boolean = false;
  inHelp : boolean = false;
  clientAuthorize : any = null;
  activeTabNav : string = 'dashboard';

  nameInitial : any = "..";

  constructor(private taxfilingservice: TaxfilingService) { }

  ngOnInit() {
    this.AuthClientCheck();
  }

  dashboardChecker(e) {
    let target = e.target as HTMLDivElement;
      switch(target.classList[1]) {
        case 'dashboard':
          this.taxfilingservice.getActiveTab('dashboard', false);
        break;
        case 'bookkeeping':
          this.taxfilingservice.getActiveTab('bookkeeping', false);
        break;
        case 'taxfiling':
          this.taxfilingservice.getActiveTab('taxfiling', false);
        break;
        case 'logout':
          this.taxfilingservice.deleteCookie('sidClient');
          this.taxfilingservice.deleteCookie('tkiClient');
        break;
      }
  }

  AuthClientCheck() {
    if(this.clientAuthorize == undefined || this.clientAuthorize == null) {
        let sid = this.taxfilingservice.getSid();
        this.taxfilingservice.getAuth().subscribe(data => {
          let user = data.find(function(value){
            return value["username"] == sid;
          });

          let fullName = user['fullName'];
          let initial = fullName.charAt(0).toUpperCase();
          this.nameInitial = initial;
          this.clientAuthorize = user;
        });
    } else {
      this.clientAuthorize = this.taxfilingservice.clientAuthorize;
    }
  }

}
