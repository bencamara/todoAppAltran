import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '../todo';
import { TodoActionTypes, TodoActions } from './todo.actions';

export interface TodoState {
  currentTodoId: string | null;
  todos: Todo[];
  error: string;
}

export interface State {
  todos: TodoState;
}

const initialState: TodoState = {
  currentTodoId: null,
  todos: [],
  error: '',
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
    if (currentTodoId === 'new'){
        return{
            id: 'new',
            statut: false,
            name: '',
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
    case TodoActionTypes.GetCurrentTodo:
      return {
        ...state,
        currentTodoId: action.payload,
      };

    case TodoActionTypes.InitializeCurrentTodo:
      return {
        ...state,
        currentTodoId: 'new',
      };

    // Create TODO
    case TodoActionTypes.CreateTodoSuccess:
      const newTodosList = state.todos.map(item => (action.payload.id === item.id ? item : action.payload));
      return {
        ...state,
        todos: newTodosList,
      };

    case TodoActionTypes.CreateTodoFail:
      return {
        ...state,
        error: action.payload,
      };

    // Load TODO
    case TodoActionTypes.LoadSuccess:
      return {
        ...state,
        todos: action.payload,
        error: '',
      };

    case TodoActionTypes.LoadFail:
      return {
        ...state,
        todos: [],
        error: action.payload,
      };

    // Update TODO
    case TodoActionTypes.UpdateTodoSuccess:
      const updatedTodos = state.todos.map(item => (action.payload.id === item.id ? action.payload : item));
      return {
        ...state,
        todos: updatedTodos,
        currentTodoId: action.payload.id,
        error: '',
      };

    case TodoActionTypes.UpdateListTodos:
      const todoListUpdated = state.todos.filter(item => item.id !== action.payload.id);
      todoListUpdated.push(action.payload);
      return {
        ...state,
        todos: todoListUpdated,
        error: '',
      };

    case TodoActionTypes.UpdateTodoFail:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
