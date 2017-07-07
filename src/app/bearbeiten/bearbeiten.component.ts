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

  constructor(public sg: SimpleGlobal,private _router: Router, private rps : RestProviderService) { }

  ngOnInit(): void {
    if(!this.sg['isin']){
      this.sg["error"] = 'Error: Bearbeiten: No ISIN selected.';
      this._router.navigateByUrl('/');
    }
    this.sg['state'] = 'bearbeiten';
    if(this.sg['fetchedData']){
      this.dataEdit = this.sg['fetchedData'];
      this.splitData();
    } else {
      this.sg["error"] = 'Overhead: Bearbeiten: not implemented yet.';
      this._router.navigateByUrl('/');
    }
  }

  splitData(){
    this.keyOrder = this.dataEdit['keyOrder'];
    console.log(this.keyOrder);
    this.dataContainer = this.dataEdit['data'];
    console.log(this.dataContainer);
  }

  saveChanges(){
    console.log(this.dataContainer);
    this.dataEdit['data'] = this.dataContainer;
    this.rps.postRequest('/api/wp/editInfo', this.dataEdit).subscribe(
      data => console.log(data),
      // The 2nd callback handles errors.
      (err) => this.errorHandling(err),
      // The 3rd callback handles the "complete" event.
      () => this.completeCallback() //
   );
  }

  errorHandling(err){
    console.error("Error: "+err);
  }

  completeCallback(){ // validates whether data could be fetched or not
    console.log("Post Completed!");
  }

}
