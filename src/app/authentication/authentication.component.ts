import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { TaxfilingService } from '../taxfiling.service';

declare var $: any;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  private cookieValue: string;
  isLogin = true;
  isRegister = false;
  passwordCheck: any;
  userAuth : any;
  availableUsername : any;
  pg1 = true;
  pg2 = false;

  dateNow = new Date();

  AuthorizedUser : any = null;

  showPass : any = true;

  
  authorizedUsername : any = null;
  authorizedPassword : any = null;
  authorizedPasswordShow : any = false;

  rdolist : any = [];
  rdoName = 'RDO';

    constructor(
    private taxfilingservice: TaxfilingService, 
    private router: Router,) { 
      this.rdolist = this.taxfilingservice.RDO;
    }

  ngOnInit() {
    document.addEventListener('keyup', function (e) {
      let keyCode = e.keyCode || e.which; 
      let currtarget = e.target as HTMLTextAreaElement;

      if (keyCode == 9) { 
        if(currtarget.classList.contains('main-login-input')) {
          let targetLabel = currtarget.previousElementSibling.classList[0];
          $('.' + targetLabel).addClass('active');
          $('.' + targetLabel).css({'color' : 'var(--primary-c)'});
          $('#' + currtarget.id).css({'border' : '1px solid var(--primary-c'});
        }
      }

      if(currtarget.id == "email-input") {
        let emailField = $('#' + currtarget.id).val();

        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(emailField)) {
          if(currtarget.classList.contains('main-login-input')) {
            let targetLabel = currtarget.previousElementSibling.classList[0];
            $('.' + targetLabel).addClass('active');
            $('.' + targetLabel).css({'color' : 'var(--primary-c)'});
            $('#' + currtarget.id).css({'border' : '1px solid var(--primary-c'});
          }
        } else {
          if(currtarget.classList.contains('main-login-input')) {
            let targetLabel = currtarget.previousElementSibling.classList[0];
            $('.' + targetLabel).addClass('active');
            $('.' + targetLabel).css({'color' : 'var(--error-c)'});
            $('#' + currtarget.id).css({'border' : '1px solid var(--error-c'});
          }
        }
      }

      if(currtarget.id == "username-input") {

      }

    }, false);

    let alpaGen = this.autoGenerateAlphaNumeric(false)
    $( document ).ready(function() {

    //auto-generate username
    let usernameinputReg = $('#username-input');
    if(usernameinputReg) {
      usernameinputReg.val(alpaGen);
      this.availableUsername = alpaGen;
    }

    });

    var today = new Date();
    $('#birthdate-input').val(today.toISOString().substr(0, 10));
    $('#spbirthdate-input').val(today.toISOString().substr(0, 10));

  }

  autoGenerateAlphaNumeric(isToken) {
    var result = '';
    var defLength = 8;
    var keyLength = 22;
    var num = '0123456789';
    var alphanum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(isToken) {
      for (var i = keyLength; i > 0; --i) result += alphanum[Math.floor(Math.random() * alphanum.length)];
      return result;
    } else {
      for (var i = defLength; i > 0; --i) result += num[Math.floor(Math.random() * num.length)];
      this.taxfilingservice.getAuth().subscribe(data => { 
        if(data !== null) {
          let dataexist = data.find(function(value){
            return value["username"] == result;
          });
  
          if(dataexist) {
            this.autoGenerateAlphaNumeric(false);
          } else {
            this.availableUsername = result;
            return result;
          }
        } else  {
          this.availableUsername = result;
          return result;
        }

      });
    }
  }

  onFieldChecker($event) {
    let targetlabel = $event.currentTarget.previousElementSibling.classList[0];
    let targetField = $event.currentTarget["id"];
    $('.' + targetlabel).addClass('active');
    $('.' + targetlabel).css({'color' : 'var(--primary-c)'});
    $('#' + targetField).css({'border' : '1px solid var(--primary-c'});
  }

  onLoginChecker() {
    let username = $('#username-input-login').val();
    let password = $('#password-input-login').val();
    this.taxfilingservice.getAuth().subscribe(data => {
      if($('#username-input-login').val().length !== 0 && $('#password-input-login').val().length !== 0){
        this.userAuth = data.find(function(value){
          return value["username"] == $('#username-input-login').val();
        });
        this.taxfilingservice.clientAuthorize = this.userAuth;
        
        let getAuthPass = this.taxfilingservice.setEn('123456$#@$^@1ERF', $('#password-input-login').val());
        let pass = this.taxfilingservice.getEn('123456$#@$^@1ERF', getAuthPass);
        if(this.userAuth !== undefined) {
          this.passwordCheck = this.userAuth.key == getAuthPass ? true : false;

          if(this.passwordCheck) {
            this.dateNow.setHours(this.dateNow.getHours() + 24);
            this.taxfilingservice.addLog(this.taxfilingservice.getDateTime(false), "System Access", this.userAuth.username);
            this.taxfilingservice.setCookie('sidClient', this.userAuth.username, parseInt(this.dateNow.toString()));
            this.taxfilingservice.setCookie('tkiClient', this.userAuth.token, parseInt(this.dateNow.toString()));
            this.router.navigate(['/dashboard']);
          }
          else {
            
          }
        }
      }
      else {
        $('#username-input').css({'border' : '1px solid var(--error-c'});
        $('#password-input').css({'border' : '1px solid var(--error-c'});
        $('.login-label-username').css({'color' : 'var(--error-c)'});
        $('.login-label-password').css({'color' : 'var(--error-c)'});
      }
    })
  };

  onRegisterChecker(){
    let regUser = $('#username-input').val(),
    regPass = this.taxfilingservice.setEn('123456$#@$^@1ERF', $('#password-input').val()),
    regFullN = $('#fn-input').val(),
    regEmail = $('#email-input').val(),
    regMarital = $('#maritalStatus-input').val(),
    regBirthdate = $('#birthdate-input').val(),
    regCitizenship = $('#citizenship-input').val(),
    regRDO = $('#rdo-input').val(),
    regFileUpload = $('#register-file');
            let inputRDO = $('#rdo-input > .autocomplete-container > .input-container > input').val();
            let rdosearch = this.rdolist.find(function(data) {
              return data["RDO"] == inputRDO
            });

    // let file = regFileUpload[0].files[0];
    // if(file !== undefined) {
    //   let filetype = file["type"];
    //   let fileName = file["name"];
    //   let now = this.taxfilingservice.getDateTime(false)

    //   this.taxfilingservice.onFileUploadAttachment(file, 'registration_' + regUser);
    //   this.taxfilingservice.onFileUploadLog(regUser, fileName, 'Registration File Attachment', now);
    // }

    this.taxfilingservice.addAuth(regUser, regPass, regEmail, regFullN, regMarital, regBirthdate, rdosearch.RDO_Code, regCitizenship);

    
      if(this.AuthorizedUser == null) {
        $('.modal-backdrop').css('display', 'block');
        setTimeout( () => { 
          this.onRedirected();
        }, 2000);
      }



    
        // switch (count) {
        //   case 1:
        //   if(fnInput.val() == '' || fnInput.val() == null || emailInput.val() == '' || emailInput.val() == null || usernameInput.val() == '' || usernameInput.val() == null || passwordInput.val() == '' || passwordInput.val() == null || spfbdInput.val() == '' || spfbdInput.val() == null) {
        //     fnLabel.addClass('active');
        //     fnLabel.css({'color' : 'var(--error-c)'});
        //     fnInput.css({'border' : '1px solid var(--error-c)'});

        //     emailLabel.addClass('active');
        //     emailLabel.css({'color' : 'var(--error-c)'});
        //     emailInput.css({'border' : '1px solid var(--error-c)'});

        //     passwordLabel.addClass('active');
        //     passwordLabel.css({'color' : 'var(--error-c)'});
        //     passwordInput.css({'border' : '1px solid var(--error-c)'});

        //     if(statusInput[0].value == "married") {
        //       if(spfInput.val() == '' || spfInput.val() == null) {
        //         spfnLabel.addClass('active');
        //         spfnLabel.css({'color' : 'var(--error-c)'});
        //         spfInput.css({'border' : '1px solid var(--error-c)'});
        //         switchNext = false;
        //       }
        //     }

        //     switchNext = false;
        //   } else {
        //     fnLabel.addClass('active');
        //     fnLabel.css({'color' : 'var(--primary-c)'});
        //     fnInput.css({'border' : '1px solid var(--primary-c)'});

        //     emailLabel.addClass('active');
        //     emailLabel.css({'color' : 'var(--primary-c)'});
        //     emailInput.css({'border' : '1px solid var(--primary-c)'});

        //     usernameLabel.addClass('active');
        //     usernameLabel.css({'color' : 'var(--primary-c)'});
        //     usernameInput.css({'border' : '1px solid var(--primary-c)'});

        //     passwordLabel.addClass('active');
        //     passwordLabel.css({'color' : 'var(--primary-c)'});
        //     passwordInput.css({'border' : '1px solid var(--primary-c)'});

        //     spfnLabel.addClass('active');
        //     spfnLabel.css({'color' : 'var(--primary-c)'});
        //     spfInput.css({'border' : '1px solid var(--primary-c)'});

        //     spbdLabel.addClass('active');
        //     spbdLabel.css({'color' : 'var(--primary-c)'});
        //     spfbdInput.css({'border' : '1px solid var(--primary-c)'});

        //     switchNext = true;
        //   }

        //   statusLabel.addClass('active');
        //   statusLabel.css({'color' : 'var(--primary-c)'});
        //   statusInput.css({'border' : '1px solid var(--primary-c)'});

        //   bdlabel.addClass('active');
        //   bdlabel.css({'color' : 'var(--primary-c)'});
        //   bdinput.css({'border' : '1px solid var(--primary-c)'});

        //   if(switchNext) {
        //     this.pg1 = false;
        //     this.pg2 = true;
        //   }
        //   break;
        //   case 2:
        //     if(bnInput.val() == '' || bnInput.val() == null) {
        //       bnLabel.addClass('active');
        //       bnLabel.css({'color' : 'var(--error-c)'});
        //       bnInput.css({'border' : '1px solid var(--error-c)'});
        //       switchNext = false;
        //     } else {
        //       bnLabel.addClass('active');
        //       bnLabel.css({'color' : 'var(--primary-c)'});
        //       bnInput.css({'border' : '1px solid var(--primary-c)'});
        //       switchNext = true;
        //     }

        //     if(bnadressInput.val() == '' || bnadressInput.val() == null) {
        //       bnaddresslabel.addClass('active');
        //       bnaddresslabel.css({'color' : 'var(--error-c)'});
        //       bnadressInput.css({'border' : '1px solid var(--error-c)'});
        //       switchNext = false;
        //     } else {
        //       bnaddresslabel.addClass('active');
        //       bnaddresslabel.css({'color' : 'var(--primary-c)'});
        //       bnadressInput.css({'border' : '1px solid var(--primary-c)'});
        //       switchNext = true;
        //     }

        //     if(bnIndustryInput.val() == '' || bnIndustryInput.val() == null) {
        //       bnIndustryLabel.addClass('active');
        //       bnIndustryLabel.css({'color' : 'var(--error-c)'});
        //       bnIndustryInput.css({'border' : '1px solid var(--error-c)'});
        //       switchNext = false;
        //     } else {
        //       bnIndustryLabel.addClass('active');
        //       bnIndustryLabel.css({'color' : 'var(--primary-c)'});
        //       bnIndustryInput.css({'border' : '1px solid var(--primary-c)'});
        //       switchNext = true;
        //     }

        //     if(rdoInput.val() == '' || rdoInput.val() == null) {
        //       rdolabel.addClass('active');
        //       rdolabel.css({'color' : 'var(--error-c)'});
        //       rdoInput.css({'border' : '1px solid var(--error-c)'});
        //       switchNext = false;
        //     } else {
        //       rdolabel.addClass('active');
        //       rdolabel.css({'color' : 'var(--primary-c)'});
        //       rdoInput.css({'border' : '1px solid var(--primary-c)'});
        //       switchNext = true;
        //     }

        //     if(sssInput.val() == '' || sssInput.val() == null) {
        //       ssslabel.addClass('active');
        //       ssslabel.css({'color' : 'var(--error-c)'});
        //       sssInput.css({'border' : '1px solid var(--error-c)'});
        //       switchNext = false;
        //     } else {
        //       ssslabel.addClass('active');
        //       ssslabel.css({'color' : 'var(--primary-c)'});
        //       sssInput.css({'border' : '1px solid var(--primary-c)'});
        //       switchNext = true;
        //     }

        //     if(tininput.val() == '' || tininput.val() == null) {
        //       tinlabel.addClass('active');
        //       tinlabel.css({'color' : 'var(--error-c)'});
        //       tininput.css({'border' : '1px solid var(--error-c)'});
        //       switchNext = false;
        //     } else {
        //       tinlabel.addClass('active');
        //       tinlabel.css({'color' : 'var(--primary-c)'});
        //       tininput.css({'border' : '1px solid var(--primary-c)'});
        //       switchNext = true;
        //     }

        //     if(idtypeinput.val() == '' || idtypeinput.val() == null) {
        //       idtypelabel.addClass('active');
        //       idtypelabel.css({'color' : 'var(--error-c)'});
        //       idtypeinput.css({'border' : '1px solid var(--error-c)'});
        //       switchNext = false;
        //     } else {
        //       idtypelabel.addClass('active');
        //       idtypelabel.css({'color' : 'var(--primary-c)'});
        //       idtypeinput.css({'border' : '1px solid var(--primary-c)'});
        //       switchNext = true;
        //     }

        //     if(idnumberinput.val() == '' || idnumberinput.val() == null) {
        //       idnumberlabel.addClass('active');
        //       idnumberlabel.css({'color' : 'var(--error-c)'});
        //       idnumberinput.css({'border' : '1px solid var(--error-c)'});
        //       switchNext = false;
        //     } else {
        //       idnumberlabel.addClass('active');
        //       idnumberlabel.css({'color' : 'var(--primary-c)'});
        //       idnumberinput.css({'border' : '1px solid var(--primary-c)'});
        //       switchNext = true;
        //     }
        //     let inputRDO = $('#rdo-input > .autocomplete-container > .input-container > input').val();
        //     let rdosearch = this.rdolist.find(function(data) {
        //       return data["RDO"] == inputRDO
        //     });

        //     if(rdosearch !== undefined) {
        //       switchNext = true;
        //     } else {
        //       switchNext = false;
        //     }

        //     if(switchNext) {

        //     }
        //   // this.pg1 = false;
        //   // this.pg2 = false;
        //   break;

        // }

  }

  onOpenCreateAccount() {
    this.isRegister = true;
    this.isLogin = false;

    //auto-generate username
    let usernameinputReg = $('#username-input');
    if(usernameinputReg) {
      usernameinputReg.val(this.autoGenerateAlphaNumeric(false));
    }
  }

  onOpenLogin() {
    this.isRegister = false;
    this.isLogin = true;
  }

  onRedirected(){
    if(this.AuthorizedUser == null) {
      let regUser = $('#username-input').val();

        this.taxfilingservice.getAuth().subscribe(data => {
          let AuthorizeUser = data.find(function(value){
            return value["username"] == regUser;
          });
          if(AuthorizeUser){
            $('#authentication-save-modal').css({'display': 'block'});
            this.authorizedUsername = AuthorizeUser["username"];
            this.authorizedPassword = this.taxfilingservice.getEn('123456$#@$^@1ERF', AuthorizeUser["key"]);
            this.AuthorizedUser = this.taxfilingservice.getEn('123456$#@$^@1ERF', AuthorizeUser["key"]);
            this.triggerPassword(null);
            this.taxfilingservice.addLog(this.taxfilingservice.getDateTime(false), "Account Created", regUser);
            this.dateNow.setHours(this.dateNow.getHours() + 24);
            this.taxfilingservice.deleteCookie('sidClient');
            this.taxfilingservice.deleteCookie('tkiClient');
            this.taxfilingservice.setCookie('sidClient', AuthorizeUser["username"], parseInt(this.dateNow.toString()));
            this.taxfilingservice.setCookie('tkiClient', AuthorizeUser["token"], parseInt(this.dateNow.toString()));
          }
        });
    }
  }

  showPassword(event){
    this.showPass = !this.showPass;
    let target = event.target.parentElement.previousElementSibling.id;
    if(this.showPass) {
      $('#' + target).attr('type', 'password');
    } else {
      $('#' + target).attr('type', 'text');
    }
  }

  savedAuthentication() {
    $('.modal-backdrop').css('display', 'none');
    $('#authentication-save-modal').css({'display': 'none'});
    this.router.navigate(['/dashboard']);
    this.taxfilingservice.onGetStarted = true;
  }

  triggerPassword(e) {
    let passwordVal = "";
    if(!this.authorizedPasswordShow) {
      this.authorizedPasswordShow = !this.authorizedPasswordShow;
      for(let i = 1; i <= this.authorizedPassword.length; i++) {
        passwordVal += '*';
      }

      this.authorizedPassword = passwordVal;
    } else {
      this.authorizedPasswordShow = !this.authorizedPasswordShow;
      this.authorizedPassword = this.AuthorizedUser;
    }
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){

  }

  selectRDOList(event) {

  }
}
