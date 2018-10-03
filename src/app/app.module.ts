import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';

import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { fromJS, Map } from 'immutable';
import { IAppState, rootReducer, INITIAL_STATE } from './redux/store';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDashboardComponent } from './components/todo-dashboard/todo-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDashboardComponent
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
    ngRedux: NgRedux<Map<string, any>>,
    devTools: DevToolsExtension) {
    /**
     * fromJS is from immutable, this prevents accidental mutations
     */
    const enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, fromJS(INITIAL_STATE), [], enhancers);
  }
 }
