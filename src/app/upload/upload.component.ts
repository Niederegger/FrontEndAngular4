import { Component, OnInit } from '@angular/core';
import { RestProviderService } from "../rest-provider.service";
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [RestProviderService]
})
export class UploadComponent implements OnInit {

  constructor(private rps: RestProviderService, public sg: SimpleGlobal) { }

  ngOnInit() {
    this.sg['state'] = "upload";
  }

  userComment: string;
  dataType: string;
  dataOrigin: string;

  fileUpload;
  reqStat;
  files: FileList;
  filestring: string;

  getFiles(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);
    console.log(this.files);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.filestring = btoa(binaryString);  // Converting binary string data.
  }

  upload() {
    this.reqStat = "";
    let formData = new FormData();
    if(this.files == null){
      this.reqStat = "No File selected.";
      return;
    } else if(this.files[0] == null){
      this.reqStat = "No File selected.";
      return;
    }
    let file = this.files[0];
    formData.append('file', file);
    formData.append('isin', this.sg['isin']);
    formData.append('dataType', this.dataType);
    formData.append('dataOrigin', this.dataOrigin);
    formData.append('comment', this.userComment);
    console.log(formData);
    if (this.validate()) {
      this.rps.postFile("/api/file/uploadFile", formData,)
      .subscribe(
        data => this.reqStat = data,
        // The 2nd callback handles errors.
        (err) => this.errorHandling(err),
        // The 3rd callback handles the "complete" event.
        () => this.completeCallback() //
     );
    }
  }

  validate() {
    if(this.sg['isin']){
      if(this.dataType != null && this.dataType.length > 0){
          if(this.dataOrigin != null && this.dataOrigin.length > 0){
            return true;
          } else {
            this.reqStat = 'Keine Quelle angegeben.';
          }
      } else {
        this.reqStat = 'Kein Datentyp angegeben.';
      }
    } else {
      this.reqStat = 'Keine Isin bekannt';
    }
    return false;
  }

  errorHandling(err) {
    console.error("Error: " + err);
    this.reqStat = "Upload failed!";
  }

  completeCallback() {

  }
}
