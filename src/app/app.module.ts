import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { VersionsgeschichteComponent } from './versionsgeschichte/versionsgeschichte.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzerklaerungComponent } from './datenschutzerklaerung/datenschutzerklaerung.component';
import { EinstellungComponent } from './einstellung/einstellung.component';
import { DetailsComponent } from './details/details.component';
import { BearbeitenComponent } from './bearbeiten/bearbeiten.component';
import { SucheComponent } from './suche/suche.component';
import { AnmeldenComponent } from './anmelden/anmelden.component';
import { QuellenComponent } from './quellen/quellen.component';
import { RestProviderService } from './rest-provider.service';
import { DefaultComponent } from './default/default.component';
import { UeberWpWikiComponent } from './ueber-wp-wiki/ueber-wp-wiki.component';
import { NutzungsbedingungenComponent } from './nutzungsbedingungen/nutzungsbedingungen.component';
import { UploadComponent } from './upload/upload.component';
import { FilesComponent } from './files/files.component';
import { StammdatenComponent } from './stammdaten/stammdaten.component';
import { QuellenDetailsComponent } from './quellen-details/quellen-details.component';
import { Quellen2Component } from './quellen2/quellen2.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    VersionsgeschichteComponent,
    ImpressumComponent,
    DatenschutzerklaerungComponent,
    EinstellungComponent,
    DetailsComponent,
    BearbeitenComponent,
    SucheComponent,
    AnmeldenComponent,
    QuellenComponent,
    DefaultComponent,
    UeberWpWikiComponent,
    NutzungsbedingungenComponent,
    UploadComponent,
    FilesComponent,
    StammdatenComponent,
    QuellenDetailsComponent,
    Quellen2Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'anmelden', component: AnmeldenComponent },
      { path: '', component: DefaultComponent },
      // { path: 'details/:v', component: DetailsComponent },
      // { path: 'stammdaten/:v', component: StammdatenComponent },
      { path: 'stammdaten/:v', component: Quellen2Component },
      { path: 'stammdaten/:v/quellen/:w', component: QuellenDetailsComponent },
      // { path: 'einstellungen', component: EinstellungComponent },
      { path: 'datenschutzerklaerung', component: DatenschutzerklaerungComponent },
      // { path: 'versionsgeschichte', component: VersionsgeschichteComponent },
      // { path: 'bearbeiten/:v', component: BearbeitenComponent },
      { path: 'impressum', component: ImpressumComponent },
      { path: 'ueber', component: UeberWpWikiComponent },
      // { path: 'nutzungsbedingungen', component: NutzungsbedingungenComponent },
      // { path: 'einstellungen', component: EinstellungComponent },
      // { path: 'upload/:v', component: UploadComponent },
      { path: 'files/:v', component: FilesComponent },

      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [SimpleGlobal],
  bootstrap: [AppComponent]
})
export class AppModule { }
