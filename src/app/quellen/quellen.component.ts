import {  Component,  OnInit} from '@angular/core';
import {  ActivatedRoute,  Params,  Router} from '@angular/router';
import {  RestProviderService} from '../rest-provider.service';
import {  SimpleGlobal} from 'ng2-simple-global';

import {  Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-quellen',
  templateUrl: './quellen.component.html',
  styleUrls: ['./quellen.component.css'],
  providers: [RestProviderService]
})

export class QuellenComponent implements OnInit {
  urlListened;
  valid; // flag whether isin is valid or not
  dataContainer; // data of fetchedData
  error;
  fetchedData;
  keyOrder;
  fetchedDataBak;
  keyOrderBak;

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
        this.rps.getRequest('/api/wp/quellen?v=' + this.sg['isin']).subscribe(
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
    this.fetchedData = data['data'];
    this.fetchedDataBak = data['data'];
    this.keyOrder = data['keyOrder'];
  }

  errorHandling(err) {
    console.error("Error: " + err);
    this.valid = false;
    this.error = "Couldn't fetch Information for this ISIN: " + this.sg['isin'] + "!";
  }

  completeCallback(str) { // validates whether data could be fetched or not
    if(str === 'fetchQuellen'){
      console.log(this.keyOrder);
      console.log(this.fetchedData);
      if (this.fetchedData == null || this.keyOrder == null) {
        this.valid = false;
        this.error = "Couldn't fetch Information for this ISIN: " + this.sg['isin'] + "!";
      } else {
        this.valid = true;
      }
    } else if(str === 'quellEntry'){

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

  selectChangeHandler(e){
    console.log(e);
    console.log(e.target.value);
    var str = e.target.value;
    var sar = str.split('_');
    this.rps.getRequest('/api/wp/quellEntry?v=' + this.sg['isin']+'&sqn='+sar[0]+'&srcn='+sar[1]).subscribe(
      data => this.saveQuellData(data),
      // The 2nd callback handles errors.
      (err) => this.errorHandling(err),
      // The 3rd callback handles the "complete" event.
      () => this.completeCallback('quellEntry') //
    );
  }

  saveQuellData(data){
    var fd = this.fetchedData[data.key].entries;
    for(var i = 0; i < fd.length; i++){
      if(fd[i].sqn === data.qe.sqn){
        data.qe.quellen = fd[i].quellen;
        fd[i] = data.qe;
      }
    }
  }

  cutTimestamp(ts) {
    var s = ts.split('.')[0];
    var v = s.split(' ');
    var d = v[0].split('-');
    return (d[2] + '.' + d[1] + '.' + d[0] + ' ' + v[1]);
  }

  //----------------------------------------------------------------------------------------------------------
  // Edit logik 
  //----------------------------------------------------------------------------------------------------------
  

  editToggle
  btAnpassenText

  toogleEdit (st){
    this.editToggle = st;
    this.btAnpassenText = this.editToggle ? 'Abbrechen' : 'Anpassen';
    if(this.editToggle){  // edit mode
      this.btAnpassenText = 'Abbrechen';
    } else {              // view mode
      this.btAnpassenText = 'Anpassen';
      this.fetchedData = this.fetchedDataBak;
      this.search(this.sg['isin']);
    }
    console.log(this.fetchedData);
    console.log(this.fetchedDataBak);
  }

  toggelEditMode(key){
    if(key.toLowerCase()==='isin') return false;
    else return this.editToggle;
  }

  saveEdit(){
    var data = {};
    data['data'] = this.fetchedData;
    data['keyOrder'] = this.keyOrder;
    console.log(data);
    this.rps.postRequest('/api/wp/editInfo2', data).map(res => res.json()).subscribe(
      data => this.saveChangesCallBack(data),
      // The 2nd callback handles errors.
      (err) => this.errorHandling(err),
      // The 3rd callback handles the "complete" event.
      () => this.completeCallback("Post completed.") //
   );
  }

  saveChangesCallBack(data){
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

}
