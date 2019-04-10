import { Injectable } from '@angular/core';
import * as todoActions from './todo.actions';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoService } from '../todo-service';
import { Todo } from '../todo';

@Injectable()
export class TodoEffets {
  constructor(private actions$: Actions, private todoService: TodoService) {}
  @Effect()
  loadTodo$ = this.actions$.pipe(
    ofType(todoActions.TodoActionTypes.Load),
    mergeMap((action: todoActions.Load) =>
      this.todoService.getTodos().pipe(
        map((todos: Todo[]) => new todoActions.LoadSuccess(todos)),
        // catchError ne retourne pas un observable, donc il faut le créer
        catchError(err => of(new todoActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateTodo$ = this.actions$.pipe(
    ofType(todoActions.TodoActionTypes.UpdateTodo),
    map((action: todoActions.UpdateTodo) => action.payload),
    mergeMap((todoUpdated: Todo) =>
      this.todoService.updateTodo(todoUpdated).pipe(
        map((todoUpdated: Todo) => new todoActions.UpdateTodoSuccess(todoUpdated)),
        // catchError ne retourne pas un observable, donc il faut le créer
        catchError(err => of(new todoActions.UpdateTodoFail(err)))
      )
    )
  );

  @Effect()
  createTodo$ = this.actions$.pipe(
    ofType(todoActions.TodoActionTypes.CreateTodo),
    map((action: todoActions.CreateTodo) => action.payload),
    mergeMap((todoCreated: Todo) =>
      this.todoService.createTodo(todoCreated).pipe(
        map((todoCreated: Todo) => new todoActions.CreateTodoSuccess(todoCreated)),
        // catchError ne retourne pas un observable, donc il faut le créer
        catchError(err => of(new todoActions.CreateTodoFail(err)))
      )
    )
  );
}
