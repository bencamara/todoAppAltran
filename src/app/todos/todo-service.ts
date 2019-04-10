import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosUrl = 'api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Todo>(this.todosUrl, todo, { headers: headers }).pipe(
      tap(data => console.log('createTodo: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteTodo(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<Todo>(url, { headers: headers }).pipe(
      tap(data => console.log('deleteTodo: ' + id)),
      catchError(this.handleError)
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, { headers: headers }).pipe(
      tap(() => console.log('updateTodo: ' + todo.id)),
      // Update the item in the list
      // Return the todo on an update
      map(() => todo),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
