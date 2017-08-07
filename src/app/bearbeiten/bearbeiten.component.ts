import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {SimpleGlobal} from 'ng2-simple-global';
import { RestProviderService } from "../rest-provider.service";

@Component({
  selector: 'app-bearbeiten',
  templateUrl: './bearbeiten.component.html',
  styleUrls: ['./bearbeiten.component.css'],
  providers: [RestProviderService]
})
export class BearbeitenComponent implements OnInit {

  dataEdit
  keyOrder
  dataContainer
  dataSource
  editToggle
  btAnpassenText

  constructor(public sg: SimpleGlobal,private _router: Router, private rps : RestProviderService) {
    this._router.events.subscribe(path  => { this.listenUrl(path['url']) }); // eventlistener on url change
  }

  validUrl(content) {
    var re = new RegExp("http(s?)://www.");
    if (content.match(re)) {
      return true;
    } else {
      return false;
    }
  }

  toggleEdit(){
    this.editToggle = !this.editToggle;
    if(this.editToggle) this.btAnpassenText = "Abbrechen";
    else this.btAnpassenText = "Bearbeiten";
  }

  urlListened
  listenUrl(asd){
    if(!this.sg['fetchedData']){
      if(!this.urlListened){
        this.search(asd)
      }
    }

    this.urlListened = true;
  }

  ngOnInit(): void {
    this.editToggle = false;
    this.btAnpassenText = "Bearbeiten";

    this.urlListened = false;
    // if(!this.sg['isin']){
    //   this.sg["error"] = 'Error: Bearbeiten: No ISIN selected.';
    //   this._router.navigateByUrl('/');
    // }
    this.sg['state'] = 'bearbeiten';
    if(this.sg['fetchedData']){
      this.dataEdit = this.sg['fetchedData'];
      this.splitData();
    }
    this.getDataSource(false);
  }

  getDataSource(sw){
    console.log('sw ' + sw);
    if(this.sg['isin']){
      this.rps.getRequest('/api/wp/distinctSources?v=' + this.sg['isin']).subscribe(
          data => this.setupDataSource(data, sw)
      );
    }
  }

  setupDataSource(data, sw){
    this.dataSource = data['container'];
    console.log("sw->" + sw)
    if(!this.sg['currentSource'] || sw){
      this.switchSource(this.dataSource[0]);
    }
  }

  splitData(){
    this.keyOrder = this.dataEdit['keyOrder'];
    console.log(this.keyOrder);
    this.dataContainer = this.dataEdit['data'];
    console.log(this.dataContainer);
  }

  saveChanges(){
    this.dataEdit['data'] = this.dataContainer;
    this.rps.postRequest('/api/wp/editInfo', this.dataEdit).map(res => res.json()).subscribe(
      data => this.saveChangesCallBack(data),
      // The 2nd callback handles errors.
      (err) => this.errorHandling(err),
      // The 3rd callback handles the "complete" event.
      () => this.completeCallback("Post completed.") //
   );
  }

  saveChangesCallBack(data){
    if(data != null ){
      this.toggleEdit();
      console.log('sccb');
      this.getDataSource(true);
    }
  }

  errorHandling(err){
    console.error("Error: "+err);
  }

  completeCallback(msg){ // validates whether data could be fetched or not
    // if(msg == "Post completed."){
    //   this.getDataSource(true);
    // }
    console.log(msg);
  }

  search(searchRequest){
    if(!this.sg['isin'] || this.sg['prevIsin']){
      this.sg['prevIsin'] = this.sg['isin'];
      // hackerish but works
      let str : string = (searchRequest+"");
      this.sg['isin'] = str.split("/", 3)[2];
    }
    // eventListener on Url gets triggered 3 times
    // with this lookup the 2 redundant times are filterted out
    if(this.sg['prevIsin'] != this.sg['isin']){
        if (this.sg['isin'].length == 12 || this.sg['isin'].length == 6) {
        this.rps.getRequest('/api/wp/info?v=' + this.sg['isin']).subscribe(
          data => this.writeToFetched(data),
          // The 2nd callback handles errors.
          (err) => this.errorHandling(err),
          // The 3rd callback handles the "complete" event.
          () => this.completeCallback("Feteched info") //
        );
      } else {
      this._router.navigateByUrl('/');
      }
    }
  }

  writeToFetched(data){
    this.sg['fetchedData'] = data;
      this.dataEdit = this.sg['fetchedData'];
      this.splitData();
      this.getDataSource(false);
  }

  currentDS;

  switchSource(ds){
    this.sg['currentSource'] = ds.source + " " + ds.timestamp;
  }

  isSel(ds){
    if(ds != null && this.sg['currentSource'] == (ds.source + " " + ds.timestamp)){
      return 'selRow';
    } else return "";
  }

  cutTimestamp(ts) {
    var s = ts.split('.')[0];
    var v = s.split(' ');
    var d = v[0].split('-');
    return (d[2] + '.' + d[1] + '.' + d[0] + ' ' + v[1]);
  }
}
