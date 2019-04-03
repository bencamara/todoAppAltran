import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromTodo from '../state/todo.reducer';
import * as todoActions from '../state/todo.actions';
import { Todo } from '../todo';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo-service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

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
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService
    ) {}

  ngOnInit() {

    this.todoId = this.activatedRoute.snapshot.params['id'];
    console.log('this.todoId',this.todoId);

    // Define the form group
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      statut: false
    });

    this.store.dispatch(new todoActions.GetCurrentTodo(this.todoId));

    this.store.pipe(select(fromTodo.getTodo)).subscribe(
      (todo) => {
           if (todo != null) {
              this.displayTodo(todo)
            }else{
              // On renitialise le store
              this.store.dispatch(new todoActions.Load());
              this.store.pipe(select(fromTodo.getTodo)).subscribe(
                todo =>  this.displayTodo(todo)
              );
        }
      }
    );
  }

 ngOnDestroy(): void {
  //this.sub.unsubscribe();
}

// Also validate on blur
// Helpful if the user tabs through required fields
// blur(): void {
//   this.displayMessage = this.genericValidator.processMessages(this.productForm);
// }

displayTodo(todo: Todo | null): void {

  console.log('this.todoId',this.todoId);

  // Set the local product property
  this.todo = todo;

  if (this.todo) {
    // Reset the form back to pristine
    this.todoForm.reset();
    // Update the data on the form
    this.todoForm.patchValue({
      name: this.todo.name,
      description: this.todo.description,
      statut: this.todo.statut
    });
  }
}

cancelEdit(): void {
  // Redisplay the currently selected product
  // replacing any edits made
  this.displayTodo(this.todo);
  this.router.navigate([`/todolist`]);
}
  saveTodo() {

    if (this.todoForm.valid) {
      if (this.todoForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.todo, ...this.todoForm.value };

        if (p.id === 0) {
          this.todoService.createTodo(p).subscribe(
            todo => this.store.dispatch(new todoActions.SetCurrentTodo(todo)),
            (err: any) => this.errorMessage = err.error
          );
          this.router.navigate([`/todolist`]);
        } else {
          this.store.dispatch(new todoActions.UpdateTodo(p));
          this.router.navigate([`/todolist`]);
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
   }
}
