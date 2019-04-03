import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSidenavModule, MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatMenuModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatFormFieldModule
} from "@angular/material";

import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/todo.reducer';
import { TodoEffets } from './state/todo.effects';
import { TodoListComponent } from './todo-list/todo-list.component';
import { RouterModule } from '@angular/router';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoGuardService } from './todo-guard.service';
import { TodoService } from './todo-service';

@NgModule({
  declarations: [TodoListComponent, TodoEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'todolist', component: TodoListComponent },
      { path: 'todolist/:id',
      canActivate: [ TodoGuardService ], component: TodoEditComponent }
  ]),
    StoreModule.forFeature('todos', reducer),
    EffectsModule.forFeature([TodoEffets]),
    CommonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ]
})
export class TodoModule { }
