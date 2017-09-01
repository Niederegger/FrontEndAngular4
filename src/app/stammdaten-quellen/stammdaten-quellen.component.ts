import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SimpleGlobal } from 'ng2-simple-global';

import { RestProviderService } from '../rest-provider.service';
import { GlobalFunctionService } from '../global-function.service';

@Component({
  selector: 'app-stammdaten-quellen',
  templateUrl: './stammdaten-quellen.component.html',
  styleUrls: ['./stammdaten-quellen.component.css'],
  providers: [RestProviderService, GlobalFunctionService]
})
export class StammdatenQuellenComponent implements OnInit {
  urlListened: boolean;   // flag ob bereits die ISIN aus der URL gelesen wurde
  valid;                  // flag ob bereits gueltige daten vom server erhalten worden sind
  error;                  // Error Message
  fetchedData;            // speichern des ResultSets vom BackEndServer

  constructor(
    private route: ActivatedRoute,
    private rps: RestProviderService,
    private router: Router,
    public sg: SimpleGlobal,
    public gfs: GlobalFunctionService
  ) {
    this.router.events.subscribe(path => {
      this.listenUrl(path['url']);
    });
  }

  ngOnInit(): void {
    this.sg['state'] = 'quellen';
  }

  //-------------------------------------------------------
  // URL-ISIN-Listener
  //-------------------------------------------------------

  listenUrl(asd) {
    if (!this.urlListened) {
      this.search(asd)
    }
    this.urlListened = true;
  }

  search(searchRequest) {
    if (!this.sg['isin'] || this.sg['prevIsin']) {
      this.sg['prevIsin'] = this.sg['isin'];
      const str: string = (searchRequest + '');
      const strspl = str.split('/');
      this.sg['isin'] = strspl[2];
      this.sg['sqn'] = strspl[4];
      this.fetchStammdatenQuellen();
    }
  }

  //-------------------------------------------------------
  // CallBack
  //-------------------------------------------------------

  saveCallback(data) {
    this.fetchedData = data;
  }

  errorHandling(error) {
    console.log(error);
  }

  completeCallback() {
    if (this.fetchedData) {
      this.valid = true;
    }
  }

  //-------------------------------------------------------
  // BackEndCalls
  //-------------------------------------------------------

  fetchStammdatenQuellen() {
    if (this.validateFetchStammdaten()) {
      this.rps.getRequest('/api/wp/quellenAnsehen?v=' + this.sg['isin'] + '&s=' + this.sg['sqn']).subscribe(
        data => this.saveCallback(data),
        (err) => this.errorHandling(err),
        () => this.completeCallback()
      );
    }
  }

  validateFetchStammdaten() {
    if (!(this.sg['isin'].length === 12 || this.sg['isin'].length === 6)) {
      this.error = 'Der Suchbegriff ist weder eine ISIN noch eine WKN';
      this.valid = false;
      return false;
    }
    if (this.sg['prevIsin'] !== this.sg['isin']) {
      return true;
    }
  }

}
