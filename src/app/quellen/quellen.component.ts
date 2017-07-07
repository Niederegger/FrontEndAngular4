import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-quellen',
  templateUrl: './quellen.component.html',
  styleUrls: ['./quellen.component.css']
})
export class QuellenComponent implements OnInit {
isin
wkn
name
shortName
instrumentClass
currency
issuerLei
tradingVenue

  constructor(public sg: SimpleGlobal) { }

  ngOnInit(): void {
    this.sg['state'] = 'quellen';
  }

}
