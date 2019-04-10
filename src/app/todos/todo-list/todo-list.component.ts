import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../todo';
import { Observable, Subscription } from 'rxjs';
import * as fromTodo from '../state/todo.reducer';
import { Store, select } from '@ngrx/store';
import * as todoActions from '../state/todo.actions';

// const ELEMENT_DATA: Todo[] = [
//       { 'id': 1, statut: false, name: 'Courses', description:" Faire ses courses" },
//       { 'id': 2, statut: false, name: 'Marathon', description: "Particper au marathon de Toulouse"},
//       { 'id': 3, statut: false, name: 'Sport', description: "Pratiquer une activité sportive" },
//       { 'id': 4, statut: false, name: 'Plongée', description: "S'inscrire à la plongée sous-marine"}
// ];

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['statut', 'name', 'description', 'admin'];
  sub: Subscription;
  todo$: Observable<Todo[]>;
  errorMessages$: Observable<string>;
  constructor(private store: Store<fromTodo.State>) {}

  ngOnInit() {
    this.store.dispatch(new todoActions.Load());
    // Gestion des messages d'erreur
    this.errorMessages$ = this.store.pipe(select(fromTodo.getError));
    this.todo$ = this.store.pipe(select(fromTodo.getTodos));
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe();
  }
  getStyle(value: Todo) {
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
