import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class RestProviderService {

  headersJson : any;
  headersMultiPart : any;

  constructor(private http: Http) {
    this.headersJson = new Headers();
    this.headersJson.append('Content-Type', 'application/json');
    this.headersJson.append('Access-Control-Allow-Origin', '*');
    this.headersMultiPart = new Headers();
    delete this.headersMultiPart['Content-Type'];
    this.headersJson.append('Content-Type', 'multipart/form-data');
    this.headersMultiPart.append('Access-Control-Allow-Origin', '*');
  }

  getRequest(url){
    return this.http.get(url, { headers: this.headersJson }).map(res => res.json());
  }

  postRequest(url, data){
    return this.http.post(url, data, { headers: this.headersJson }).map(res => res.json());
  }

  postFile(url, data){
    return Observable.fromPromise(new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // resolve(JSON.parse(xhr.response))
                    resolve(xhr.response)
                } else {
                    reject(xhr.response)
                }
            }
        }
        xhr.open("POST", url, true)
        xhr.send(data);
    }));
  }
}
