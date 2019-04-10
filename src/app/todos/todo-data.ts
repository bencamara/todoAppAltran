import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Todo } from './todo';

export class TodoData implements InMemoryDbService {
  createDb() {
    const todos: Todo[] = [
      { id: '5ffd9cb0-a3ba-ce73-e6f7-03e53ed6efa9', statut: false, name: 'Courses', description: ' Faire ses courses' },
      { id: 'ec7f5d96-69e9-effd-5d39-924d3a6de64f', statut: false, name: 'Marathon', description: 'Particper au marathon de Toulouse' },
      { id: '2f26275b-aadf-7e51-15d1-b35827133781', statut: false, name: 'Sport', description: 'Pratiquer une activité sportive' },
      { id: '0a1a0ac4-4329-bcba-b5a8-0b831510d3d6', statut: false, name: 'Plongée', description: `"S'inscrire·à·la·plongée·sous-marine"` },
    ];
    return { todos };
  }
}
