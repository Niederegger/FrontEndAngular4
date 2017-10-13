import { Component, OnInit } from '@angular/core';

import { SimpleGlobal } from 'ng2-simple-global';

import { RestProviderService } from '../rest-provider.service';
import { GlobalFunctionService } from '../global-function.service';


@Component({
  selector: 'app-datei-einreichen',
  templateUrl: './datei-einreichen.component.html',
  styleUrls: ['./datei-einreichen.component.css'],
  providers: [RestProviderService, GlobalFunctionService]
})
export class DateiEinreichenComponent implements OnInit {
  fileData;                   // Daten zu den einzelnen Publikationen
  files:        FileList;     // Container, enthaellt die ausgewaehlte Datei
  unternehmen:  string;       // Name des Unternehmens
  beschreibung: string;       // Beschreibung zur datei
  feedback:     string;       // feedback an den User 
  loading = false;            // Flag ob eine Ladeanimation angezeigt werden soll oder nicht

  constructor(
    private rps: RestProviderService,
    private gfs: GlobalFunctionService,
    public sg: SimpleGlobal
  ) {

  }

  ngOnInit() {
    this.sg['state'] = 'datei-einreichen';
    this.fetchFiles();
  }

  //-------------------------------------------------------
  // Callback
  //-------------------------------------------------------

  completeCallback(st) {
    this.loading = false;
    if (st === 'fetch') {
    } else {
      this.fetchFiles();
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
    this.loading = true;
    this.rps.getRequest('/api/file/fetchFiles?isin=XXXXXXXXXXXX&user=' + this.sg['user'].token)
      .subscribe(
      data => this.fetchFilesCallback(data),
      (err) => this.errorHandling(err),
      () => this.completeCallback('fetch')
      );
  }

  fetchFilesCallback(data) {
    this.fileData = data;
    console.log(this.fileData);
  }

  //----------------------------------------------------------------------------
  // Upload
  //----------------------------------------------------------------------------
  upload() {
    this.loading = true;
    this.feedback = '';
    if (this.validateUpload()) {
      this.loading = true;
      this.rps.postFile('/api/file/entryData', this.prepareUploadData()).subscribe(
        data => this.uploadCallback(data),
        (err) => this.errorHandling(err),
        () => this.completeCallback('upload')
        );
    }
  }

  uploadCallback(data) {
    if(data!=="success"){
      this.feedback = data;
    }
  }

  validateUpload() {
    if (this.files == null) {
      this.feedback = 'Es wurde keine Datei ausgewählt.';
      return;
    } else if (this.files[0] == null) {
      this.feedback = 'Es wurde keine Datei ausgewählt.';
      return;
    }
    if (this.unternehmen == null || this.unternehmen.length < 3) {
      this.feedback = 'Bitte tragen Sie ein Unternehmen ein.';
      return false;
    }
    if (this.beschreibung == null || this.beschreibung.length < 3) {
      this.feedback = 'Bitte tragen Sie eine Beschreibung zur Datei ein.';
      return false;
    }
    return true;
  }

  prepareUploadData() {
    const formData = new FormData();
    formData.append('file', this.files[0]);
    formData.append('unternehmen', this.unternehmen);
    formData.append('beschreibung', this.beschreibung);
    formData.append('user', JSON.stringify(this.sg['user']));
    return formData;

  }

  clearInputs() {
    this.unternehmen = '';
    this.beschreibung = '';
  }


  getFiles(event) {
    this.files = event.target.files;
  }


  //----------------------------------------------------------------------------
  // Remove
  //----------------------------------------------------------------------------
  removeFile(fileName, timeStamp) {
    this.loading = true;
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


}
