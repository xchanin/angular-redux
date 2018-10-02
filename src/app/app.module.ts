import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { fromJS, Map } from 'immutable';
import { IAppState, rootReducer, INITIAL_STATE } from './redux/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<Map<string, any>>) {
    /**
     * fromJS is from immutable, this prevents accidental mutations
     */
    ngRedux.configureStore(rootReducer, fromJS(INITIAL_STATE));
  }
 }
