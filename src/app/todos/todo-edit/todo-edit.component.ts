import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromTodo from '../state/todo.reducer';
import * as todoActions from '../state/todo.actions';
import { Todo } from '../todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent implements OnInit, OnDestroy {
  public id: Guid;
  todoForm: FormGroup;
  isNewTodo: boolean;
  todoId: any;
  todo: Todo | null;
  sub: Subscription;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<fromTodo.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      id: '',
      name: ['', Validators.required],
      description: [''],
      statut: false,
    });

    this.todoId = this.activatedRoute.snapshot.params['id'];
    if (this.todoId === 'new') {
        this.store.dispatch(new todoActions.InitializeCurrentTodo());
    }

    this.store.dispatch(new todoActions.GetCurrentTodo(this.todoId));
    this.store.pipe(select(fromTodo.getTodo)).subscribe(todo => {
        if (todo != null) {
          this.displayTodo(todo);
        } else {
          // On renitialise le store
          this.store.dispatch(new todoActions.Load());
          this.router.navigate([`/todolist`]);
          this.store.pipe(select(fromTodo.getTodo)).subscribe(todo => this.displayTodo(todo));
        }
    });
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe();
  }

  displayTodo(todo: Todo | null): void {
    this.todo = todo;
    if (this.todo) {
      this.todoForm.reset();
      this.todoForm.patchValue({
        name: this.todo.name,
        description: this.todo.description,
        statut: this.todo.statut,
      });
    }
  }

  cancelEdit(): void {
    //this.displayTodo(this.todo);
    this.router.navigate([`/todolist`]);
  }
  saveTodo() {
    if (this.todoForm.valid) {
      if (this.todoForm.dirty) {
        const p = { ...this.todoForm.value, id: this.todoId };

        if (this.activatedRoute.snapshot.params['id'] === 'new') {
          p.id = Guid.create().toString();
          console.log('id', p.id);
          this.store.dispatch(new todoActions.CreateTodo(p));
          this.router.navigate([`/todolist`]);
        } else {
          this.store.dispatch(new todoActions.UpdateTodo(p));
          this.router.navigate([`/todolist`]);
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
      this.router.navigate([`/todolist`]);
    }
  }
}
