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
  MatTabsModule
} from "@angular/material";

import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/todo.reducer';
import { TodoEffets } from './state/todo.effects';
import { TodoListComponent } from './todo-list/todo-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TodoListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'todolist', component: TodoListComponent },

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
    MatProgressSpinnerModule
  ]
})
export class TodoModule { }
