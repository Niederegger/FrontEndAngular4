import { Component, OnInit } from '@angular/core';
import { RestProviderService } from "../rest-provider.service";
import { SimpleGlobal } from 'ng2-simple-global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [RestProviderService]
})
export class FilesComponent implements OnInit {
  fileData
  reqStat


  dataOrigin: string;

  fileUpload;
  files: FileList;
  filestring: string;

  constructor(private _router: Router, private rps: RestProviderService, public sg: SimpleGlobal) {
    this._router.events.subscribe(path => { this.listenUrl(path['url']) }); // eventlistener on url change
  }

  urlListened
  listenUrl(url) {
    if (!this.urlListened) {
      this.search(url);
    }
    this.urlListened = true;
  }


  search(searchRequest) {
    if (!this.sg['isin'] || this.sg['prevIsin']) {
      this.sg['prevIsin'] = this.sg['isin'];
      // hackerish but works
      let str: string = (searchRequest + "");
      this.sg['isin'] = str.split("/", 3)[2];
      this.fetchFiles();
    }
  }

  ngOnInit() {
    this.sg['state'] = "files";
    this.fetchFiles();
  }

  fetchFiles() {
    this.rps.getRequest("/api/file/fetchFileData?isin=" + this.sg['isin'])
      .subscribe(
      data => this.saveFileFetch(data),
      // The 2nd callback handles errors.
      (err) => this.errorHandling(err),
      // The 3rd callback handles the "complete" event.
      () => this.completeCallback('fetch') //
      );
  }

  saveFileFetch(data) {
    console.log(data);
    this.fileData = data;
  }


  completeCallback(st) {
    console.log("callback: " + st);
    if (st == 'fetch') {
      console.log(this.fileData);
    } else if (st == 'del') {
      this.fetchFiles();
    } else if (st == 'upl') {
      console.log("yahbibi");
      this.fetchFiles();
      this.clearInputs();
    }

  }

  prepareTs(ts) {
    var arr = ts.split(" ");
    return arr[0] + "_" + arr[1];
  }

  cutTimestamp(ts) {
    var str = ts.split(" ")[0].split("-");
    return str[2] + "." + str[1] + "." + str[0];
  }


  adjustUrl(url, amt) {
    if (url.length > amt)
      return url.substring(0, amt) + '...';
    else
      return url;
  }

  removeFile(fileName, timeStamp) {
    console.log(fileName);
    console.log(timeStamp);
    var data = {};
    data['str1'] = fileName;
    data['str2'] = timeStamp;
    console.log(data);
    this.rps.postRequest('/api/file/remove', { 'str1': fileName, 'str2': timeStamp, }).subscribe(
      data => console.log(data.toString()),
      // The 2nd callback handles errors.
      (err) => this.errorHandling(err),
      // The 3rd callback handles the "complete" event.
      () => this.completeCallback('del') //
    );
  }

  errorHandling(err) {
    console.log(err);
    console.log(err.toString());
  }

  //----------------------------------------------------------------------------
  // Upload
  //----------------------------------------------------------------------------
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
    if (this.files == null) {
      this.reqStat = "Sie haben keine Datei ausgewählt.";
      return;
    } else if (this.files[0] == null) {
      this.reqStat = "Sie haben keine Datei ausgewählt.";
      return;
    }
    let file = this.files[0];
    formData.append('file', file);
    formData.append('isin', this.sg['isin']);
    formData.append('dataOrigin', this.dataOrigin);
    formData.append('user', JSON.stringify(this.sg['user']));

    console.log(this.dataOrigin);
    console.log(formData);
    console.log(this.sg['user']);
    
    if (this.validate()) {
      this.rps.postFile("/api/file/uploadFile", formData, )
        .subscribe(
        data => this.handleUploadReturn(data),
        // The 2nd callback handles errors.
        (err) => this.errorHandling(err),
        // The 3rd callback handles the "complete" event.
        () => this.completeCallback('upl') //
        );
    }
  }

  handleUploadReturn(information) {
    console.log(information);
    // if(information.contains("Successfully ")){
    //   // alles gut
    // } else this.reqStat = information;
  }

  validate() {
    if (this.sg['isin']) {
      if (this.dataOrigin != null && this.dataOrigin.length > 0) {
        return true;
      } else {
        this.reqStat = 'Bitte geben Sie eine Quelle an.';
      }
    } else {
      this.reqStat = 'Es ist gerade keine ISIN bekannt, bitte führen Sie Start erneut aus.';
    }
    return false;
  }

  clearInputs() {
    this.dataOrigin = '';
  }

}
