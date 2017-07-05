import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
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
  prevIsin;

  ngOnInit(): void {  }

  search(searchRequest){
    this.prevIsin = this.isin;
    // hackerish but works
    let str : string = (searchRequest+"");
    this.isin = str.split("/", 3)[2];
    console.log(this.isin);
    // eventListener on Url gets triggered 3 times
    // with this lookup the 2 redundant times are filterted out
    if(this.prevIsin != this.isin)
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

  completeCallback(){ // validates whether data could be fetched or not
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

  constructor(private route: ActivatedRoute,public rps: RestProviderService, private router: Router) {
    this.router.events.subscribe(path  => { this.search(path['url']) }); // eventlistener on url change
 }

}
