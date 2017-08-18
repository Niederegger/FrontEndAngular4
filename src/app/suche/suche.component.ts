import { Component, OnInit } from '@angular/core';
import { RestProviderService } from "../rest-provider.service";
import { Router } from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-suche',
  templateUrl: './suche.component.html',
  styleUrls: ['./suche.component.css'],
  providers: [RestProviderService]
})
export class SucheComponent implements OnInit {
  val;       // stores isin input
  loader;    // stores status

  results;   // stores autocomplete result

  constructor(
    private restProviderServ: RestProviderService,
    private _router: Router,
    public sg: SimpleGlobal) {    }

  keyEvent() {
    if (this.sg["isin"].length > 0 && this.sg["isin"].length <= 12) {
      this.restProviderServ.getRequest('/api/wp/isinAC?v=' + this.sg["isin"] + '&amt=7').subscribe(
          data => this.results = data
      );
    }
  }

  gotoDetail() {
    console.log(this.sg["isin"]);
    this.sg["isin"] = this.sg["isin"].trim();
    console.log(this.sg["isin"]);
    if (this.sg["isin"].length == 12 || this.sg["isin"].length == 6) {
      // this.sg["isin"] = this.val;
      this._router.navigateByUrl('/stammdaten/'+this.sg["isin"]);
   } else {
     this.loader = 'ISIN has to have a length of 12!';
   }
  }

  ngOnInit(): void {
  }

}
