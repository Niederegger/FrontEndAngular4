import { Component, OnInit } from '@angular/core';
import { RestProviderService } from "../rest-provider.service";
import { SimpleGlobal } from 'ng2-simple-global';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [RestProviderService]
})
export class FilesComponent implements OnInit {
  fileData
  reqStat

  constructor(private rps: RestProviderService, public sg: SimpleGlobal) { }

  ngOnInit() {
    this.sg['state'] = "files";
    this.rps.getRequest("/api/file/fetchFileData")
    .subscribe(
      data => this.fileData = data['data'],
      // The 2nd callback handles errors.
      (err) => this.errorHandling(err),
      // The 3rd callback handles the "complete" event.
      () => this.completeCallback() //
   );
  }

  errorHandling(err) {
    console.error("Error: " + err);
    this.reqStat = "Upload failed!";
  }

  completeCallback() {
    console.log(this.fileData);
  }

  prepareTs(ts){
    var arr = ts.split(" ");
    return arr[0]+"_"+arr[1];
  }

  cutTimestamp(ts) {
    return ts.split(".")[0];
  }

}
