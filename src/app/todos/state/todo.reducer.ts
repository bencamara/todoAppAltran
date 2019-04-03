import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Todo } from '../todo';
import { TodoActionTypes, TodoActions } from './todo.actions';

// State for this feature (Product)
export interface TodoState {
  currentTodoId: number | null;
  todos: Todo[];
  error: string;
}

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State {
  todos: TodoState;
}

const initialState: TodoState = {
  currentTodoId: null,
  todos: [],
  error: ''
};

// Selector functions
const getTodoFeatureState = createFeatureSelector<TodoState>('todos');

export const getCurrentTodoId = createSelector(
  getTodoFeatureState,
  state => state.currentTodoId
);

export const getTodo = createSelector(
  getTodoFeatureState,
  getCurrentTodoId,
  (state, currentTodoId) =>{
    if (currentTodoId === 0){
        return{
            id: 0,
            statut: false,
            name: 'new',
            description: ''
        };
    }else{
          return currentTodoId ? state.todos.find(p => p.id == currentTodoId) : null;
    }
  }
);

export const getTodos = createSelector(
  getTodoFeatureState,
  state => state.todos
);

export const getError = createSelector(
  getTodoFeatureState,
  state => state.error
);

export function reducer(state = initialState, action: TodoActions): TodoState {

  switch (action.type) {

    case TodoActionTypes.SetCurrentTodo:
      return {
        ...state,
        currentTodoId: action.payload.id
      };

      case TodoActionTypes.GetCurrentTodo:
       return {
        ...state,
        currentTodoId: action.payload
      };

    case TodoActionTypes.InitializeCurrentTodo:
      return {
        ...state,
        currentTodoId : 0
      };

    case TodoActionTypes.LoadSuccess:
      return {
        ...state,
        todos: action.payload,
        error: ''
      };

    case TodoActionTypes.LoadFail:
      return {
        ...state,
        todos: [],
        error: action.payload
      };

      case TodoActionTypes.UpdateTodoSuccess:
      const updatedTodos = state.todos.map(
        item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        todos: updatedTodos,
        currentTodoId: action.payload.id,
        error: ''
      };

      case TodoActionTypes.UpdateListTodos:
      const todoListUpdated = state.todos.filter(item => item.id !== action.payload.id)
      todoListUpdated.push(action.payload)
        return {
        ...state,
        todos: todoListUpdated,
        error: ''
      };

    case TodoActionTypes.UpdateTodoFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
