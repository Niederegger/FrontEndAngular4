import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MasterValueComponent } from './master-value/master-value.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { VersionsgeschichteComponent } from './versionsgeschichte/versionsgeschichte.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzerklaerungComponent } from './datenschutzerklaerung/datenschutzerklaerung.component';
import { EinstellungComponent } from './einstellung/einstellung.component';
import { LesenComponent } from './lesen/lesen.component';
import { BearbeitenComponent } from './bearbeiten/bearbeiten.component';
import { SucheComponent } from './suche/suche.component';
import { AnmeldenComponent } from './anmelden/anmelden.component';
import { QuellenComponent } from './quellen/quellen.component';
import { RestProviderService } from './rest-provider.service';
import { DefaultComponent } from './default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterValueComponent,
    NavComponent,
    FooterComponent,
    VersionsgeschichteComponent,
    ImpressumComponent,
    DatenschutzerklaerungComponent,
    EinstellungComponent,
    LesenComponent,
    BearbeitenComponent,
    SucheComponent,
    AnmeldenComponent,
    QuellenComponent,
    DefaultComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'anmelden', component: AnmeldenComponent },
      { path: '', component: DefaultComponent },
      { path: 'lesen/:v', component: LesenComponent },
      { path: 'quellen/:v', component: QuellenComponent },
      { path: 'einstellungen', component: EinstellungComponent },
      { path: 'datenschutzerklaerung', component: DatenschutzerklaerungComponent },
      { path: 'versionsgeschichte', component: VersionsgeschichteComponent },
      { path: 'bearbeiten', component: BearbeitenComponent },

      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
