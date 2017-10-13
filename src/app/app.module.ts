// angular libraries
import { BrowserModule }                    from '@angular/platform-browser';
import { NgModule }                         from '@angular/core';
import { FormsModule }                      from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { RouterModule }                     from '@angular/router';
import { SimpleGlobal }                     from 'ng2-simple-global';

// functional files
import { routing }                          from './app.routing';
import { RestProviderService }              from './rest-provider.service';
import { GlobalFunctionService }            from './global-function.service';

// page components
import { AppComponent }                     from './app.component';
import { NavComponent }                     from './nav/nav.component';
import { FooterComponent }                  from './footer/footer.component';
import { SucheComponent }                   from './suche/suche.component';
import { LoginComponent }                   from './anmelden/login/login.component';
import { RegisterComponent }                from './anmelden/register/register.component';

// subPages (routed)
import { AnmeldenComponent }                from './anmelden/anmelden.component';
import { DefaultComponent }                 from './default/default.component';
import { StammdatenComponent }              from './stammdaten/stammdaten.component';
import { StammdatenQuellenComponent }       from './stammdaten-quellen/stammdaten-quellen.component';
import { DatenschutzerklaerungComponent }   from './datenschutzerklaerung/datenschutzerklaerung.component';
import { ImpressumComponent }               from './impressum/impressum.component';
import { UeberWpWikiComponent }             from './ueber-wp-wiki/ueber-wp-wiki.component';
import { PublikationenComponent }           from './publikationen/publikationen.component';
import { DateiEinreichenComponent } from './datei-einreichen/datei-einreichen.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ImpressumComponent,
    DatenschutzerklaerungComponent,
    UeberWpWikiComponent,
    AnmeldenComponent,
    SucheComponent,
    DefaultComponent,
    PublikationenComponent,
    StammdatenQuellenComponent,
    StammdatenComponent,
    LoginComponent,
    RegisterComponent,
    DateiEinreichenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [SimpleGlobal],
  bootstrap: [AppComponent]
})
export class AppModule { }
