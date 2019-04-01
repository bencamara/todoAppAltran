import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Todo } from './todo';

export class TodoData implements InMemoryDbService {

    createDb() {
        const todos: Todo[] = [
          { 'id': 1, statut: false, name: 'Courses', description:" Faire ses courses" },
          { 'id': 2, statut: false, name: 'Marathon', description: "Particper au marathon de Toulouse"},
          { 'id': 3, statut: false, name: 'Sport', description: "Pratiquer une activité sportive" },
          { 'id': 4, statut: false, name: 'Plongée', description: "S'inscrire à la plongée sous-marine"}
        ];
        return { todos };
    }
}
