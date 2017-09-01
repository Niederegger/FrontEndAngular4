import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class RestProviderService {

  headersJson: any;

  constructor(private http: Http) {
    this.headersJson = new Headers();
    this.headersJson.append('Content-Type', 'application/json');
    this.headersJson.append('Access-Control-Allow-Origin', '*');
  }

  getRequest(url) {
    return this.http.get(url, { headers: this.headersJson }).map(res => res.json());
  }

  getRequestWM(url) {
    return this.http.get(url, { headers: this.headersJson });
  }

  postRequest(url, data) {
    return this.http.post(url, data, { headers: this.headersJson });
  }

  postFile(url, data) {
    return Observable.fromPromise(new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // resolve(JSON.parse(xhr.response))
                    resolve(xhr.response);
                } else {
                    reject(xhr.response);
                }
            }
        };
        xhr.open("POST", url, true)
        xhr.send(data);
    }));
  }
}
