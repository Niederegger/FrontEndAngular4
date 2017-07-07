import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.css']
})
export class AnmeldenComponent implements OnInit {

  constructor(private sg: SimpleGlobal) { }

  ngOnInit(): void {
    this.sg['state'] = 'anmelden';
  }

}
