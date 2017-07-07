import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public sg: SimpleGlobal) { }

  ngOnInit() {
  }

  isA(state){
    return (state == this.sg['state']) ? 'active' : '';
  }

}
