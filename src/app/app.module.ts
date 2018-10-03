import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';

import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
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
  constructor(
    devTools: DevToolsExtension,
    ngRedux: NgRedux<Map<string, any>>) {
    /**
     * fromJS is from immutable, this prevents accidental mutations
     */
    const enhancers = isDevMode() ? [devTools.enhancer()] : []; // if devMode then set the enhancer for debugging
    ngRedux.configureStore(rootReducer, fromJS(INITIAL_STATE), [], enhancers);
  }
 }
