import { NgRedux, select } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToDoState } from '../redux/todo-store';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  @select() todos;
  private url: string = 'sdf';

  constructor(private http: HttpClient,
              private ngRedux: NgRedux<IToDoState>) { }

  public loadToDos() {
    this.ngRedux.dispatch({ type: 'FETCH_TODOS_REQUEST' });
    return this.http.get(this.url).subscribe(todos => {
      this.ngRedux.dispatch({ type: 'FETCH_TODOS_SUCCESS', todo: this.todos });
    });
  }
}
