import { Component, OnInit } from '@angular/core';
import { TaxfilingService } from 'src/app/taxfiling.service';

@Component({
  selector: 'app-taxfiling',
  templateUrl: './taxfiling.component.html',
  styleUrls: ['./taxfiling.component.css']
})
export class TaxfilingComponent implements OnInit {
  pdfSrc: any;
  birLink : any = [];

  constructor(private taxfilingservice: TaxfilingService) { }

  ngOnInit() {
    this.birLink = [
      {
        "name" : "BIR Form 0605", 
      "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/1210605.pdf"
    },
    {
      "name" : "BIR Form 0611-A", 
    "link" : "https://www.bir.gov.ph/images/bir_files/0611-A%20Oct%202014%20ENCS.pdf"
  },
  {
    "name" : "BIR Form 0613", 
  "link" : "https://www.bir.gov.ph/images/bir_files/old_files/zip/0613dec2004.pdf"
},
{
  "name" : "BIR Form 0619-E", 
"link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/1210605.pdf"
},
{
  "name" : "BIR Form 0619-F", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/0619-F%20Jan%202018%20rev%20final.pdf"
},
{
  "name" : "BIR Form 1600-VT", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1600-VT%20January%202018%20ENCS%20final.pdf"
},
{
  "name" : "BIR Form 1600-PT", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1600-PT%20January%202018%20ENCS%20final.pdf"
},
{
  "name" : "BIR Form 1600WP", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1600WP%20p1ENCS.pdf"
},
{
  "name" : "BIR Form 1601-C", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1601C%20final%20Jan%202018%20with%20DPA.pdf"
},
{
  "name" : "BIR Form 1601-EQ", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1601-EQ%20January%202019%20ENCS%20final.pdf"
},
{
  "name" : "BIR Form 1601-FQ", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1601-FQ%20final%20Jan%202018%20rev%20DPA.pdf"
},
{
  "name" : "BIR Form 1602Q", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1601C%20final%20Jan%202018%20with%20DPA.pdf"
},
{
  "name" : "BIR Form 1603Q", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1603Q%20Jan%202018%20final.pdf"
},
{
  "name" : "BIR Form 1604-C", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1604-C%20Jan%202018%20Final.pdf"
},
{
  "name" : "BIR Form 1604-F", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1604-F%20Jan%202018%20Final%202.pdf"
},
{
  "name" : "BIR Form 1604-E", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1604E%20Jan%202018%20ENCS%20Final2.pdf"
},
{
  "name" : "BIR Form 1606", 
"link" : "https://www.bir.gov.ph/images/bir_files/160699.pdf"
},
{
  "name" : "BIR Form 1621", 
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1621%20Jan%202019%20final.pdf"
},
    ]
  }

  loadFile = function(event) {
    let image = document.getElementById('output');
    let file = event.target.files[0];
    let filetype = file["type"];
    let fileName = file["name"]
    let rawName = fileName.split('.').slice(0, -1).join('.')
    let validFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    this.serviceWorker.onAttachedFileHandler(file, false);
    if(filetype == validFileTypes[0] || filetype == validFileTypes[1]) {
      image["src"] = URL.createObjectURL(event.target.files[0]);
  
      $('.main-tax-filing-buttons').css('display', 'none');
    }
    else if(filetype == validFileTypes[2]) {
      let reader = new FileReader();
    reader.onload = (e: any) => {
      this.pdfSrc = e.target.result;
    };
    reader.readAsArrayBuffer(file);
    $('.main-tax-filing-buttons').css('display', 'none');
    } else {
      console.log('Error input file. Please Try again');
    }
    let input = document.getElementsByClassName('uploadtaxform');
  };

}
