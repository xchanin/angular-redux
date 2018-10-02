import { INCREMENT } from '../actions/constants';
import { Map } from 'immutable';
import { tassign } from 'tassign';
import { toBase64String } from '@angular/compiler/src/output/source_map';

export interface IAppState {
  counter: number;
  messaging?: {
    newMessages: 5;
  }
}

export const INITIAL_STATE: IAppState = {
  counter: 0
}

/**
 * Map<string, any> comes from immutable, which prevents accidental mutations
 */
export function rootReducer(state: Map<string, any>, action): Map<string, any> {
  switch (action.type) {
    case INCREMENT :
    // return Object.assign({}, state, { counter: state.counter + 1 } );
    /**
     * this is similar to Object.assign(), but
     * tassign looks at all the properties defined and doesn't
     * allow you to add properties that don't exist in the state
     */
    // using immutable we don't need to do this
    // return tassign(state, { counter: state.counter + 1 });

    return state.set('counter', state.get('counter') + 1);
  }
  return state;
}
