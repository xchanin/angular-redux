import { INCREMENT } from './actions/constants';
import { IAppState } from './redux/store';
import { NgRedux, select } from '@angular-redux/store';
import { Component } from '@angular/core';

@Component({
  selector: 'red-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Three ways to use the @select decorator
   */
  /**
   * This looks for a field with the exact same name wihtin the store
   * this will return an observable
   */
  @select('counter') count; // give an alias name

  /**
   * This allows us to access a property in the store
   */
  @select(['messaging', 'newMessages']) newMessages;
  /**
   * Use an arrow function
   */
  @select((s: IAppState) => s.messaging.newMessages) newMessageCount;

  constructor(private ngRedux: NgRedux<IAppState>) {

  }


  public increment() {
    this.ngRedux.dispatch({type: INCREMENT});
  }
}
