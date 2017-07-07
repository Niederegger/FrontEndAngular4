import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(public sg: SimpleGlobal) { }

  ngOnInit(): void {
    this.sg['state'] = 'start';
  }

}
