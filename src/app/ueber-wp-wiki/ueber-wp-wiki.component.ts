import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-ueber-wp-wiki',
  templateUrl: './ueber-wp-wiki.component.html',
  styleUrls: ['./ueber-wp-wiki.component.css']
})
export class UeberWpWikiComponent implements OnInit {

  constructor(public sg: SimpleGlobal) { }

  ngOnInit() {
    this.sg['state'] = "start";
  }

}
