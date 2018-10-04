import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CLEAR_TODOS } from '../../actions/constants';
import { IToDoState } from '../../redux/todo-store';

@Component({
  selector: 'red-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @select() todos;

  constructor(private ngRedux: NgRedux<IToDoState>) { }

  public addTodo(input): void {
    if (!input.value) {
      return;
    }

    this.ngRedux.dispatch({ type: ADD_TODO, title: input.value });
    input.value = '';
  }

  public toggleTodo(todo): void {
    this.ngRedux.dispatch({ type: TOGGLE_TODO, id: todo.id });
  }

  public removeTodo(todo) {
    this.ngRedux.dispatch({ type: REMOVE_TODO, id: todo.id });
  }
}
