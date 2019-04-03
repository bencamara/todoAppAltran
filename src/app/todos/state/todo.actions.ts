/* NgRx */
import { Action } from '@ngrx/store';
import { Todo } from '../todo';

export enum TodoActionTypes {
  SetCurrentTodo = '[Todo] Set Current Todo',
  GetCurrentTodo = '[Todo] Get Current Todo',
  InitializeCurrentTodo = '[Todo] Initialize Current Todo',
  Load = '[Todo] Load',
  LoadSuccess = '[Todo] Load Success',
  LoadFail = '[Todo] Load Fail',
  UpdateTodo = '[Todo] Update Todo',
  UpdateListTodos = '[Todo] Update Todos',
  UpdateTodoSuccess = '[Todo] Update Todo Success',
  UpdateTodoFail = '[Todo] Update Todo Fail'
}

// Action Creators

export class GetCurrentTodo implements Action {
  readonly type = TodoActionTypes.GetCurrentTodo;

  constructor(public payload: number) { }
}

export class UpdateTodo implements Action {
  readonly type = TodoActionTypes.UpdateTodo;

  constructor(public payload: Todo) { }
}

export class UpdateListTodos implements Action {
  readonly type = TodoActionTypes.UpdateListTodos;

  constructor(public payload: Todo) { }
}

export class UpdateTodoSuccess implements Action {
  readonly type = TodoActionTypes.UpdateTodoSuccess;

  constructor(public payload: Todo) { }
}
export class UpdateTodoFail implements Action {
  readonly type = TodoActionTypes.UpdateTodoFail;

  constructor(public payload: string) { }
}

export class SetCurrentTodo implements Action {
  readonly type = TodoActionTypes.SetCurrentTodo;

  constructor(public payload: Todo) { }
}

export class InitializeCurrentTodo implements Action {
  readonly type = TodoActionTypes.InitializeCurrentTodo;
}

export class Load implements Action {
  readonly type = TodoActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = TodoActionTypes.LoadSuccess;

  constructor(public payload: Todo[]) { }
}

export class LoadFail implements Action {
  readonly type = TodoActionTypes.LoadFail;

  constructor(public payload: string) { }
}

 export type TodoActions = UpdateListTodos
  | SetCurrentTodo
  | GetCurrentTodo
  | InitializeCurrentTodo
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateTodo
  | UpdateTodoSuccess
  | UpdateTodoFail;

