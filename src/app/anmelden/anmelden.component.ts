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
  validator
  registerData
  loginData
  feedBack

  ngOnInit(): void {
    this.sg['state'] = 'anmelden';
    this.regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
  }

  login() {
    this.validator = "";
    if (this.emailLogin.match(this.regex)) {
      this.loginData = {
        "email" : this.emailLogin,
        "password" : this.passwordLogin
      }
      this.rps.postRequest('/api/account/login', this.loginData).subscribe(
        data => this.loginCallback(data),
        // The 2nd callback handles errors.
        (err) => this.errorHandling(err),
        // The 3rd callback handles the "complete" event.
        () => this.completeCallback() //
       );
    } else {console.log('email wrong');
      this.validator = "Invalid Email.";
    }
  }

  loginCallback(data){
    var obj = JSON.parse(data['_body']);//.toJson();
    console.log("1" + data);
    console.log("2" + obj);
    console.log("3" + obj['message']);
    console.log("4" + obj.message);

    this.feedBack = obj.message;
    console.log(data);
    console.log(this.feedBack);
  }

  register() {
    this.validator = "";
    if (this.validateRegister()) {
      this.rps.postRequest('/api/account/register', this.registerData).subscribe(
        data => this.registerCallback(data),
        // The 2nd callback handles errors.
        (err) => this.errorHandling(err),
        // The 3rd callback handles the "complete" event.
        () => this.completeCallback() //
       );
    } else {
      console.log('email wrongs');
      this.validator = "Invalid Email.";
    }
  }

  registerCallback(data){
    this.feedBack = data['_body'];
    console.log(data);
    console.log(this.feedBack);
  }

  validateRegister() {
    this.registerData = {};
    if (this.eMailRegister.match(this.regex)) {
      //registerData['email'] = this.eMailRegister;
      if(this.passwordRegister.length >= 6 && this.passwordRegister === this.passwordRegisterRep){
        if(this.usernameRegister.length >= 4){
          this.registerData = {
            "username" : this.usernameRegister,
          	"email" : this.eMailRegister,
          	"password" : this.passwordRegister
          }
          return true;
        } else {
          this.validator = "Username has to be at least 4 characters.";
          return false;
        }
      } else {
        this.validator = "Invalid Password (min Length = 6, has to match repeat).";
        return false;
      }
    } else {console.log('email wrong');
      this.validator = "Invalid Email.";
      return false;
    }
  }

  errorHandling(err){
    console.error("Error: "+err);
  }

  completeCallback(){ // validates whether data could be fetched or not
    console.log("Post Completed!");
  }

}
