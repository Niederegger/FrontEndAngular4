import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable }                     from 'rxjs/Observable';

import { SimpleGlobal }                   from 'ng2-simple-global';

import { RestProviderService }            from '../rest-provider.service';
import { GlobalFunctionService }          from '../global-function.service';

@Component({
  selector: 'app-stammdaten',
  templateUrl: './stammdaten.component.html',
  styleUrls: ['./stammdaten.component.css'],
  providers: [RestProviderService, GlobalFunctionService]
})

export class StammdatenComponent implements OnInit {
  urlListened: boolean;     // flag ob bereits die ISIN aus der URL gelesen wurde
  valid;                    // flag whether isin is valid or not
  error;                    // Erro MEssage
  keyOrder;                 // Reihenfolge der Felder
  stammdaten;               // Container fuer die INformationen, geladen vom BackEnd zu dieser ISIN
  editToggle;               // wenn wahr -> editmode wenn falsch -> view mode
  btAnpassenText;           // Text Fuer den Button, welcher Edit/View Mode toggled
  fields;                   // Container fuer den FetchFieldResult
  fReady;                   // boolean flag die anzeigt ob die Feld Definitionen bereits angekommen sind

  constructor(
    private route: ActivatedRoute,
    private rps: RestProviderService,
    private router: Router,
    public sg: SimpleGlobal,
    private gfs: GlobalFunctionService,
  ) {
    this.router.events.subscribe(path => {
      this.listenUrl(path['url']);
    }); // eventlistener on url change
  }

  ngOnInit(): void {
    this.sg['state'] = 'quellen';
    this.btAnpassenText = 'Bearbeiten';
  }

  //-------------------------------------------------------
  // URL-ISIN-Listener
  //-------------------------------------------------------

  listenUrl(asd) {
    if (!this.urlListened) {
      this.search(asd);
    }
    this.urlListened = true;
  }

  search(Url) {
    if (!this.sg['isin'] || this.sg['prevIsin']) {
      this.sg['prevIsin'] = this.sg['isin'];
      // hackerish but works
      const str: string = (Url + '');
      this.sg['isin'] = str.split('/', 3)[2];
      this.fetchStammdaten();
    }
  }

  //-------------------------------------------------------
  // CallBack
  //-------------------------------------------------------

  errorHandling(err, state) {
    if (state === '') {
      this.valid = false;
      this.error = 'Es wurden keine Informationen zur folgenden Suche gefunden: ' + this.sg['isin'] + '!';
    }
  }

  completeCallback(str) {
    if (str === 'fetchStammdaten') {
      if (this.stammdaten == null) {
        this.valid = false;
        this.error = 'Es wurden keine Informationen zur folgenden Suche gefunden: ' + this.sg['isin'] + '!';
      } else {
        this.valid = true;
      }
    } else if (str === 'fetchFieldNames') {
      this.fReady = true;
    } else if (str === 'saveEdit'){

    }
  }

  //-------------------------------------------------------
  // BackEndCalls
  //-------------------------------------------------------

  //-------------------------------------------------------
  // Stammdaten
  //-------------------------------------------------------
  fetchStammdaten() {
    if (this.validateFetchStammdaten()) {
      this.rps.getRequest('/api/wp/quellenSet?v=' + this.sg['isin']).subscribe(
        data => this.saveCallback(data),
        (err) => this.errorHandling(err, 'fetchStammdaten'),
        () => this.completeCallback('fetchStammdaten')
      );
    }
  }

  validateFetchStammdaten() {
    if (!(this.sg['isin'].length === 12 || this.sg['isin'].length === 6)) {
      this.valid = false;
      return false;
    }
    if (this.sg['prevIsin'] !== this.sg['isin']) {
      return true;
    }
  }

  saveCallback(data) {
    this.stammdaten = data;
  }

  //-------------------------------------------------------
  // FieldNames
  //-------------------------------------------------------
  fetchFieldNames() {
    this.fReady = false;
    this.rps.getRequest('/api/wp/getFields').subscribe(
      data => this.fetchFielCallback(data),
      (err) => this.errorHandling(err, 'FetchFieldNames'),
      () => this.completeCallback('fetchFieldNames')
    );
  }

  fetchFielCallback(data) {
    this.fields = data;
  }
  //-------------------------------------------------------
  // Edit
  //-------------------------------------------------------
  saveEdit() {
    this.fields.container['ISIN'][0].str2 = this.sg['isin'];
    this.fields.user = this.sg['user'];
    this.rps.postRequest('/api/wp/pushData', this.fields).subscribe(
      data => this.saveEditCallBack(data),
      (err) => this.errorHandling(err, 'saveEdit'),
      () => this.completeCallback('saveEdit')
    );
  }
  saveEditCallBack(data) {
    if (data === null) {
      this.valid = false;
      this.error = 'Bearbeitung konnte nicht durchgeführt werden.';
    } else {
      this.stammdaten = data['data'];
      this.keyOrder = data['keyOrder'];
    }
    this.toogleEdit(false);
  }

  //----------------------------------------------------------------------------------------------------------
  // UI-Functions
  //----------------------------------------------------------------------------------------------------------
  toogleEdit(st) {
    this.editToggle = st;
    this.btAnpassenText = this.editToggle ? 'Abbrechen' : 'Bearbeiten';
    if (this.editToggle) {  // edit mode
      this.btAnpassenText = 'Abbrechen';
      this.fetchFieldNames();
    } else {              // view mode
      this.btAnpassenText = 'Bearbeiten';
      this.fetchStammdaten();
    }
  }

  toggelEditMode(key) {
    if (key.toLowerCase() === 'isin') {
      return false;
    } else {
      return this.editToggle;
    }
  }

  // dient als hilfe fuer html angula anzeige
  showVal(key) {
    if (!this.stammdaten.container[key]) {
      return false;
    }
    const seq = this.stammdaten.container[key][0].sequNum;
    for (let i = 0; i < this.stammdaten.seqNums.length; i++) {
      if (this.stammdaten.seqNums[i] === seq) {
        return true;
      }
    } return false;
  }
}
