import { Component, OnInit } from '@angular/core';
import { TaxfilingService } from 'src/app/taxfiling.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent implements OnInit {

  date : any = '----- --,----';
  time : any = '00:00:00'
  constructor(private taxfilingservice: TaxfilingService) { 
    setInterval(() => {
      this.onCurrentDateTime();
    }, 1000);
  }

  ngOnInit() {
  }

  onCurrentDateTime() {
    let datetimevar = this.taxfilingservice.getDateTime(true);
    this.date = datetimevar["date"];
    this.time = datetimevar["time"];
  }

}
