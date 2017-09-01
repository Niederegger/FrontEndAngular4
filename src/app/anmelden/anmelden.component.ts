import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { Router } from '@angular/router';
import { RestProviderService } from "../rest-provider.service";

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.css'],
  providers: [RestProviderService]
})
export class AnmeldenComponent implements OnInit {

  constructor(private sg: SimpleGlobal, private _router: Router, private rps: RestProviderService) { }

  emailLogin
  passwordLogin
  usernameRegister
  eMailRegister
  passwordRegister
  passwordRegisterRep
  regex
  registerData
  loginData
  feedBackR
  validatorR
  feedBackL
  validatorL

  ngOnInit(): void {
    this.sg['state'] = 'anmelden';
    this.regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
  }


  resetFeedback() {
    this.validatorL = "";
    this.validatorR = "";
    this.feedBackL = "";
    this.feedBackR = "";

  }

  login() {
    this.resetFeedback();
    if (this.emailLogin.match(this.regex)) {
      this.loginData = {
        "username": "loggingin",
        "email": this.emailLogin,
        "password": this.passwordLogin
      };
      this.rps.postRequest('/api/user/login', this.loginData).map(res => res.json()).subscribe(
        data => this.loginCallback(data),
        // The 2nd callback handles errors.
        (err) => this.errorHandling(err, 'l'),
        // The 3rd callback handles the "complete" event.
        () => this.completeCallback() //
      );
    } else {
      console.log('email wrong');
      this.feedBackL = "Ungültige Email.";
    }
  }

  userData;

  loginCallback(data) {
    console.log(data);
    if (data.message != 'Erfolgreiche Anmeldung.') {
      this.validatorL = data.message;
    } else {
      // this.userData = data['_body'];
      this.sg['user'] = data;
      localStorage.setItem('user', JSON.stringify(data));
      this._router.navigateByUrl('/');
    }

  }

  register() {
    this.resetFeedback();
    if (this.validateRegister()) {
      this.rps.postRequest('/api/user/register', this.registerData).subscribe(
        data => this.registerCallback(data),
        // The 2nd callback handles errors.
        (err) => this.errorHandling(err, 'r'),
        // The 3rd callback handles the "complete" event.
        () => this.completeCallback() //
      );
    } else {
      console.log("register failure");
    }
  }

  registerCallback(data) {
    this.feedBackR = data['_body'];
    if(this.feedBackR.indexOf('Fehler') < 0){
      this.feedBackR = this.feedBackR;
    } else {
      this.validatorR = this.feedBackR;
    }
    console.log(data);
  }

  validateRegister() {
    this.registerData = {};
    if (!this.eMailRegister.match(this.regex)) {
      this.validatorR = "Ungültige Emailadresse.";
      return false;
    }
    if (this.passwordRegister.length < 6) {
      this.validatorR = "Das Passwort muss mindesten 6 Zeichen lang sein.";
      return false;
    }
    if (!this.passwordRegister === this.passwordRegisterRep) {
      this.validatorR = "Passwörter stimmen nicht überein.";
      return false;
    }
    //registerData['email'] = this.eMailRegister;
    if (this.usernameRegister.length < 6 || this.usernameRegister.indexOf('@') >= 0) {
      this.feedBackR = "Der Benutzername soll aus mindestens 6 Buchstaben bestehen und darf kein @ beinhalten.";
      return false;
    }
    this.registerData = {
      "username": this.usernameRegister,
      "email": this.eMailRegister,
      "password": this.passwordRegister
    }
    return true;
  }

  errorHandling(err, mode) {
    if (mode === 'r') {
      this.feedBackR = err;
    } else {
      this.feedBackL = err;
      
    }
  }

  completeCallback() { // validates whether data could be fetched or not
  }

}
