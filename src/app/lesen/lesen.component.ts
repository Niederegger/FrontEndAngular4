import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
// import { Location }                 from '@angular/common';
import { RestProviderService } from "../rest-provider.service";

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-lesen',
  templateUrl: './lesen.component.html',
  styleUrls: ['./lesen.component.css'],
  providers: [RestProviderService]
})
export class LesenComponent implements OnInit {

  fetchedData;    // return value of rest request
  isin;           // current showing isin values
  error;          // errorMessage
  valid;          // flag whether isin is valid or not
  keyOrder;       // keyOrder of fetchedData
  dataContainer;  // data of fetchedData
  clientIP;

  ngOnInit(): void {
    console.log(this.isin);
    if (this.isin.length == 12) {
      this.rps.getRequest('/api/wp/info?v=' + this.isin).subscribe(
        data => this.fetchedData = data,
        // The 2nd callback handles errors.
        (err) => this.errorHandling(err),
        // The 3rd callback handles the "complete" event.
        () => this.completeCallback() //
     );
   } else {
     this.valid = false;
     this.error = 'ISIN supposed to have a length of 12! Your Input was: "'+this.isin+'".';
     console.log('Incorrect Isin length!');
   }
  }

  errorHandling(err){
    console.error("Error: "+err);
    this.valid = false;
    this.error = "Couldn't fetch Information for this ISIN: " + this.isin + "!";
  }

  completeCallback(){
    if (this.fetchedData['keyOrder'] == null) {
      this.valid = false;
      this.error = "Couldn't fetch Information for this ISIN: " + this.isin + "!";
    } else {
      this.valid = true;
      this.keyOrder = this.fetchedData['keyOrder'];
      this.dataContainer = this.fetchedData['data'];
    }
  }

  validUrl(content) {
    var re = new RegExp("http(s?)://www.");
    if (content.match(re)) {
      return true;
    } else {
      return false;
    }
  }

  constructor(private route: ActivatedRoute,public rps: RestProviderService) {
    this.route.params.subscribe( params => this.isin = params['v'] );
 }

}
