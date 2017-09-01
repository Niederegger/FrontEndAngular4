import { Url } from 'url';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SimpleGlobal } from 'ng2-simple-global';

import { RestProviderService } from '../rest-provider.service';
import { GlobalFunctionService } from '../global-function.service';


@Component({
  selector: 'app-files',
  templateUrl: './publikationen.component.html',
  styleUrls: ['./publikationen.component.css'],
  providers: [RestProviderService, GlobalFunctionService]
})
export class PublikationenComponent implements OnInit {
  fileData;                 // Daten zu den einzelnen Publikationen
  einreichenErrorMsg;       // Fehlermeldung als user Feedback
  fileBezeichnung: string;  // Die Bezeichnung fuer die zu hochladende Datei
  files: FileList;          // Container, enthaellt die ausgewaehlte Datei
  urlListened: boolean;     // flag ob bereits die ISIN aus der URL gelesen wurde

  constructor(
    private _router: Router,
    private rps: RestProviderService,
    private gfs: GlobalFunctionService,
    public sg: SimpleGlobal
  ) {
    // eventlistener on url change
    this._router.events.subscribe(path => { this.listenUrl(path['url']); });
  }

  ngOnInit() {
    this.sg['state'] = 'publikationen';
    this.fetchFiles();
  }

  //-------------------------------------------------------
  // URL-ISIN-Listener
  //-------------------------------------------------------

  listenUrl(url) {
    if (!this.urlListened) {
      this.search(url);
    }
    this.urlListened = true;
  }

  search(Url) {
    if (!this.sg['isin'] || this.sg['prevIsin']) {
      this.sg['prevIsin'] = this.sg['isin'];
      // hackerish but works
      const str: string = (Url + '');
      this.sg['isin'] = str.split('/', 3)[2];
      this.fetchFiles();
    }
  }

  //-------------------------------------------------------
  // Callback
  //-------------------------------------------------------

  completeCallback(st) {
    if (st === 'fetch') {
    } else if (st === 'delete') {
      this.fetchFiles();
    } else if (st === 'upload') {
      this.fetchFiles();
      this.clearInputs();
    }
  }

  errorHandling(err) {
    console.log(err);
    console.log(err.toString());
  }

  //----------------------------------------------------------------------------
  // Fetch
  //----------------------------------------------------------------------------
  fetchFiles() {
    this.rps.getRequest('/api/file/fetchFileData?isin=' + this.sg['isin'])
      .subscribe(
      data => this.fetchFilesCallback(data),
      (err) => this.errorHandling(err),
      () => this.completeCallback('fetch')
      );
  }

  fetchFilesCallback(data) {
    this.fileData = data;
  }

  //----------------------------------------------------------------------------
  // Remove
  //----------------------------------------------------------------------------
  removeFile(fileName, timeStamp) {
    this.rps.postRequest('/api/file/remove', { 'str1': fileName, 'str2': timeStamp, })
      .subscribe(
      data => this.removeFileCallback(data),
      (err) => this.errorHandling(err),
      () => this.completeCallback('delete')
      );
  }

  removeFileCallback(data){
    // console.log(data.toString())
  }

  //----------------------------------------------------------------------------
  // Upload
  //----------------------------------------------------------------------------
  upload() {
    this.einreichenErrorMsg = '';
    if (this.validateUpload()) {
      this.rps.postFile('/api/file/uploadFile', this.prepareUploadData()).subscribe(
        data => this.uploadCallback(data),
        (err) => this.errorHandling(err),
        () => this.completeCallback('upload')
        );
    }
  }

  uploadCallback(data) {
  }

  validateUpload() {
    if (!this.sg['isin']) {
      this.einreichenErrorMsg = 'Es ist gerade keine ISIN bekannt, bitte suchen Sie erneut.';
      return false;
    }
    if (this.files == null) {
      this.einreichenErrorMsg = 'Es wurde keine Datei ausgewählt.';
      return;
    } else if (this.files[0] == null) {
      this.einreichenErrorMsg = 'Es wurde keine Datei ausgewählt.';
      return;
    }
    if (this.fileBezeichnung == null || this.fileBezeichnung.length < 3) {
      this.einreichenErrorMsg = 'Bitte geben Sie eine Bezeichnung an (zB: Factsheet).';
      return false;
    }
    return true;
  }

  prepareUploadData() {
    const formData = new FormData();
    formData.append('file', this.files[0]);
    formData.append('isin', this.sg['isin']);
    formData.append('dataOrigin', this.fileBezeichnung);
    formData.append('user', JSON.stringify(this.sg['user']));
    return formData;

  }

  clearInputs() {
    this.fileBezeichnung = '';
  }

  //----------------------------------------------------------------------------
  // UI-Functions
  //----------------------------------------------------------------------------
  // Diese Funktionen dienen den Inhalt des Dateien-Selects zu extrahieren
  getFiles(event) {
    this.files = event.target.files;
  }
}
