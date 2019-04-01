import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoModule } from './todos/todo.module';

const routes: Routes = [
    {path: '', redirectTo: "todolist", pathMatch: 'full' },
    { path: "**",  redirectTo: '/'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    TodoModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
