import { Component, OnInit } from '@angular/core';
import { TaxfilingService } from 'src/app/taxfiling.service';

@Component({
  selector: 'app-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.css']
})
export class RightNavComponent implements OnInit {

  time : any = null;
  date: any = null;
  activeTab: string;
  increment = 0;
  fullnameAuth: any;

  bookkeepingModal = $('#bookkeeping-proceed');

  constructor(private taxfilingservice: TaxfilingService) { 
    // setInterval(() => {
    //   this.onCurrentDateTime();
    //   this.activeTab = this.taxfilingservice.getActiveTab(null, true);
    // }, 1000);
  }

  ngOnInit() {
    // this.getFullname();
  }

  // onCurrentDateTime() {
  //   let datetimevar = this.taxfilingservice.getDateTime(true);
  //   this.date = datetimevar["date"];
  //   this.time = datetimevar["time"];
  // }

  // onClickRightNavEvents(event){
  //   let target = event.target;
  //   let className = target.className;
  //   let data = null;

  //   switch(className) {
  //     case 'forms-modify-btn-btn add':
  //       if($('#tb-input-description').val() == '') {
  //         $('#tb-input-description').addClass('empty-field');
  //         return;
  //       }
  //       this.increment = this.increment + 1
  //       data = {
  //         'no' : this.increment,
  //         'journaltype' : $('#tb-input-selectjournal').val(),
  //         'date' : $('#tb-input-date').val(),
  //         'entrytype' : $('#tb-input-typeofentry').val(),
  //         'description' : $('#tb-input-description').val(),
  //         'debit' : parseFloat($('#tb-input-debit').val().toString()),
  //         'credit' : parseFloat($('#tb-input-credit').val().toString())
  //       }
  //       this.taxfilingservice.taxFilingData['BookKeepingData'].push(data);
  //       break;
  //       case "forms-modify-btn-btn remove":
  //         // let target = this.taxfilingservice.selected;
  //         // let arr = this.taxfilingservice.taxFilingData['BookKeepingData'];
  //         // let logNo = target.dataset['logNo'];
  //         // var filtered = arr.filter(function(el) { return el.no != logNo; }); 
  //         // this.taxfilingservice.taxFilingData['BookKeepingData'] = [];
  //         // this.taxfilingservice.taxFilingData['BookKeepingData'] = filtered;
  //         // target.remove();
  //         break;
  //         case "forms-modify-btn-btn reset":
  //           // this.taxfilingservice.taxFilingData['BookKeepingData'] = [];
  //           // this.resetFields();
  //           break;
  //           case "tax-filing-modify-btn-btn proceed":
  //             let container = $('.main-tax-filing-content');
  //             let file = this.taxfilingservice.attachedFile;
  //             let fileName = file["name"];
  //             this.taxfilingservice.onFileUploadAttachment(file, this.taxfilingservice.getSid());
  //             this.taxfilingservice.onFileUploadLog(this.taxfilingservice.getSid(), fileName, 'Registration File Attachment', this.taxfilingservice.getDateTime(false));
  //             break;
  //             case "forms-modify-btn-btn proceed":
  //               let btnControlSubmit = this.bookkeepingModal.find('.modal-control-btn')[0];
  //               let btnControlCancel = this.bookkeepingModal.find('.modal-control-btn')[1];
  //               let taxFilingservice = this.taxfilingservice;
  //               let fullname = this.fullnameAuth.fullName;
  //               btnControlSubmit.addEventListener("click", function() {
  //                 let username = taxFilingservice.getSid();
  //                 let pending = "Pending";
  //                 let businessname = $('#tb-input-businessname').val();
  //                 let period = $('#tb-input-period').val();
  //                 let data = JSON.stringify(taxFilingservice.taxFilingData.BookKeepingData);

  //                 taxFilingservice.onSubmitBookkeeping(username, fullname, "Added Bookkeeping Record", pending, businessname, period, data);

  //                 $('#tb-input-businessname').val('');
  //                 $('#tb-input-period').val('daily');
  //                 $('#tb-input-selectjournal').val(1);
  //                 $('#tb-input-selectjournal').val('purchase');
  //                 $('#tb-input-typeofentry').val('transaction');
  //                 $('#tb-input-description').val('');
  //                 $('#tb-input-debit').val('0.00');
  //                 $('#tb-input-credit').val('0.00');
              
  //                 var today = new Date();
  //                 $('#tb-input-date').val(today.toISOString().substr(0, 10));

  //                 $('#bookkeeping-proceed').css({ 'display' : 'none' });
  //               });

  //               btnControlCancel.addEventListener("click", function() {
  //                 $('#bookkeeping-proceed').css({ 'display' : 'none' });
  //               });
  //               this.bookkeepingModal.css({ 'display' : 'block' });
  //               break;
  //   }

  //   var debitval = 0, 
  //   creditval = 0,
  //   bookkeepingdata = this.taxfilingservice.taxFilingData['BookKeepingData'].map(function(data) { return data['credit'] }),
  //   bookkeepingdatadebit = this.taxfilingservice.taxFilingData['BookKeepingData'].map(function(data) { return data['debit'] });


  //   for(let i = 0; i <bookkeepingdata.length; i++){
  //     debitval = debitval + bookkeepingdatadebit[i];
  //     creditval = creditval + bookkeepingdata[i];
  //   }
  //   $('#tb-total-debit').val(debitval);
  //   $('#tb-total-credit').val(debitval);

  // }

  // public resetFields(){
  //   $('#tb-input-businessname').val('');
  //   $('#tb-input-period').val('daily');
  //   $('#tb-input-selectjournal').val(1);
  //   $('#tb-input-selectjournal').val('purchase');
  //   $('#tb-input-typeofentry').val('transaction');
  //   $('#tb-input-description').val('');
  //   $('#tb-input-debit').val('0.00');
  //   $('#tb-input-credit').val('0.00');

  //   var today = new Date();
  //   $('#tb-input-date').val(today.toISOString().substr(0, 10));

  //   // let datatbl = $('.trialbalance-table-td > div');
  //   // for(var i = 0; i < this.increment; i++){
  //   //   datatbl[i].remove();
  //   // }
  // }

  // getFullname(){
  //   let username = this.taxfilingservice.getSid();
  //   this.taxfilingservice.getAuth().subscribe(data => {
  //   let user = data.find(function(value){
  //     return value["username"] == username;
  //   });
  //   this.fullnameAuth = user;
  // });
  // }

}
