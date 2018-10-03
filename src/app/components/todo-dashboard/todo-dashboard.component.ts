import { CLEAR_TODOS } from './../../actions/constants';
import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IToDoState } from '../../redux/todo-store';

@Component({
  selector: 'red-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent {
  @select() todos;
  @select() lastUpdate;

  constructor(private ngRedux: NgRedux<IToDoState>) { }

  public clearTodos() {
    this.ngRedux.dispatch({ type: CLEAR_TODOS });
  }
}
