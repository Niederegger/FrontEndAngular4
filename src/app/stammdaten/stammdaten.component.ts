import {  Component,  OnInit} from '@angular/core';
import {  ActivatedRoute,  Params,  Router} from '@angular/router';
import {  RestProviderService} from '../rest-provider.service';
import {  SimpleGlobal} from 'ng2-simple-global';

import {  Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-stammdaten',
  templateUrl: './stammdaten.component.html',
  styleUrls: ['./stammdaten.component.css'],
  providers: [RestProviderService]
})
export class StammdatenComponent implements OnInit {

  urlListened;
  stmDaten;
  fetchedData; // return value of rest request
  error; // errorMessage
  valid; // flag whether isin is valid or not
  keyOrder; // keyOrder of fetchedData
  dataContainer; // data of fetchedData
  rawData;
  shownData;

  constructor(private route: ActivatedRoute, private rps: RestProviderService, private router: Router, public sg: SimpleGlobal) {
    this.router.events.subscribe(path => {
      this.listenUrl(path['url']);
    }); // eventlistener on url change
  }

  ngOnInit() {
    this.sg['state'] = 'stammdaten';
  }



  listenUrl(asd) {
    if (!this.urlListened) {
      this.search(asd)
    }
    this.urlListened = true;
  }

  search(searchRequest) {
    if (!this.sg['isin'] || this.sg['prevIsin']) {
      this.sg['prevIsin'] = this.sg['isin'];
      // hackerish but works
      let str: string = (searchRequest + '');
      this.sg['isin'] = str.split('/', 3)[2];
    }
    // eventListener on Url gets triggered 3 times
    // with this lookup the 2 redundant times are filterted out
    if (this.sg['prevIsin'] != this.sg['isin']) {
      if (this.sg['isin'].length == 12 || this.sg['isin'].length == 6) {
        this.rps.getRequest('/api/wp/Stammdaten?v=' + this.sg['isin']).subscribe(
          data => this.fetchedData = data,
          // The 2nd callback handles errors.
          (err) => this.errorHandling(err),
          // The 3rd callback handles the "complete" event.
          () => this.completeCallback() //
        );
      }
    } else {
      this.valid = false;
      this.error = 'ISIN supposed to have a length of 12! Your Input was: "' + this.sg['isin'] + '".';
      console.log('Incorrect Isin length!');
    }
  }

  errorHandling(err) {
    console.error("Error: " + err);
    this.valid = false;
    this.error = "Couldn't fetch Information for this ISIN: " + this.sg['isin'] + "!";
  }

  completeCallback() { // validates whether data could be fetched or not
    if (this.fetchedData['keyOrder'] == null) {
      this.valid = false;
      this.error = "Couldn't fetch Information for this ISIN: " + this.sg['isin'] + "!";
    } else {
      this.valid = true;
      this.keyOrder = this.fetchedData['keyOrder'];
      this.dataContainer = this.fetchedData['data'];
      this.sg['fetchedData'] = this.fetchedData;
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

}
