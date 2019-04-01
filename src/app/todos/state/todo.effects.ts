import { Injectable } from '@angular/core';
import  * as todotActions  from './todo.actions';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoService } from '../todo-service';
import { Todo } from '../todo';

@Injectable()
export class TodoEffets {

  constructor(private actions$: Actions,
          private todoService: TodoService) { }
  @Effect()
  loadTodo$ = this.actions$.pipe(
      ofType(todotActions.TodoActionTypes.Load),
      mergeMap((action: todotActions.Load) => this.todoService.getTodos().pipe(
        map((todos: Todo[]) => (new todotActions.LoadSuccess(todos))),
        //catchError ne retourne pas un observable, donc il faut le créer
        catchError( err => of(new todotActions.LoadFail(err)))
      ))
  )

  @Effect()
  updateTodo$ = this.actions$.pipe(
      ofType(todotActions.TodoActionTypes.UpdateTodo),
      map((action: todotActions.UpdateTodo) => action.payload),
      mergeMap((todo: Todo) => this.todoService.updateTodo(todo).pipe(
        map((todo: Todo) => (new todotActions.UpdateTodoSuccess(todo))),
        //catchError ne retourne pas un observable, donc il faut le créer
        catchError( err => of(new todotActions.UpdateTodoFail(err)))
      ))
  )
}
