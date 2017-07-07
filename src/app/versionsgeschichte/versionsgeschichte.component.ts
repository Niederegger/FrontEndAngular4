import { Component, OnInit } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-versionsgeschichte',
  templateUrl: './versionsgeschichte.component.html',
  styleUrls: ['./versionsgeschichte.component.css']
})
export class VersionsgeschichteComponent implements OnInit {

    constructor(public sg: SimpleGlobal) { }

    ngOnInit(): void {
      this.sg['state'] = 'versionsgeschichte';
    }

}
