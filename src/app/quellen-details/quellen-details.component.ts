import {  Component,  OnInit} from '@angular/core';
import {  ActivatedRoute,  Params,  Router} from '@angular/router';
import {  RestProviderService} from '../rest-provider.service';
import {  SimpleGlobal} from 'ng2-simple-global';

import {  Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-quellen-details',
  templateUrl: './quellen-details.component.html',
  styleUrls: ['./quellen-details.component.css'],
  providers: [RestProviderService]
})
export class QuellenDetailsComponent implements OnInit {
  urlListened;
  valid;
  error;
  fetchedData;

  constructor(private route: ActivatedRoute, private rps: RestProviderService, private router: Router, public sg: SimpleGlobal) {
    this.router.events.subscribe(path => {
      this.listenUrl(path['url']);
    }); // eventlistener on url change
  }

  ngOnInit(): void {
    this.sg['state'] = 'quellen';
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
      var strspl = str.split('/');
      this.sg['isin'] = strspl[2];
      this.sg['sqn'] = strspl[4];
    }
    // eventListener on Url gets triggered 3 times
    // with this lookup the 2 redundant times are filterted out
    if (this.sg['prevIsin'] != this.sg['isin'] && this.sg['sqn'] != null || this.sg['sqn'] != "") {
      if (this.sg['isin'].length == 12 || this.sg['isin'].length == 6) {
        this.rps.getRequest('/api/wp/quellenAnsehen?v=' + this.sg['isin'] + '&s=' + this.sg['sqn']).subscribe(
          data => this.saveCallback(data),
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

  saveCallback(data){
    this.fetchedData = data;
  }

  errorHandling(error){
    console.log(error);  
  }

  completeCallback(){
    if(this.fetchedData){
      this.valid = true;
    }
  }

  validUrl(content) {
    var re = new RegExp("http(s?)");
    if (content.match(re)) {
      return true;
    } else {
      return false;
    }
  }

  cutTimestamp(ts) {
    var s = ts.split('.')[0];
    var v = s.split(' ');
    var d = v[0].split('-');
    return (d[2] + '.' + d[1] + '.' + d[0] + ' ' + v[1]);
  }

}
