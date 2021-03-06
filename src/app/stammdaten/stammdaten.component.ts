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
  loading = false;          // Flag ob eine Ladeanimation angezeigt werden soll oder nicht

  sfAnzeigen = false;
  sfText = "Anzeige Anpassen";
  mapped;
  unmapped;

  constructor(
    private route: ActivatedRoute,
    private rps: RestProviderService,
    private router: Router,
    public sg: SimpleGlobal,
    private gfs: GlobalFunctionService,
  ) {
    this.loading = true;
    this.editToggle = false;
    this.route.params.subscribe( params => this.sg['isin'] = params.v);
    this.fetchStammdaten();
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    this.urlListened = false;
    this.editToggle = false;
    this.sg['state'] = 'quellen';
    this.btAnpassenText = 'Bearbeiten';
    this.loading = false;
  }

  //-------------------------------------------------------
  // CallBack
  //-------------------------------------------------------

  errorHandling(err, state) {
    if (state === 'fetchStammdaten') {
      this.valid = false;
      this.error = 'Es wurden keine Informationen zur folgenden Suche gefunden: ' + this.sg['isin'] + '!';
    } else if(state === 'fetchStammdaten'){

    } else if(state === 'saveEdit'){
      
    }
  }

  completeCallback(str) {
    this.loading = false;
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
      this.loading = true;
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
    return true;
  }

  saveCallback(data) {
    this.stammdaten = data;
  }

  //-------------------------------------------------------
  // FieldNames
  //-------------------------------------------------------
  fetchFieldNames() {
    this.fReady = false;
    this.loading = true;
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
    this.loading = true;
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
  //-------------------------------------------------------
  // SourceFields
  //-------------------------------------------------------
  fetchMappings() {
    if (!this.sg['user']) { return; }
    if(!this.sfAnzeigen){
      this.loading = true;
      this.rps.getRequest('/api/wp/mappings?v=' + this.sg['isin']).subscribe(
        data => this.saveSourceFieldsCallBack(data),
        (err) => this.errorHandling(err, 'fetchMappings'),
        () => this.completeCallback('fetchMappings')
      );
    } else {
      this.sfAnzeigen = false;
      this.sfText = "Mapping anpassen";
    }
  }

  saveSourceFieldsCallBack(data){
    if(data != null){
      this.mapped  =data.mapped;
      this.unmapped  =data.unmapped;
    } 
    this.sfText = "Mapping verbergen";
    this.sfAnzeigen = true;
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

  viewStammdaten() {
    if (!this.editToggle) {
      if (!this.stammdaten) {
        this.fetchStammdaten();
      }
      return true;
    }
    return false;
  }
}
