import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CLEAR_TODOS } from './../actions/constants';
import { tassign } from 'tassign';

export interface IToDoState {
  todos: any[];
  lastUpdate: Date;
}

export const INITIAL_TODO_STATE: IToDoState = {
  todos: [],
  lastUpdate: null
};

export function rootToDoReducer(state: IToDoState, action): IToDoState {
  switch (action.type) {
   case ADD_TODO:
    const newToDo = { id: state.todos.length + 1, title: action.title };
    return tassign(state, {
      /**
       * Instead of the push() method, we use the concat() method, because the former mutates
       * the original array, whereas the latter returns a new array
       */
      todos: state.todos.concat(newToDo),
      lastUpdate: new Date()
    });

    case TOGGLE_TODO:
    /**
     * When modifying an item in an array, we should create a new array and copy
     * all other items from the source array (except the item to be modified). At the same time
     * we should create a copy of the item to be modified and apply the mutations using tassing.
     */

     // First, we need to find the item to be modified. Here, we are finding it by its id.
      const todo = state.todos.find(t => t.id === action.id);

     //  Now, we need to find the position of this item in the array
      const index =  state.todos.indexOf(todo);
      return tassign(state, {
        todos: [
          /**
           * Using the slice() method, we can slice an array. This method does not mutate the
           * original array and returns a new array. Here, we're getting all the items from
           * the beginning to the index of the item we're going to modify.
           *
           * We use the spread operator (...) to enumerate an array; this is a clean way to
           * concat two arrays, instead of:
           *
           * let newArray = [];
           * newArray.concat(sourceArray1).concat(sourceArray2)
           *
           * We can write:
           *
           * let newArray = [...sourceArray1, ...sourceArray2];
           */
          ...state.todos.slice(0, index),

          /**
           * So, we have coppied all the items before the item to be modified, now we take a copy
           * of this item and apply the mutation (isCompleted).
           */
          tassign(todo, { isCompleted: !todo.isCompleted }),

          /**
           * Now, we need to copy all the items afte this item. Again, we use the slice() method
           * to get all the items following that item and use the spread operator to enumerate
           * them and put them in our target array.
           */
          ...state.todos.slice(index + 1)],
          lastUpdate: new Date()
      });

    case REMOVE_TODO:
      return tassign(state, {
        todos: state.todos.filter(t => t.id !== action.id),
        lastUpdate: new Date()
      });

    case CLEAR_TODOS:
      return tassign(state, {
        todos: [],
        lastUpdate: new Date()
      });
  }

  return state;
}
