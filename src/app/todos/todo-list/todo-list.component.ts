import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { Observable } from 'rxjs';
import * as fromTodo from '../state/todo.reducer';
import { Store, select } from '@ngrx/store';
import * as todoActions from '../state/todo.actions';

const ELEMENT_DATA: Todo[] = [
      { 'id': 1, statut: false, name: 'Courses', description:" Faire ses courses" },
      { 'id': 2, statut: false, name: 'Marathon', description: "Particper au marathon de Toulouse"},
      { 'id': 3, statut: false, name: 'Sport', description: "Pratiquer une activité sportive" },
      { 'id': 4, statut: false, name: 'Plongée', description: "S'inscrire à la plongée sous-marine"}
];

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = ['statut','name', 'description', 'admin'];
  //dataSource = ELEMENT_DATA;
  //dataSource;


  todo$: Observable<Todo[]>;
  errorMessages$: Observable<string>;
  constructor(private store: Store<fromTodo.State>) { }

  ngOnInit() {

    // Initiation with side effects
    this.store.dispatch(new todoActions.Load());

    //Gestion des messages d'erreur
    this.errorMessages$ = this.store.pipe(select(fromTodo.getError));
    this.todo$ = this.store.pipe(select(fromTodo.getTodos));
  }
  getStyle(value: Todo){
    switch (value.statut) {
      case false:
        return '';
      case true:
        return 'line-through';
    }
  }
 changeState(todo: Todo): void {
    this.store.dispatch(new todoActions.UpdateListTodos(todo));
  }

}
