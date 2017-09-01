import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { Router } from '@angular/router';
import { RestProviderService } from '../../rest-provider.service';
import { GlobalFunctionService } from '../../global-function.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RestProviderService, GlobalFunctionService]
})
export class RegisterComponent implements OnInit {

  // Register Variables
  registerUsername;      // container fuer login->Benutzername
  registerEmail;         // container fuer login->email
  registerPassword;      // container fuer login->password
  registerPasswordRep;   // container fuer login->passwordWiederholung
  registerSuccessMsg;    // Zeigt feedback beim Registrieren an "Erfolgreich: bestätigen Sie ihre Email"
  registerErrorMsg;      // Zeigt error beim Registrieren an
  registerData;          // wird fuer den post an restapi genutzt


  constructor(
    private sg: SimpleGlobal,
    private _router: Router,
    private rps: RestProviderService,
    private gfs: GlobalFunctionService
  ) { }

  ngOnInit() { }

  //-------------------------------------------------------
  // Register
  //-------------------------------------------------------

  register() {
    this.resetFeedback();
    if (this.validateRegister()) {
      this.rps.postRequest('/api/user/register', this.registerData).subscribe(
        data => this.registerCallback(data),
        (err) => this.errorHandling(err, 'register'),
        () => this.completeCallback('register')
      );
    }
  }

  registerCallback(data) {
    this.registerSuccessMsg = data['_body'];
    // fallse kein Fehler zurueckgegeben wurde vom Callback
    if (this.registerSuccessMsg.indexOf('Fehler') < 0) {
      // war die Registrierung erfolgreich
      this.registerSuccessMsg = this.registerSuccessMsg;
    } else {
      // ansonsten zeige die Error Message
      this.registerErrorMsg = this.registerSuccessMsg;
    }
  }

  validateRegister() {
    // E-Mail Adresse Validierung
    this.registerData = {};
    if (!this.gfs.isEmail(this.registerEmail)) {
      this.registerErrorMsg = 'Ungültige E-Mail Adresse.';
      return false;
    }
   // Passwortlaenge Validierung
   if (this.registerPassword.length < 6) {
      this.registerErrorMsg = 'Das Passwort muss mindesten 6 Zeichen lang sein.';
      return false;
    }
    // Passwortmatch Validierung
    if (!this.registerPassword === this.registerPasswordRep) {
      this.registerErrorMsg = 'Passwörter stimmen nicht überein.';
      return false;
    }
    // Benutzername Validierung
    if (this.registerUsername.length < 6 || this.registerUsername.indexOf('@') >= 0) {
      this.registerSuccessMsg = 'Der Benutzername soll aus mindestens 6 Buchstaben bestehen und darf kein @ beinhalten.';
      return false;
    }
    // Validierung erfolrgreich -> buendeln von Daten in ein Packet
    this.registerData = {
      'username': this.registerUsername,
      'email': this.registerEmail,
      'password': this.registerPassword
    };
    return true;
  }

  resetFeedback() {
    this.registerErrorMsg = '';
    this.registerSuccessMsg = '';
  }

  errorHandling(err, mode) {
    if (mode === 'register') {
      this.registerErrorMsg = err;
    }
  }

  completeCallback(state) {}
}
