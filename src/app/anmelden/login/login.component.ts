import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { Router } from '@angular/router';
import { RestProviderService } from '../../rest-provider.service';
import { GlobalFunctionService } from '../../global-function.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RestProviderService, GlobalFunctionService]
})
export class LoginComponent implements OnInit {

  // Login Variables
  loginEmail;            // container fuer login->email
  loginPassword;         // container fuer login->password
  loginSuccessMsg;       // Zeigt feedback beim Login an (Erfolgreich, wird nciht gesehen, wegen redirect)
  loginErrorMsg;         // Zeigt error beim Login an
  loginData;             // wird fuer den post an restapi genutzt

  constructor(
    private sg: SimpleGlobal,
    private _router: Router,
    private rps: RestProviderService,
    private gfs: GlobalFunctionService
  ) { }

  ngOnInit() { }

  //-------------------------------------------------------
  // Login
  //-------------------------------------------------------

  login() {
    this.resetFeedback();
    if (this.loginValidation()) {
      this.rps.postRequest('/api/user/login', this.loginData).map(res => res.json()).subscribe(
        data => this.loginCallback(data),
        (err) => this.errorHandling(err, 'login'),
        () => this.completeCallback('login')
      );
    }
  }

  loginCallback(data) {
    // validiere Post-Feedback
    if (data.message !== 'Erfolgreiche Anmeldung.') {
      this.loginErrorMsg = data.message;
    } else { // kein Error -> Anmeldung erfolgreich
      this.sg['user'] = data;
      localStorage.setItem('user', JSON.stringify(data));
      this._router.navigateByUrl('/');
    }
  }

  // validiert alle Felder bevor Daten gesendet werden
  loginValidation() {
    // E-Mail Adresse Validierung
    if (!this.gfs.isEmail(this.loginEmail)) {
      this.loginErrorMsg = 'Ungültige E-Mail Adresse.';
      return false;
    }
    // Validierung erfolrgreich -> buendeln von Daten in ein Packet
    this.loginData = {
      'username': 'loggingin',
      'email': this.loginEmail,
      'password': this.loginPassword
    };
    return true;
  }

  // resettet FeedBack Variablen
  resetFeedback() {
    this.loginErrorMsg = '';
    this.loginSuccessMsg = '';
  }

  
  errorHandling(err, mode) {
    if (mode === 'login') {
      this.loginErrorMsg = err;
    }
  }

  completeCallback(state) { }
}
