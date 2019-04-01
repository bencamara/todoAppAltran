import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';

const ELEMENT_DATA: Todo[] = [
      { 'id': 1, statut: false, name: 'Courses', description:" Faire ses courses" },
      { 'id': 2, statut: false, name: 'Marathon', description: "Particper au marathon de Toulouse"},
      { 'id': 3, statut: false, name: 'Sport', description: "Pratiquer une activité sportive" },
      { 'id': 4, statut: false, name: 'Plongée', description: "S'inscrire à la plongée sous-marine"}
];

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = ['statut','name', 'description', 'admin'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
