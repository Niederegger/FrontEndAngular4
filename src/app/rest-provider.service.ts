import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProviderService {

  headers

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  getRequest(url){
    return this.http.get(url, { headers: this.headers }).map(res => res.json());
  }

  postRequest(url, data){
    return this.http.post(url, data, { headers: this.headers }).map(res => res.json());
  }
}
