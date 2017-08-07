import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-datenschutzerklaerung',
  templateUrl: './datenschutzerklaerung.component.html',
  styleUrls: ['./datenschutzerklaerung.component.css']
})
export class DatenschutzerklaerungComponent implements OnInit {

  constructor(private sg: SimpleGlobal) { }

  ngOnInit(): void {
    this.sg['state'] = 'start';
  }

}
