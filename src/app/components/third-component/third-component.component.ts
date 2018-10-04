import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IToDoState } from '../../redux/todo-store';

@Component({
  selector: 'red-third-component',
  templateUrl: './third-component.component.html',
  styleUrls: ['./third-component.component.scss']
})
export class ThirdComponentComponent {

  @select() todos;

  constructor(private ngRedux: NgRedux<IToDoState>) { }
}
