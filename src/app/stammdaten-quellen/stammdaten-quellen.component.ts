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
  loading = false;          // Flag ob eine Ladeanimation angezeigt werden soll oder nicht

  constructor(
    private route: ActivatedRoute,
    private rps: RestProviderService,
    private router: Router,
    public sg: SimpleGlobal,
    public gfs: GlobalFunctionService
  ) {
    this.loading = true;
    this.route.params.subscribe( params => {this.sg['isin'] = params.v; this.sg['sqn'] = params.w} );
    this.fetchStammdatenQuellen();
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    this.sg['state'] = 'quellen';
    this.loading = false;
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
    this.loading = false;
    if (this.fetchedData) {
      this.valid = true;
    }
  }

  //-------------------------------------------------------
  // BackEndCalls
  //-------------------------------------------------------

  fetchStammdatenQuellen() {
    this.loading = true;
    if (this.validateFetchStammdaten()) {
      this.rps.getRequest('/api/wp/quellenAnsehen?v=' + this.sg['isin'] + '&s=' + this.sg['sqn']).subscribe(
        data => this.saveCallback(data),
        (err) => this.errorHandling(err),
        () => this.completeCallback()
      );
    }
  }

  validateFetchStammdaten() {
    this.loading = true;
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
