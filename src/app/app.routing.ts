import { Routes, RouterModule }             from '@angular/router';

import { AnmeldenComponent }                from './anmelden/anmelden.component';
import { DefaultComponent }                 from './default/default.component';
import { StammdatenComponent }              from './stammdaten/stammdaten.component';
import { StammdatenQuellenComponent }       from './stammdaten-quellen/stammdaten-quellen.component';
import { DatenschutzerklaerungComponent }   from './datenschutzerklaerung/datenschutzerklaerung.component';
import { ImpressumComponent }               from './impressum/impressum.component';
import { UeberWpWikiComponent }             from './ueber-wp-wiki/ueber-wp-wiki.component';
import { PublikationenComponent }           from './publikationen/publikationen.component';
import { DateiEinreichenComponent }         from './datei-einreichen/datei-einreichen.component';

const appRoutes: Routes = [
    { path: '',                         component: DefaultComponent },
    { path: 'anmelden',                 component: AnmeldenComponent },
    { path: 'stammdaten/:v',            component: StammdatenComponent },
    { path: 'stammdaten/:v/quellen/:w', component: StammdatenQuellenComponent },
    { path: 'publikationen/:v',         component: PublikationenComponent },
    { path: 'ueber',                    component: UeberWpWikiComponent },
    { path: 'impressum',                component: ImpressumComponent },
    { path: 'datenschutzerklaerung',    component: DatenschutzerklaerungComponent },
    { path: 'dateieinreichen',          component: DateiEinreichenComponent },
    
    { path: '**',                       redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
