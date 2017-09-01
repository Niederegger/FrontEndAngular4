import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { Router } from '@angular/router';
import { RestProviderService } from '../rest-provider.service';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.css'],
})
export class AnmeldenComponent implements OnInit {

  constructor(
    private sg: SimpleGlobal,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.sg['state'] = 'anmelden';
  }
}
