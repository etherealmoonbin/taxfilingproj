import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaxfilingService } from 'src/app/taxfiling.service';

@Component({
  selector: 'app-bookkeepingform',
  templateUrl: './bookkeepingform.component.html',
  styleUrls: ['./bookkeepingform.component.css']
})
export class BookkeepingformComponent implements OnInit {
  trialbalance: any = this.taxfilingservice.taxFilingData['BookKeepingData'];
  totalDebit: any = 0;
  totalCredit: any = 0;
  date: any;

  constructor(private taxfilingservice:TaxfilingService, private cdr: ChangeDetectorRef) { 

  }

  ngOnInit() {
    this.getCurrentDate();
  }

  getCurrentDate(){
    let datetimevar = this.taxfilingservice.getDateTime(true);
    this.date = datetimevar["date"];

    var today = new Date();
    $('#tb-input-date').val(today.toISOString().substr(0, 10));
  }

  getSelectedTableRow(event){
    let target = event.target;
    let td = document.getElementsByClassName('datalogVal');
    for(let i=0;i<td.length;i++){
      td[i].classList.remove('selected');
    }
    target.parentNode.classList.add('selected');
    let parentAttr = target.parentNode;
    this.taxfilingservice.selected = parentAttr;
  }

  public trackItem (index: number, item: any) {
    return item.trackId;
  }

}
