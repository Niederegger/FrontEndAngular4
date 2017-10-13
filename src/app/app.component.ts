import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(public sg: SimpleGlobal,
    private _router: Router,) { }

  ngOnInit(): void {
    this.sg['state'] = 'start';
    const storedUser = localStorage.getItem('user');
    this.sg['user'] = storedUser != null ? JSON.parse(storedUser) : null;
  }

  logout(){
    this.sg['user'] = null;
    localStorage.setItem('user', null);
    this._router.navigateByUrl('/');
  }
}
