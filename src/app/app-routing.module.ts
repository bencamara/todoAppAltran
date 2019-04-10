import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoModule } from './todos/todo.module';

const routes: Routes = [
    { path: '', redirectTo: 'todolist', pathMatch: 'full'},
    { path: '**', redirectTo: 'todolist', pathMatch: 'full'}
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes), TodoModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
