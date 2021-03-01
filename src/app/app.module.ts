import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {appEffects, getReducers, REDUCER_TOKEN} from "./reducers";
import {MatieresComponent} from "./matieres/matieres.component";
import {AjoutMatiereComponent} from "./matieres/add/ajout-matiere.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Routes} from "@angular/router";
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

const appRoutes: Routes = [
  { path: '', redirectTo: '/matiere', pathMatch: 'full' },
  { path: 'matiere', component: MatieresComponent },
  { path: 'ajout-matiere', component: AjoutMatiereComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MatieresComponent,
    AjoutMatiereComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({
      name: '[DEMOANGULAR]',
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
  ],
  providers: [{
    provide: REDUCER_TOKEN,
    useFactory: getReducers
  },],
  bootstrap: [AppComponent]
})
export class AppModule {
}
