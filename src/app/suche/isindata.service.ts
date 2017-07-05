import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class IsinDataService {
  headers
  content

  constructor(private http: Http) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    console.log("Header: "+this.headers);
  }

  fetchData(isin){
    this.http.get('/api/wp/isin?v='+isin, { headers: this.headers }).map(res => res.json())
      .subscribe(
          data => this.content = data
      );
    }

    getData(){
      console.log(this.headers);
      return this.http.get('/api/wp/isin?v=AEDFXA0M6V00', { headers: this.headers })
      .map((res: Response) => res.json)
    }


    // isinData

    // gd(){
    //   return this.http.get('/api/wp/isin?v=AEDFXA0M6V00').toPromis()
    //   .then(
    //     resonse => {
    //       isinData =
    //     }
    //   )
    // }

}
