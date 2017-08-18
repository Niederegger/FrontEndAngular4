import {  Component,  OnInit} from '@angular/core';
import {  ActivatedRoute,  Params,  Router} from '@angular/router';
import {  RestProviderService} from '../rest-provider.service';
import {  SimpleGlobal} from 'ng2-simple-global';

import {  Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-quellen2',
  templateUrl: './quellen2.component.html',
  styleUrls: ['./quellen2.component.css'],
  providers: [RestProviderService]
})

export class Quellen2Component implements OnInit {
  urlListened;
  valid; // flag whether isin is valid or not
  dataContainer; // data of fetchedData
  error;
  fetchedData;
  keyOrder;
  fetchedDataBak;
  keyOrderBak;

  stammdaten;

  constructor(private route: ActivatedRoute, private rps: RestProviderService, private router: Router, public sg: SimpleGlobal) {
    this.router.events.subscribe(path => {
      this.listenUrl(path['url']);
    }); // eventlistener on url change
  }

  ngOnInit(): void {
    this.sg['state'] = 'quellen';
    this.btAnpassenText = 'Bearbeiten';
    this.fetchedData = this.fetchedDataBak;
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
        this.rps.getRequest('/api/wp/quellenSet?v=' + this.sg['isin']).subscribe(
          data => this.saveCallback(data),
          // The 2nd callback handles errors.
          (err) => this.errorHandling(err),
          // The 3rd callback handles the "complete" event.
          () => this.completeCallback('fetchQuellen') //
        );
      }
    } else {
      this.valid = false;
      this.error = 'ISIN supposed to have a length of 12! Your Input was: "' + this.sg['isin'] + '".';
      console.log('Incorrect Isin length!');
    }
  }

  saveCallback(data){
    console.log(data);
    this.stammdaten = data;
    // todo accumulate values
  }


  errorHandling(err) {
    console.error("Error: " + err);
    this.valid = false;
    this.error = "Couldn't fetch Information for this ISIN: " + this.sg['isin'] + "!";
  }

  completeCallback(str) { // validates whether data could be fetched or not
    if(str === 'fetchQuellen'){
      if (this.stammdaten == null) {
        this.valid = false;
        this.error = "Couldn't fetch Information for this ISIN: " + this.sg['isin'] + "!";
      } else {
        this.valid = true;
      }
    } else if(str === 'fetchFields'){
      this.fReady = true;
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

  adjustUrl(url, amt){
    if(url.length > amt )
      return url.substring(0, amt) + '...';
    else 
      return url;
  }

  setSQN(sqn){
    this.sg['sqn'] = sqn;
  }

  isSelected(a, b){
    return a===b;
  }

  cutTimestamp(ts) {
    var s = ts.split('.')[0];
    var v = s.split(' ');
    var d = v[0].split('-');
    return (d[2] + '.' + d[1] + '.' + d[0] + ' ' + v[1]);
  }

  showVal(key){
    //stammdaten.container[key].sequNum
    if(!this.stammdaten.container[key]){
      return false;
    }
    var seq = this.stammdaten.container[key][0].sequNum;
    for(var i = 0; i < this.stammdaten.seqNums.length; i++){
      if(this.stammdaten.seqNums[i]===seq){
      return true;
      } 
    } return false;
  }

  //----------------------------------------------------------------------------------------------------------
  // Edit logik 
  //----------------------------------------------------------------------------------------------------------
  

  editToggle
  btAnpassenText

  fields;
  fReady;

  fetchFieldNames(){
    this.fReady = false;
    this.rps.getRequest('/api/wp/getFields').subscribe(
          data => this.fieldCallback(data),
          // The 2nd callback handles errors.
          (err) => this.errorHandling(err),
          // The 3rd callback handles the "complete" event.
          () => this.completeCallback('fetchFields') //
        );
  }

  fieldCallback(data){
    console.log(data);
    this.fields = data;
  }

  toogleEdit (st){
    this.editToggle = st;
    this.btAnpassenText = this.editToggle ? 'Abbrechen' : 'Anpassen';
    if(this.editToggle){  // edit mode
      this.fetchFieldNames();
      this.btAnpassenText = 'Abbrechen';
    } else {              // view mode
      this.btAnpassenText = 'Bearbeiten';
      this.fetchedData = this.fetchedDataBak;
      this.search(this.sg['isin']);
    }
  }

  toggelEditMode(key){
    if(key.toLowerCase()==='isin') return false;
    else return this.editToggle;
  }

  saveEdit(){
    this.fields.container['ISIN'][0].str2 = this.sg['isin'];
    console.log(this.fields);
    this.rps.postRequest('/api/wp/pushData', this.fields).subscribe(
      data => this.saveChangesCallBack(data),
      // The 2nd callback handles errors.
      (err) => this.errorHandling(err),
      // The 3rd callback handles the "complete" event.
      () => this.completeCallback("Post completed.") //
   );
  }

  saveChangesCallBack(data){
    console.log(data);
    if(data === null){
      this.valid = false;
      this.error = "Error when saving!";
    } else {
      this.fetchedData = data['data'];
      this.fetchedDataBak = data['data'];
      this.keyOrder = data['keyOrder'];
    }
    this.toogleEdit (false);
  }


  logsome(v){
    console.log(v)
  }
}
