import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import * as Rx from "rxjs/Rx";
import { Adba } from './adbaservicemodels';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TaxfilingService {

  myAppUrl: string;
loginApiUrl: string;
logApiUrl: string;
logattacmentUrl: string;
logFileAttachmentUrl: string;
logSubmitBookkeeping: string;
requestOptions : {};
requestOptCloudinary:{};

clientAuthorize : any;

onGetStarted : any;

public data: any;

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/jsonl charset=utf-8'
  })
}

isConsented = false;
inUsernameVal = null;
activeTab = 'dashboard';
authUser : any = null;
trialBalanceData : string[] = [];
selected : any = null;
taxFilingData :any = {
  'BookKeepingData' : [],
  'BookKeepingDebit' : null,
  'BookKeepingCredit' : null,
};

taxFilingStatusSucess : any;

attachedFile : any;
  logTaxPayerProfileUrl: string;
  testurl: string;
  logTaxFilingData: string;

  constructor(private http: HttpClient) { 
    // this.myAppUrl = 'https://taxfilingapi.azurewebsites.net/'; // prod
    this.myAppUrl = 'https://localhost:44314/'; //dev
    this.testurl = 'http://192.168.100.91:8001/'; // test
    
    this.loginApiUrl = 'api/webClientXSoaps';
    this.logApiUrl = 'api/clientauthlogs';

    this.logattacmentUrl = 'api/clientAttachments';
    this.logFileAttachmentUrl = 'api/userattachmentdatas';
    
    this.logSubmitBookkeeping = 'api/BookkeepingDataRecords';

    this.logTaxPayerProfileUrl = 'api/webTaxPayerProfileXSoaps';
    this.logTaxFilingData = 'api/webTaxFilingsXSoaps';
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getLog(){
    // Get Data
    return this.http.get<Adba[]>(this.myAppUrl + this.logApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
 
  getAuth(){
    // Get Data
    return this.http.get<Adba[]>(this.myAppUrl + this.loginApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  getTaxFilingRecords(){
    // Get Data
    return this.http.get<Adba[]>(this.myAppUrl + this.logTaxFilingData)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  addAuth(username, token, email, fullname, maritalstatus, birthdate, rdo, citizenship) {
    //Add Data
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ 
    "username": username,
    "key": token,
    "email": email,
    "fullName": fullname,
    "civilStatus": maritalstatus,
    "birthDate": birthdate,
    "rdo": rdo,
    "citizenship": citizenship
    });

    this.requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(this.myAppUrl + this.loginApiUrl, this.requestOptions)
  .then(response => response.text())
  .then(result => '')
  .catch(error => console.log('error', error));
  }

  addTaxPayerProfile(username, TaxPayerType, TINID, TaxpayerName, RDOCode, TaxpayerAddress, Zipcode, ContactNumber, Email) {
    //Add Data
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ 
      "Username" : username,
      "TaxPayerType" : TaxPayerType,
      "TINID" : TINID,
      "TaxpayerName" : TaxpayerName,
      "RDOCode" : RDOCode,
      "TaxpayerAddress" : TaxpayerAddress,
      "Zipcode" : Zipcode,
      "ContactNumber" : ContactNumber,
      "Email" : Email
    });

    this.requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(this.myAppUrl + this.logTaxPayerProfileUrl, this.requestOptions)
  .then(response => response.text())
  .then(result => this.SuccessSubmit())
  .catch(error => this.FailSubmit(error));
  }

  SuccessSubmit(){
    $('.main-tax-filing-container.onGetStartedTaxPayerForm').css('display', 'none');
    $('.main-tax-filing-container.TaxFilingForms').css('display', 'none');
    $('.main-tax-filing-container.successNextPageTrigger').css('display', 'flex');
  }

  FailSubmit(err){
    console.log(err);
  }

  getTaxPayerProfile(){
    // Get Data
    return this.http.get<Adba[]>(this.myAppUrl + this.logTaxPayerProfileUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  public deleteCookie(name) {
      this.setCookie(name, '', -1);
  }

    /**
     * set cookie
     * @param {string} name
     * @param {string} value
     * @param {number} expireDays
     * @param {string} path
     */
     public setCookie(name: string, value: string, expireDays: number, path: string = '') {
      const d: Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      const cpath = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cpath}; SameSite=Lax`;
  }

  public getCookie(name: string) {
    const ca: Array<string> = decodeURIComponent(document.cookie).split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i  = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) === 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
  }

  getSid(){
    let sid = this.getCookie('sidClient');
    return sid;
  }

  getAccountName() {
    let sid = this.getSid();
    // let userValues = this.dbaservice.getIDAuth(parseInt(sid)).subscribe(data => {
    //   let username = data['username'];
    //   this.inUsernameVal = username;
    // });
  }

  getDateTime(isArray) {
    let val = {};
    let dt = new Date(),
        date = dt.getDate(),
        year = dt.getFullYear(),
        month = dt.getMonth(),
    
        hour = (dt.getHours()<10?'0':'') + dt.getHours(),
        minute = (dt.getMinutes()<10?'0':'') + dt.getMinutes(),
        second = (dt.getSeconds()<10?'0':'') + dt.getSeconds(),

        monthVal = [
      'January', 'February', 'March','April','May','June','July','August', 'September', 'October', 'November', 'December'
    ]
    if(isArray) {
      return val = {
        "date": monthVal[month] + ' ' + date + ', ' + year,
        "time": hour + ':' + minute + ':' + second
      }
    }
    else {
      return monthVal[month] + ' ' + date + ', ' + year + ' ' + hour + ':' + minute + ':' + second;
    }
  }

  getActiveTab(tabname, isGet) {
    if(isGet) {
      return this.activeTab;
    } else {
      this.activeTab = tabname;
    }
  }

  onAttachedFileHandler(file, get) {
    this.attachedFile = file;

    if(get) {
      return this.attachedFile;
    }
  }

  addLog(time, logValue, userID) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ 
      "time":time,
      "logValue": logValue,
      "userID":userID 
    });

    this.requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(this.myAppUrl + this.logApiUrl, this.requestOptions)
  .then(response => response.text())
  .then(result => '')
  .catch(error => console.log('error', error));
  }

  onFileUploadAttachment(file, username) {
    var url = `https://api.cloudinary.com/v1_1/taxfilingsys/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    fd.append('upload_preset', 'rl2nvrc9');
    fd.append('tags', username); //group uploads by username
    fd.append('file', file);
    xhr.send(fd);
  }

  onFileUploadLog(username, filename, filedetails, uploaddate) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ 
      "username" : username,
      "filename" : filename,
      "filedetails" : filedetails,
      "fileDateUploaded" : uploaddate,
    });

    this.requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(this.myAppUrl + this.logFileAttachmentUrl, this.requestOptions)
    .then(response => response.text())
    .then(result => '')
    .catch(error => console.log('error', error));
  }

  onFileRetrieveAttachment(username) {
    this.requestOptCloudinary = {
      method: 'GET',
      redirect: 'follow',
      'API_KEY': '386585979266436',
      'API_SECRET' : 'j4kNlSvPBRnymoz8Z6wkNcMlSQw'
    };

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa('386585979266436:j4kNlSvPBRnymoz8Z6wkNcMlSQw'));
    
    this.requestOptCloudinary = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://api.cloudinary.com/v1_1/taxfilingsys/resources/search", this.requestOptCloudinary)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  onSubmitBookkeeping(username, fullname, businessname, Record) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ 
      "username":username,
      "fullname": fullname,
      "businessname":businessname,
      "Record" : Record
    });

    this.requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(this.myAppUrl + this.logSubmitBookkeeping, this.requestOptions)
  .then(response => response.text())
  .then(result => '')
  .catch(error => console.log('error', error));
  }

  onSubmitTaxFiling(username, taxpayerprofile1, taxpayerprofile2, taxpayerprofile3, taxpayerprofile4, taxpayerprofile5, BIRFormNo, returnPeriod, Values, TaxFilingReferenceNumber, status) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ 
      "username":username,
      "taxpayerprofile1": taxpayerprofile1,
      "taxpayerprofile2": taxpayerprofile2,
      "taxpayerprofile3": taxpayerprofile3,
      "taxpayerprofile4": taxpayerprofile4,
      "taxpayerprofile5": taxpayerprofile5,
      "BIRFormNo": BIRFormNo,
      "returnPeriod": returnPeriod,
      "AssignedID": null,
      "Values":Values,
      "Status": status,
      "TXFRID" : TaxFilingReferenceNumber
    });

    this.requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(this.myAppUrl + this.logTaxFilingData, this.requestOptions)
  .then(response => response.text())
  .then(result => this.catchDataRequest(TaxFilingReferenceNumber))
  .catch(error => this.catchDataRequest(0));
  }

  catchDataRequest(data) {
    setTimeout(()=> {
      $('#global-notification').removeClass('hide').addClass('show');
      $('.notification-content').text(data !== 0 ? 'Tax Filing Successful' : 'Tax Filing Failed');
      $('.notification-refrenceval').text(data);
    },1000);
    setTimeout(()=> {
      $('#global-notification').removeClass('show').addClass('hide');
    }, 5000);
  }

  COA = [
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Cash And Financial Assets'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Cash and Cash Equivalents'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Financial Assets (Investments)'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Restricted Cash and Financial Assets'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Additional Financial Assets and Investments'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Receivables And Contracts'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Accounts, Notes And Loans Receivable'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Contracts'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Nontrade And Other Receivables'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Inventory'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Merchandise'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Raw Material, Parts And Supplies'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Work In Process'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Finished Goods'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Other Inventory'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Accruals And Additional Assets'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Prepaid Expense'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Accrued Income'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Additional Assets'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Property, Plant And Equipment'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Land And Land Improvements'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Buildings, Structures And Improvements'
    },

    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Machinery And Equipment'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Furniture And Fixtures'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Other Property, Plant And Equipment'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Construction In Progress'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'CR',
      'Name' : 'Property, Plant And Equipment Accumulated Depreciation And Depletion'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'CR',
      'Name' : 'Accumulated Depletion'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'CR',
      'Name' : 'Accumulated Depreciation'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Intangible Assets (Excluding Goodwill)'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Intellectual Property'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Computer Software'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Trade And Distribution Assets'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Contracts And Rights'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Right To Use Assets (Classified By Type)'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Other Intangible Assets'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Acquisition In Progress'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'CR',
      'Name' : 'Intangible Assets Accumulated Amortization'
    },
    {
      'Type' : 'Asset',
      'drcr' : 'DR',
      'Name' : 'Goodwil'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Account Payables'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Payables'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Trade Payables'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Dividends Payable'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Interest Payable'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Other Payables'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Accruals And Other Liabilities'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Accrued Expenses (Including Payroll)'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Deferred Income (Unearned Revenue)'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Accrued Taxes (Other Than Payroll)'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Other (Non-Financial) Liabilities'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Financial Labilities'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Notes Payable'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Loans Payable'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Bonds (Debentures)'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Other Debts And Borrowings'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Lease Obligations'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Derivative Financial Liabilities'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Other Financial Liabilities'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Provisions (Contingencies)'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Customer Related Provisions'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Ligation And Regulatory Provisions'
    },
    {
      'Type' : 'Liabilities',
      'drcr' : 'CR',
      'Name' : 'Other Provisions'
    },
    {
      'Type' : 'Equity',
      'drcr' : 'CR',
      'Name' : 'Owners Equity (Attributable To Owners Of Parent)'
    },
    {
      'Type' : 'Equity',
      'drcr' : 'CR',
      'Name' : 'Equity At par (Issued Capital)'
    },
    {
      'Type' : 'Equity',
      'drcr' : 'CR',
      'Name' : 'Additional Paid-in Capital'
    },
    {
      'Type' : 'Equity',
      'drcr' : 'DR|CR',
      'Name' : 'Retained Earnings'
    },
    {
      'Type' : 'Equity',
      'drcr' : 'CR',
      'Name' : 'Appropriated '
    },
    {
      'Type' : 'Equity',
      'drcr' : 'CR',
      'Name' : 'Unappropriated '
    },
    {
      'Type' : 'Equity',
      'drcr' : 'DR',
      'Name' : 'Deficit  '
    },
    {
      'Type' : 'Equity',
      'drcr' : 'DR|CR',
      'Name' : 'Accumulated OCI (US GAAP) '
    },
    {
      'Type' : 'Equity',
      'drcr' : 'DR|CR',
      'Name' : 'Other Reserves (IFRS)  '
    },
    {
      'Type' : 'Equity',
      'drcr' : 'DR|CR',
      'Name' : 'Other Equity Items '
    },
    {
      'Type' : 'Equity',
      'drcr' : 'DR|CR',
      'Name' : 'ESOP Related Items '
    },
    {
      'Type' : 'Equity',
      'drcr' : 'DR',
      'Name' : 'Subscribed Stock Receivables  '
    },
    {
      'Type' : 'Equity',
      'drcr' : 'DR',
      'Name' : 'Treasury Stock (Not Extinguished) '
    },
    {
      'Type' : 'Equity',
      'drcr' : 'CR',
      'Name' : 'Miscellaneous Equity '
    },
    {
      'Type' : 'Equity',
      'drcr' : 'CR',
      'Name' : 'Noncontrolling (Minority) Interest '
    },
    {
      'Type' : 'Revenue',
      'drcr' : 'CR',
      'Name' : 'Recognized Point Of Time'
    },
    {
      'Type' : 'Revenue',
      'drcr' : 'CR',
      'Name' : 'Goods'
    },
    {
      'Type' : 'Revenue',
      'drcr' : 'CR',
      'Name' : 'Services'
    },
    {
      'Type' : 'Revenue',
      'drcr' : 'CR',
      'Name' : 'Recognized Over Time'
    },
    {
      'Type' : 'Revenue',
      'drcr' : 'CR',
      'Name' : 'Products'
    },
    {
      'Type' : 'Revenue',
      'drcr' : 'DR',
      'Name' : 'Adjustments'
    },
    {
      'Type' : 'Revenue',
      'drcr' : 'DR',
      'Name' : 'Variable Consideration'
    },
    {
      'Type' : 'Revenue',
      'drcr' : 'DR',
      'Name' : 'Consideration Paid (Payable) To Customers'
    },
    {
      'Type' : 'Revenue',
      'drcr' : 'DR',
      'Name' : 'Other Adjustments'
    },
    {
      'Type' : 'Expenses',
      'drcr' : 'DR',
      'Name' : 'Adjustments'
    },
    {
      'Type' : 'Expenses',
      'drcr' : 'DR',
      'Name' : 'Expenses Classified By Nature'
    },
    {
      'Type' : 'Expenses',
      'drcr' : 'DR',
      'Name' : 'Merchandise, Material, Parts And Supplies'
    },
    {
      'Type' : 'Expenses',
      'drcr' : 'DR',
      'Name' : 'Employee Benefits'
    },
    {
      'Type' : 'Expenses',
      'drcr' : 'DR',
      'Name' : 'Services'
    },
    {
      'Type' : 'Expenses',
      'drcr' : 'DR',
      'Name' : 'Rent, Depreciation, Amortization And Depletion'
    },
    {
      'Type' : 'Expenses',
      'drcr' : 'DR|CR',
      'Name' : 'Increase (Decrease) In Inventories Of Finished Goods And Work In Progress'
    },

    {
      'Type' : 'Expenses',
      'drcr' : 'CR',
      'Name' : 'Other Work Performed By Entity And Capitalized'
    },
    {
      'Type' : 'Expenses',
      'drcr' : 'DR',
      'Name' : 'Expenses Classified By Function'
    },{
      'Type' : 'Expenses',
      'drcr' : 'DR',
      'Name' : 'Cost Of Sales'
    },
    {
      'Type' : 'Expenses',
      'drcr' : 'DR',
      'Name' : 'Selling, General And Administrative'
    },
    {
      'Type' : 'Expenses',
      'drcr' : 'DR|CR',
      'Name' : 'Credit Loss (Reversal) On Receivables'
    }
  ]

  birLink = [
    {
      "name" : "BIR Form 0605", 
      "code" : "0605",
    "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/1210605.pdf",
    "desc" : "Payment Form",
    "active" : true,
    'pages' : [ 
      true, 
      false,
      false
    ]
  },
  {
    "name" : "BIR Form 0611-A", 
    "code" : "0611-A",
  "link" : "https://www.bir.gov.ph/images/bir_files/0611-A%20Oct%202014%20ENCS.pdf",
  "desc" : "Payment Form Covered by a Letter Notice",
  "active" : false,
  'pages' : [ 
    true, 
    false,
    false
  ]
},
{
  "name" : "BIR Form 0613", 
  "code" : "0613",
"link" : "https://www.bir.gov.ph/images/bir_files/old_files/zip/0613dec2004.pdf",
"desc" : "Payment Form Under Tax Compliance Verification Drive/Tax Mapping",
"active" : false,
'pages' : [ 
  true, 
  false,
  false
]
},
{
"name" : "BIR Form 0619-E", 
"code" : "0619-E",
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/0619-E%20Jan%202018%20rev%20final.pdf",
"desc" : "Monthly Remittance Form for Creditable Income Taxes Withheld (Expanded)",
"active" : false,
'pages' : [ 
  true, 
  false,
  false
]
},
{
"name" : "BIR Form 0619-F", 
"code" : "0619-F",
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/0619-F%20Jan%202018%20rev%20final.pdf",
"desc" : "Monthly Remittance Form for Final Income Taxes Withheld",
"active" : false,
'pages' : [ 
  true, 
  false,
  false
]
},
{
  "name" : "BIR Form 0620", 
  "code" : "0620",
  "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/0620%20Jan%202019%20final.pdf",
  "desc" : "Monthly Remittance Form of Tax Withheld on the Amount Withdrawn from the Decedent's Deposit Account",
  "active" : false,
  'pages' : [ 
    true, 
    false,
    false
  ]
  },
{
"name" : "BIR Form 1600-VT", 
"code" : "1600-VT",
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1600-VT%20January%202018%20ENCS%20final.pdf",
"desc" : "Monthly Remittance Return of Value-Added Tax Withheld",
"active" : false,
'pages' : [ 
  true, 
  false,
  false
]
},
{
"name" : "BIR Form 1600-PT", 
"code" : "1600-PT",
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1600-PT%20January%202018%20ENCS%20final.pdf",
"desc" : "Monthly Remittance Return of Other Percentage Taxes Withheld",
"active" : false,
'pages' : [ 
  true, 
  false,
  false
]
},
{
"name" : "BIR Form 1600WP", 
"code" : "1600WP",
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1600WP%20p1ENCS.pdf",
"desc" : "Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Race Track Operators",
"active" : false,
'pages' : [ 
  true, 
  false,
  false
]
},
{
"name" : "BIR Form 1601-C", 
"code" : "1601-C",
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1601C%20final%20Jan%202018%20with%20DPA.pdf",
"desc" : "Monthly Remittance Return of Income Taxes Withheld on Compensation",
"active" : false,
'pages' : [ 
  true, 
  false,
  false
]
},
{
"name" : "BIR Form 1601-EQ", 
"code" : "1601-EQ",
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1601-EQ%20January%202019%20ENCS%20final.pdf",
"desc" : "Quarterly Remittance Return of Creditable Income Taxes Withheld (Expanded)",
"active" : false,
'pages' : [ 
  true, 
  false,
  false
]
},
{
"name" : "BIR Form 1601-FQ", 
"code" : "1601-FQ",
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1601-FQ%20final%20Jan%202018%20rev%20DPA.pdf",
"desc" : "Quarterly Remittance Return of Final Income Taxes Withheld",
"active" : false,
'pages' : [ 
  true, 
  false,
  false,
  false
]
},
{
"name" : "BIR Form 1602Q", 
"code" : "1602Q",
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1602Q%20Jan%202019.pdf",
"desc" : "Quarterly Remittance Return of Final Income Taxes Withheld On Interest Paid on Deposits and Yield on Deposit Substitutes/Trusts/Etc.",
"active" : false,
'pages' : [ 
  true, 
  false,
  false
]
},
{
"name" : "BIR Form 1603Q",
"code" : "1603Q",
"link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1603Q%20Jan%202018%20final.pdf",
"desc" : "Quarterly Remittance Return of Final Income Taxes Withheld on Fringe Benefits Paid to Employees other than Rank and File",
"active" : false,
'pages' : [ 
  true, 
  false,
  false
]
},
// {
// "name" : "BIR Form 1604-C", 
// "code" : "1604-C",
// "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1604-C%20Jan%202018%20Final.pdf",
// "desc" : "Annual Information Return of Income Taxes Withheld on Compensation",
// "active" : false,
// 'pages' : [ 
//   true, 
//   false,
//   false
// ]
// },
// {
// "name" : "BIR Form 1604-F",
// "code" : "1604-F",
// "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1604-F%20Jan%202018%20Final%202.pdf",
// "desc" : "Annual Information Return of Income Payments Subjected to Final Withholding Taxes",
// "active" : false,
// 'pages' : [ 
//   true, 
//   false,
//   false
// ]
// },
// {
// "name" : "BIR Form 1604-E", 
// "code" : "1604-E",
// "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1604E%20Jan%202018%20ENCS%20Final2.pdf",
// "desc" : "Annual Information Return of Creditable Income Taxes Withheld (Expanded)/ Income Payments Exempt from Withholding Tax ",
// "active" : false,
// 'pages' : [ 
//   true, 
//   false,
//   false
// ]
// },
// {
// "name" : "BIR Form 1606",
// "code" : "1606",
// "link" : "https://www.bir.gov.ph/images/bir_files/160699.pdf",
// "desc" : "Withholding Tax Remittance Return For Onerous Transfer of Real Property Other Than Capital Asset (Including Taxable and Exempt) ",
// "active" : false,
// 'pages' : [ 
//   true, 
//   false,
//   false
// ]
// },
// {
// "name" : "BIR Form 1621", 
// "code" : "1621",
// "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1621%20Jan%202019%20final.pdf",
// "desc" : "Quarterly Remittance Return of Tax Withheld on the Amount Withdrawn from Decedent's Deposit Account",
// "active" : false,
// 'pages' : [ 
//   true, 
//   false,
//   false
// ]
// },
{
  "name" : "BIR Form 1700", 
  "code" : "1700",
  "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1700%20Jan%202018%20ENCS%20v6.pdf",
  "desc" : "Annual Income Tax Return For Individuals Earning Purely Compensation Income (Including Non-Business/Non-Profession Related Income)",
  "active" : false,
  'pages' : [ 
    true, 
    false,
    false
  ]
  },
  {
    "name" : "BIR Form 1701", 
    "code" : "1701",
    "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1701%20Jan%202018%20final%20with%20rates.pdf",
    "desc" : "Annual Income Tax Return For Individuals (including MIXED Income Earner), Estates and Trusts",
    "active" : false,
    'pages' : [ 
      true, 
      false,
      false
    ]
    },
    {
      "name" : "BIR Form 1701A", 
      "code" : "1701A",
      "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1701A%20Jan%202018%20v5%20with%20rates.pdf",
      "desc" : "Annual Income Tax Return For Individuals Earning Income PURELY from Business/Profession (Those under the graduated income tax rates with OSD as mode of deduction OR those who opted to avail of the 8% flat income tax rate)",
      "active" : false,
      'pages' : [ 
        true, 
        false,
        false
      ]
      },
      {
        "name" : "BIR Form 1701Q",
        "code" : "1701Q", 
        "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1701Q%20Jan%202018%20final%20rev2_copy.pdf",
        "desc" : "Quarterly Income Tax Return for Individuals, Estates and Trusts",
        "active" : false,
        'pages' : [ 
          true, 
          false,
          false
        ]
        },
        {
          "name" : "BIR Form 1702-RT", 
          "code" : "1702-RT",
          "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1702-RT%20Jan%202018%20ENCS%20Final%20v3.pdf",
          "desc" : "Annual Income Tax Return For Corporation, Partnership and Other Non-Individual Taxpayer Subject Only to REGULAR Income Tax Rate",
          "active" : false,
          'pages' : [ 
            true, 
            false,
            false
          ]
          },
          {
            "name" : "BIR Form 1702-EX", 
            "code" : "1702-EX",
            "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1702-EX%20Jan%202018%20ENCS%20v2.pdf",
            "desc" : "Annual Income Tax Return For Corporation, Partnership and Other Non-Individual Taxpayers EXEMPT Under the Tax Code, as Amended, [Sec. 30 and those exempted in Sec. 27(C)] and Other Special Laws, with NO Other Taxable Income",
            "active" : false,
            'pages' : [ 
              true, 
              false,
              false
            ]
            },
            {
              "name" : "BIR Form 1702-MX", 
              "code" : "1702-MX",
              "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1702-MX%20Jan%202018%20ENCS%20Final%20with%20OSDv2.pdf",
              "desc" : "Annual Income Tax Return For Corporation, Partnership and Other Non-Individual with MIXED Income Subject to Multiple Income Tax Rates or with Income Subject to SPECIAL/PREFERENTIAL RATE",
              "active" : false,
              'pages' : [ 
                true, 
                false,
                false
              ]
              },
              {
                "name" : "BIR Form 1702Q", 
                "code" : "1702Q",
                "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1702Q%202018ENCS%20final2.pdf",
                "desc" : "Quarterly Income Tax Return for Corporations, Partnerships and Other Non-Individual Taxpayers",
                "active" : false,
                'pages' : [ 
                  true, 
                  false,
                  false
                ]
                },
                {
                  "name" : "BIR Form 1704", 
                  "code" : "1704",
                  "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/30121704%20(MAY2001)%20final.pdf",
                  "desc" : "Improperly Accumulated Earnings Tax Return For Corporations",
                  "active" : false,
                  'pages' : [ 
                    true, 
                    false,
                    false
                  ]
                  },
                  {
                    "name" : "BIR Form 1706", 
                    "code" : "1706",
                    "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/30231706.pdf",
                    "desc" : "Capital Gains Tax Return for Onerous Transfer of Real Property Classified as Capital Asset (both Taxable and Exempt)",
                    "active" : false,
                    'pages' : [ 
                      true, 
                      false,
                      false
                    ]
                    },
                    {
                      "name" : "BIR Form 1707", 
                      "code" : "1707",
                      "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1707%20January%202018%20ENCS.pdf",
                      "desc" : "Capital Gains Tax Return for Onerous Transfer of Shares of Stocks Not Traded Through the Local Stock Exchange",
                      "active" : false,
                      'pages' : [ 
                        true, 
                        false,
                        false
                      ]
                      },
                      {
                        "name" : "BIR Form 1707-A", 
                        "code" : "1707-A",
                        "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/30371707-A(062101)(final).pdf",
                        "desc" : "Annual Capital Gains Tax Return for Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange",
                        "active" : false,
                        'pages' : [ 
                          true, 
                          false,
                          false
                        ]
                        },
                        {
                          "name" : "BIR Form 1709", 
                          "code" : "1709",
                          "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/BIR%20Form%20No.%201709%20Dec%202020%20encs.pdf",
                          "desc" : "Information Return on Transactions with Related Party (Foreign and/or Domestic)",
                          "active" : false,
                          'pages' : [ 
                            true, 
                            false,
                            false
                          ]
                          },
                          {
                            "name" : "BIR Form 1800", 
                            "code" : "1800",
                            "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1800_Jan%202018%20ENCS_final.pdf",
                            "desc" : "Donor's Tax Return",
                            "active" : false,
                            'pages' : [ 
                              true, 
                              false,
                              false
                            ]
                            },
                            {
                              "name" : "BIR Form 1801", 
                              "code" : "1801",
                              "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1801_Jan%202018%20ENCS.pdf",
                              "desc" : "Estate Tax Return",
                              "active" : false,
                              'pages' : [ 
                                true, 
                                false,
                                false
                              ]
                              },
                              // {
                              //   "name" : "BIR Form 1900", 
                              //   "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/20181900.pdf",
                              //   "desc" : "Application for Authority to Use Computerized Accounting System or Components thereof/Loose-Leaf Books of Accounts",
                              //   "active" : false,
                              //   'pages' : [ 
                              //     true, 
                              //     false,
                              //     false
                              //   ]
                              //   },
                              //   {
                              //     "name" : "BIR Form 1901", 
                              //     "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1901%20Jan%202018%20ENCS%20V4_03.04.2019.pdf",
                              //     "desc" : "Application for Registration For Self-Employed (Single Proprietor/Professional), Mixed Income Individuals, Non-Resident Alien Engaged in Trade/Business, Estates and Trusts",
                              //     "active" : false,
                              //     'pages' : [ 
                              //       true, 
                              //       false,
                              //       false
                              //     ]
                              //     },
                              //     {
                              //       "name" : "BIR Form 1902", 
                              //       "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1902%20January%202018%20ENCS%20final.pdf",
                              //       "desc" : "Application for Registration For Individuals Earning Purely Compensation Income (Local and Alien Employee)",
                              //       "active" : false,
                              //       'pages' : [ 
                              //         true, 
                              //         false,
                              //         false
                              //       ]
                              //       },
                              //       {
                              //         "name" : "BIR Form 1903", 
                              //         "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1903%20January%202018%20ENCS%20final.pdf",
                              //         "desc" : "Application for Registration For Corporations, Partnerships (Taxable/Non-Taxable), Including GAIs, LGUs, Cooperatives and Associations",
                              //         "active" : false,
                              //         'pages' : [ 
                              //           true, 
                              //           false,
                              //           false
                              //         ]
                              //         },
                              //         {
                              //           "name" : "BIR Form 1904", 
                              //           "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/Copy%20of%201904%20jan%202000%20encs.pdf",
                              //           "desc" : "Application for Registration For One-Time Taxpayer and Persons Registering under E.O. 98 (Securing a TIN to be able to transact with any Government Office)",
                              //           "active" : false,
                              //           'pages' : [ 
                              //             true, 
                              //             false,
                              //             false
                              //           ]
                              //           },
                              //           {
                              //             "name" : "BIR Form 1905", 
                              //             "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1905%20January%202018%20ENCS_corrected.pdf",
                              //             "desc" : "Application for Registration Information Update/Correction/Cancellation",
                              //             "active" : false,
                              //             'pages' : [ 
                              //               true, 
                              //               false,
                              //               false
                              //             ]
                              //             },
                              //             {
                              //               "name" : "BIR Form 1906", 
                              //               "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/1906%20January%202018%20ENCS%20final.pdf",
                              //               "desc" : "Application for Authority to Print Receipts and Invoices",
                              //               "active" : false,
                              //               'pages' : [ 
                              //                 true, 
                              //                 false,
                              //                 false
                              //               ]
                              //               },
                              //               {
                              //                 "name" : "BIR Form 1907", 
                              //                 "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/21431907.pdf",
                              //                 "desc" : "Application for Permit to Use Cash Register Machine/Point-of-Sale Machine",
                              //                 "active" : false,
                              //                 'pages' : [ 
                              //                   true, 
                              //                   false,
                              //                   false
                              //                 ]
                              //                 },
                                              {
                                                "name" : "BIR Form 2000", 
                                                "code" : "2000",
                                                "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/2000-DST%20Jan%202018%20final.pdf",
                                                "desc" : "Monthly Documentary Stamp Tax Declaration/Return",
                                                "active" : false,
                                                'pages' : [ 
                                                  true, 
                                                  false,
                                                  false
                                                ]
                                                },
                                                {
                                                  "name" : "BIR Form 2000-OT", 
                                                  "code" : "2000-OT",
                                                  "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/2000-OT%20January%202018%20ENCS%20v3.pdf",
                                                  "desc" : "Documentary Stamp Tax Declaration/Return (One-Time Transactions)",
                                                  "active" : false,
                                                  'pages' : [ 
                                                    true, 
                                                    false,
                                                    false
                                                  ]
                                                  },
                                                  // {
                                                  //   "name" : "BIR Form 2110", 
                                                  //   "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/180072110.pdf",
                                                  //   "desc" : "Application for Abatement or Cancellation of Tax, Penalties and/or Interest Under Rev. Reg. No.",
                                                  //   "active" : false,
                                                  //   'pages' : [ 
                                                  //     true, 
                                                  //     false,
                                                  //     false
                                                  //   ]
                                                  //   },
                                                    {
                                                      "name" : "BIR Form 2200-A", 
                                                      "code" : "2200-A",
                                                      "link" : "https://www.bir.gov.ph/images/bir_files/2200-A%20April%202014.pdf",
                                                      "desc" : "Excise Tax Return for Alcohol Products",
                                                      "active" : false,
                                                      'pages' : [ 
                                                        true, 
                                                        false,
                                                        false
                                                      ]
                                                      },
                                                      {
                                                        "name" : "BIR Form 2200-AN", 
                                                        "code" : "2200-AN",
                                                        "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/107792200%20AN(Aug)%20complete.pdf",
                                                        "desc" : "Excise Tax Return for Automobiles and Non-Essential Goods",
                                                        "active" : false,
                                                        'pages' : [ 
                                                          true, 
                                                          false,
                                                          false
                                                        ]
                                                        },
                                                        {
                                                          "name" : "BIR Form 2200-C", 
                                                          "code" : "2200-C",
                                                          "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/2200-C%20Jan%202018%20final%20version3.pdf",
                                                          "desc" : "Excise Tax Return for Cosmetic Procedures",
                                                          "active" : false,
                                                          'pages' : [ 
                                                            true, 
                                                            false,
                                                            false
                                                          ]
                                                          },
                                                          {
                                                            "name" : "BIR Form 2200-M", 
                                                            "code" : "2200-M",
                                                            "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/2200-M%20Jan%202018%20ENCS%20final%20version.pdf",
                                                            "desc" : "Excise Tax Return for Mineral Products",
                                                            "active" : false,
                                                            'pages' : [ 
                                                              true, 
                                                              false,
                                                              false
                                                            ]
                                                            },
                                                            {
                                                              "name" : "BIR Form 2200-P",
                                                              "code" : "2200-P", 
                                                              "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/268942200P%20Final.pdf",
                                                              "desc" : "Excise Tax Return for Petroleum Products",
                                                              "active" : false,
                                                              'pages' : [ 
                                                                true, 
                                                                false,
                                                                false
                                                              ]
                                                              },
                                                              {
                                                                "name" : "BIR Form 2200-S", 
                                                              "code" : "2200-S",
                                                                "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/2200-S%20Jan%202018.pdf",
                                                                "desc" : "Excise Tax Return for Sweetened Beverages",
                                                                "active" : false,
                                                                'pages' : [ 
                                                                  true, 
                                                                  false,
                                                                  false
                                                                ]
                                                                },
                                                                {
                                                                  "name" : "BIR Form 2200-T", 
                                                              "code" : "2200-T", 
                                                                  "link" : "https://www.bir.gov.ph/images/bir_files/2200-T%20April%202014.pdf",
                                                                  "desc" : "Excise Tax Return for Tobacco Products",
                                                                  "active" : false,
                                                                  'pages' : [ 
                                                                    true, 
                                                                    false,
                                                                    false
                                                                  ]
                                                                  },
                                                                  {
                                                                    "name" : "BIR Form 2304", 
                                                                    "code" : "2304",
                                                                    "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/15532304PDF.pdf",
                                                                    "desc" : "Certificate of Income Payment Not Subject to Withholding Tax (Excluding Compensation Income)",
                                                                    "active" : false,
                                                                    'pages' : [ 
                                                                      true, 
                                                                      false,
                                                                      false
                                                                    ]
                                                                    },
                                                                    {
                                                                      "name" : "BIR Form 2306", 
                                                                      "code" : "2306",
                                                                      "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/2306%20Jan%202018%20ENCS%20v3.pdf",
                                                                      "desc" : "Certificate of Final Tax Withheld At Source",
                                                                      "active" : false,
                                                                      'pages' : [ 
                                                                        true, 
                                                                        false,
                                                                        false
                                                                      ]
                                                                      },
                                                                      {
                                                                        "name" : "BIR Form 2307", 
                                                                        "code" : "2307",
                                                                        "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/2307%20Jan%202018%20ENCS%20v3.pdf",
                                                                        "desc" : "Certificate of Creditable Tax Withheld At Source",
                                                                        "active" : false,
                                                                        'pages' : [ 
                                                                          true, 
                                                                          false,
                                                                          false
                                                                        ]
                                                                        },
                                                                        {
                                                                          "name" : "BIR Form 2316", 
                                                                          "code" : "2316",
                                                                          "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/2316%20Jan%202018%20ENCS%20final2.pdf",
                                                                          "desc" : "Certificate of Compensation Payment/Tax Withheld For Compensation Payment With or Without Tax Withheld",
                                                                          "active" : false,
                                                                          'pages' : [ 
                                                                            true, 
                                                                            false,
                                                                            false
                                                                          ]
                                                                          },
                                                                          {
                                                                            "name" : "BIR Form 2550M", 
                                                                            "code" : "2550M",
                                                                            "link" : "https://www.bir.gov.ph/index.php/bir-forms/vat-percentage-tax-returns.html#vptr2550m",
                                                                            "desc" : "Monthly Value-Added Tax Declaration",
                                                                            "active" : false,
                                                                            'pages' : [ 
                                                                              true, 
                                                                              false,
                                                                              false
                                                                            ]
                                                                            },
                                                                            {
                                                                              "name" : "BIR Form 2550Q", 
                                                                              "code" : "2550Q",
                                                                              "link" : "https://www.bir.gov.ph/index.php/bir-forms/vat-percentage-tax-returns.html#vptr2550q",
                                                                              "desc" : "Quarterly Value-Added Tax Return",
                                                                              "active" : false,
                                                                              'pages' : [ 
                                                                                true, 
                                                                                false,
                                                                                false
                                                                              ]
                                                                              },
                                                                              {
                                                                                "name" : "BIR Form 2551Q", 
                                                                                "code" : "2551Q",
                                                                                "link" : "https://www.bir.gov.ph/images/bir_files/taxpayers_service_programs_and_monitoring_1/2551Q%20Jan%202018%20ENCS%20final%20rev%203_copy.pdf",
                                                                                "desc" : "Quarterly Percentage Tax Return",
                                                                                "active" : false,
                                                                                'pages' : [ 
                                                                                  true, 
                                                                                  false,
                                                                                  false
                                                                                ]
                                                                                },
                                                                                {
                                                                                  "name" : "BIR Form 2552", 
                                                                                  "code" : "2552",
                                                                                  "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/41742552(99).pdf",
                                                                                  "desc" : "Percentage Tax Return for Transactions Involving Shares of Stock Listed and Traded Through the Local Stock Exchange or Through Initial and/or Secondary Public Offering",
                                                                                  "active" : false,
                                                                                  'pages' : [ 
                                                                                    true, 
                                                                                    false,
                                                                                    false
                                                                                  ]
                                                                                  },
                                                                                  {
                                                                                    "name" : "BIR Form 2553", 
                                                                                    "code" : "2553",
                                                                                    "link" : "https://www.bir.gov.ph/images/bir_files/old_files/pdf/42792553.pdf",
                                                                                    "desc" : "Return of Percentage Tax Payable Under Special Laws",
                                                                                    "active" : false,
                                                                                    'pages' : [ 
                                                                                      true, 
                                                                                      false,
                                                                                      false
                                                                                    ]
                                                                                    },

  ]

  requestClientData(){
    // Get Data
    return this.http.get<Adba[]>(this.myAppUrl + this.logSubmitBookkeeping)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  getUniqueRecord(rawArr, newArr) {
    var arrayHolder = {};
    var businessUnique = [];
    var j = 0;
    for(var i = 0; i < rawArr.length; i++) {
      var item = rawArr[i];
      if(arrayHolder[item] !== 1) {
        arrayHolder[item] = 1;
        newArr[j++] = item;
      }
    }
  }

  setEn(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  getEn(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  
  RDO = [
    {
      'RDO_Code' : '001',
      'RDO' : '001 Laoag City, Ilocos Norte',
    },
    {
      'RDO_Code' : '002',
      'RDO' : '002 Vigan, Ilocos Sur',
    },
    {
      'RDO_Code' : '003',
      'RDO' : '003 San Fernando, La Union',
    },
    {
      'RDO_Code' : '004',
      'RDO' : '004 Calasiao, West Pangasinan',
    },
    {
      'RDO_Code' : '005',
      'RDO' : '005 Alaminos, Pangasinan',
    },
    {
      'RDO_Code' : '006',
      'RDO' : '006 Urdaneta, Pangasinan',
    },
    {
      'RDO_Code' : '007',
      'RDO' : '007 Bangued, Abra',
    },
    {
      'RDO_Code' : '008',
      'RDO' : '008 Baguio City',
    },
    {
      'RDO_Code' : '009',
      'RDO' : '009 La Trinidad, Benguet',
    },
    {
      'RDO_Code' : '010',
      'RDO' : '010 Bontoc, Mt. Province',
    },
    {
      'RDO_Code' : '011',
      'RDO' : '011 Tabuk City, Kalinga',
    },
    {
      'RDO_Code' : '012',
      'RDO' : '012 Lagawe, Ifugao',
    },
    {
      'RDO_Code' : '013',
      'RDO' : '013 Tuguegarao, Cagayan',
    },

    {
      'RDO_Code' : '014',
      'RDO' : '014 Bayombong, Nueva Vizcaya',
    },
    {
      'RDO_Code' : '015',
      'RDO' : '015 Naguilian, Isabela',
    },{
      'RDO_Code' : '016',
      'RDO' : '016 Cabarroguis, Quirino',
    },
    {
      'RDO_Code' : '17A',
      'RDO' : '17A Tarlac City, Tarlac',
    },
    {
      'RDO_Code' : '17B',
      'RDO' : '17B Paniqui, Tarlac',
    },
    {
      'RDO_Code' : '018',
      'RDO' : '018 Olongapo City',
    },
    {
      'RDO_Code' : '019',
      'RDO' : '019 Subic Bay Freeport Zone',
    },
    {
      'RDO_Code' : '020',
      'RDO' : '020 Balanga, Bataan',
    },
    {
      'RDO_Code' : '21A',
      'RDO' : '21A North Pampanga',
    },
    {
      'RDO_Code' : '21B',
      'RDO' : '21B South Pampanga',
    },
    {
      'RDO_Code' : '21C',
      'RDO' : '21C Clark Freeport Zone',
    },
    {
      'RDO_Code' : '022',
      'RDO' : '022 Baler, Aurora',
    },
    {
      'RDO_Code' : '23A',
      'RDO' : '23A North Nueva Ecija',
    },
    {
      'RDO_Code' : '23B',
      'RDO' : '23B South Nueva Ecija',
    },
    {
      'RDO_Code' : '024',
      'RDO' : '024 Valenzuela City',
    },
    {
      'RDO_Code' : '25A',
      'RDO' : '25A Plaridel, Bulacan',
    },
    {
      'RDO_Code' : '25B',
      'RDO' : '25B Sta. Maria, Bulacan',
    },
    {
      'RDO_Code' : '026',
      'RDO' : '026 Malabon-Navotas',
    },
    {
      'RDO_Code' : '027',
      'RDO' : '027 Caloocan City',
    },
    {
      'RDO_Code' : '028',
      'RDO' : '028 Novaliches',
    },
    {
      'RDO_Code' : '029',
      'RDO' : '029 Tondo - San Nicolas',
    },
    {
      'RDO_Code' : '030',
      'RDO' : '030 Binondo',
    },
    {
      'RDO_Code' : '031',
      'RDO' : '031 Sta. Cruz',
    },
    {
      'RDO_Code' : '032',
      'RDO' : '032 Quiapo-Sampaloc-San Miguel-Sta. Mesa',
    },
    {
      'RDO_Code' : '033',
      'RDO' : '033 Intramuros-Ermita-Malate',
    },
    {
      'RDO_Code' : '034',
      'RDO' : '034 Paco-Pandacan-Sta. Ana-San Andres',
    },
    {
      'RDO_Code' : '035',
      'RDO' : '035 Romblon',
    },
    {
      'RDO_Code' : '036',
      'RDO' : '036 Puerto Princesa',
    },
    {
      'RDO_Code' : '037',
      'RDO' : '037 San Jose, Occidental Mindoro',
    },
    {
      'RDO_Code' : '038',
      'RDO' : '038 North Quezon City',
    },
    {
      'RDO_Code' : '039',
      'RDO' : '039 South Quezon City',
    },
    {
      'RDO_Code' : '040',
      'RDO' : '040 Cubao',
    },
    {
      'RDO_Code' : '041',
      'RDO' : '041 Mandaluyong City',
    },
    {
      'RDO_Code' : '042',
      'RDO' : '042 San Juan',
    },
    {
      'RDO_Code' : '043',
      'RDO' : '043 Pasig',
    },
    {
      'RDO_Code' : '044',
      'RDO' : '044 Taguig-Pateros',
    },
    {
      'RDO_Code' : '045',
      'RDO' : '045 Marikina',
    },
    {
      'RDO_Code' : '046',
      'RDO' : '046 Cainta-Taytay',
    },
    {
      'RDO_Code' : '047',
      'RDO' : '047 East Makati',
    },
    {
      'RDO_Code' : '048',
      'RDO' : '048 West Makati',
    },
    {
      'RDO_Code' : '049',
      'RDO' : '049 North Makati',
    },
    {
      'RDO_Code' : '050',
      'RDO' : '050 South Makati',
    },
    {
      'RDO_Code' : '051',
      'RDO' : '051 Pasay City',
    },
    {
      'RDO_Code' : '052',
      'RDO' : '052 Parañaque',
    },
    {
      'RDO_Code' : '53A',
      'RDO' : '53A Las Piñas City',
    },
    {
      'RDO_Code' : '53B',
      'RDO' : '53B Muntinlupa City',
    },

    {
      'RDO_Code' : '54A',
      'RDO' : '54A Trece Martirez City, East Cavite',
    },
    {
      'RDO_Code' : '54B',
      'RDO' : '54B Kawit, West Cavite',
    },
    {
      'RDO_Code' : '055',
      'RDO' : '055 San Pablo City',
    },
    {
      'RDO_Code' : '056',
      'RDO' : '056 Calamba, Laguna',
    },
    {
      'RDO_Code' : '057',
      'RDO' : '057 Biñan, Laguna',
    },
    {
      'RDO_Code' : '058',
      'RDO' : '058 Batangas City',
    },
    {
      'RDO_Code' : '059',
      'RDO' : '059 Lipa City',
    },
    {
      'RDO_Code' : '060',
      'RDO' : '060 Lucena City',
    },
    {
      'RDO_Code' : '061',
      'RDO' : '061 Gumaca, Quezon',
    },

    {
      'RDO_Code' : '062',
      'RDO' : '062 Boac, Marinduque',
    },{
      'RDO_Code' : '063',
      'RDO' : '063 Calapan, Oriental Mindoro',
    },
    {
      'RDO_Code' : '064',
      'RDO' : '064 Talisay, Camarines Norte',
    },
    {
      'RDO_Code' : '065',
      'RDO' : '065 Naga City',
    },
    {
      'RDO_Code' : '066',
      'RDO' : '066 Iriga City',
    },
    {
      'RDO_Code' : '067',
      'RDO' : '067 Legazpi City, Albay',
    },
    {
      'RDO_Code' : '068',
      'RDO' : '068 Sorsogon, Sorsogon',
    },
    {
      'RDO_Code' : '069',
      'RDO' : '069 Virac, Catanduanes',
    },
    {
      'RDO_Code' : '070',
      'RDO' : '070 Masbate, Masbate',
    },
    {
      'RDO_Code' : '071',
      'RDO' : '071 Kalibo, Aklan',
    },
    {
      'RDO_Code' : '072',
      'RDO' : '072 Roxas City',
    },{
      'RDO_Code' : '073',
      'RDO' : '073 San Jose, Antique',
    },
    {
      'RDO_Code' : '074',
      'RDO' : '074 Iloilo City',
    },
    {
      'RDO_Code' : '075',
      'RDO' : '075 Zarraga, Iloilo City',
    },
    {
      'RDO_Code' : '076',
      'RDO' : '076 Victorias City, Negros Occidental',
    },
    {
      'RDO_Code' : '077',
      'RDO' : '077 Bacolod City',
    },
    {
      'RDO_Code' : '078',
      'RDO' : '078 Binalbagan, Negros Occidental',
    },
    {
      'RDO_Code' : '079',
      'RDO' : '079 Dumaguete City',
    },
    {
      'RDO_Code' : '080',
      'RDO' : '080 Mandaue City',
    },
    {
      'RDO_Code' : '081',
      'RDO' : '081 Cebu City North',
    },
    {
      'RDO_Code' : '082',
      'RDO' : '082 Cebu City South',
    },
    {
      'RDO_Code' : '083',
      'RDO' : '083 Talisay City, Cebu',
    },
    {
      'RDO_Code' : '084',
      'RDO' : '084 Tagbilaran City',
    },

    {
      'RDO_Code' : '085',
      'RDO' : '085 Catarman, Northern Samar',
    },
    {
      'RDO_Code' : '086',
      'RDO' : '086 Borongan, Eastern Samar',
    },
    {
      'RDO_Code' : '087',
      'RDO' : '087 Calbayog City, Samar',
    },
    {
      'RDO_Code' : '088',
      'RDO' : '088 Tacloban City',
    },
    {
      'RDO_Code' : '089',
      'RDO' : '089 Ormoc City',
    },
    {
      'RDO_Code' : '090',
      'RDO' : '090 Maasin, Southern Leyte',
    },
    {
      'RDO_Code' : '091',
      'RDO' : '091 Dipolog City',
    },
    {
      'RDO_Code' : '092',
      'RDO' : '092 Pagadian City, Zamboanga del Sur',
    },
    {
      'RDO_Code' : '093A',
      'RDO' : '093A Zamboanga City, Zamboanga del Sur',
    },
    {
      'RDO_Code' : '093B',
      'RDO' : '093B Ipil, Zamboanga Sibugay',
    },
    {
      'RDO_Code' : '094',
      'RDO' : '094 Isabela, Basilan',
    },
    {
      'RDO_Code' : '095',
      'RDO' : '095 Jolo, Sulu',
    },
    {
      'RDO_Code' : '096',
      'RDO' : '096 Bongao, Tawi-Tawi',
    },
    {
      'RDO_Code' : '097',
      'RDO' : '097 Gingoog City',
    },
    {
      'RDO_Code' : '098',
      'RDO' : '098 Cagayan de Oro City',
    },
    {
      'RDO_Code' : '099',
      'RDO' : '099 Malaybalay City, Bukidnon',
    },
    {
      'RDO_Code' : '100',
      'RDO' : '100 Ozamis City',
    },
    {
      'RDO_Code' : '101',
      'RDO' : '101 Iligan City',
    },
    {
      'RDO_Code' : '102',
      'RDO' : '102 Marawi City',
    },
    {
      'RDO_Code' : '103',
      'RDO' : '103 Butuan City',
    },
    {
      'RDO_Code' : '104',
      'RDO' : '104 Bayugan City, Agusan del Sur',
    },
    {
      'RDO_Code' : '105',
      'RDO' : '105 Surigao City',
    },
    {
      'RDO_Code' : '106',
      'RDO' : '106 Tandag, Surigao del Sur',
    },
    {
      'RDO_Code' : '107',
      'RDO' : '107 Cotabato City',
    },
    {
      'RDO_Code' : '108',
      'RDO' : '108 Kidapawan, North Cotabato',
    },
    {
      'RDO_Code' : '109',
      'RDO' : '109 Tacurong, Sultan Kudarat',
    },
    {
      'RDO_Code' : '110',
      'RDO' : '110 General Santos City',
    },
    {
      'RDO_Code' : '111',
      'RDO' : '111 Koronadal City, South Cotabato',
    },
    {
      'RDO_Code' : '112',
      'RDO' : '112 Tagum, Davao del Norte',
    },
    {
      'RDO_Code' : '113A',
      'RDO' : '113A West Davao City',
    },
    {
      'RDO_Code' : '113B',
      'RDO' : '113B East Davao City',
    },
    {
      'RDO_Code' : '114',
      'RDO' : '114 Mati, Davao Oriental',
    },
    {
      'RDO_Code' : '115',
      'RDO' : '115 Digos, Davao del Sur',
    },
  ]
}
