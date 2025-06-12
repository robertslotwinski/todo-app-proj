import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import {
  TodoFiltersComponent,
  FilterType,
} from './components/todo-filters/todo-filters.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoBulkActionsComponent } from './components/todo-bulk-actions/todo-bulk-actions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TodoHeaderComponent,
    TodoInputComponent,
    TodoFiltersComponent,
    TodoListComponent,
    TodoBulkActionsComponent,
  ],
  templateUrl: './app.html',
  styles: [
    `
      * {
        box-sizing: border-box;
      }

      .app-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, sans-serif;

        background: transparent
        min-height: 100vh;
      }

      .main-content {
        background: white;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }

      @media (max-width: 768px) {
        .app-container {
          padding: 15px;
        }

        .main-content {
          padding: 20px;
        }
      }

      @media (max-width: 480px) {
        .app-container {
          padding: 10px;
        }

        .main-content {
          padding: 15px;
          border-radius: 15px;
        }
      }
    `,
  ],
})
export class AppComponent {
  todos: Todo[] = []; // glowna lista todos
  currentFilter: FilterType = 'all'; // aktualny filtr zadań, domyslny wszystkie

  constructor(private todoService: TodoService) {
    this.todos = this.todoService.loadTodos(); // ladujemy dane z serwisu

    // Jeśli brak zapisanych todos, dodaj przykładowe
    if (this.todos.length === 0) {
      this.initializeDefaultTodos(); // inicjalizacja domyślnych todos ( na dole rozpisane)
    }
  }

  private initializeDefaultTodos(): void {
    const now = new Date();

    // Tworzenie różnych dat do demonstracji dla przykaldowych todos
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    // Inicjalizacja listy przykładowych todos
    this.todos = [
      {
        id: 1,
        text: 'Przejrzeć dokumentację Angulara v20',
        completed: false,
        createdAt: yesterday,
      },
      {
        id: 2,
        text: 'Kupić mleko i chleb',
        completed: true,
        createdAt: yesterday,
      },
      {
        id: 3,
        text: 'Zorganizować spotkanie zespołu',
        completed: false,
        createdAt: threeDaysAgo,
      },
      {
        id: 4,
        text: 'Zaimplementować Tailwinda v4 do projektu - zapomniane',
        completed: true,
        createdAt: threeDaysAgo,
      },
      {
        id: 5,
        text: 'Zaplanować wakacje na lato',
        completed: false,
        createdAt: weekAgo,
      },
      {
        id: 6,
        text: 'Przeczytać książkę o TypeScript',
        completed: true,
        createdAt: weekAgo,
      },
      {
        id: 7,
        text: 'Stworzyć backup bazy danych',
        completed: false,
        createdAt: twoWeeksAgo,
      },
      {
        id: 8,
        text: 'Zaktualizować CV',
        completed: true,
        createdAt: twoWeeksAgo,
      },
    ];

    this.saveTodos(); // zapisujemy przykładowe todos do localStorage
  }
  // Metody do zarządzania todo
  addTodo(text: string): void {
    const newTodo: Todo = {
      id: Date.now(), // generujemy unikalne ID na podstawie aktualnego czasu
      text: text, // tekst od uzytkownika
      completed: false, // nowe todo jest domyślnie nieukończone
      createdAt: new Date(), // ustawiamy aktualną datę jako czas utworzenia
    };
    this.todos.unshift(newTodo); // dodajemy nowe todo na początek listy
    this.saveTodos(); // zapisujemy do localStorage
  }

  // Metoda do aktualizacji istniejącego todo
  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      // sprawdzamy czy todo istnieje, jeśli tak :
      this.todos[index] = updatedTodo; // aktualizujemy todo w liście
      this.saveTodos(); // zapisujemy zmiany do localStorage
    }
  }

  // Metoda do usuwania todo
  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id); // filtrujemy listę, aby usunąć todo o podanym ID
    this.saveTodos(); // zapisujemy zmiany
  }

  // Metoda do ustawiania filtra
  setFilter(filter: FilterType): void {
    this.currentFilter = filter; // ustawiamy aktualny filtr po kliknieciu przez uzytkownika
  }

  // zmiana stanu ukończenia wszystkich todo
  toggleAll(shouldComplete: boolean): void {
    this.todos.forEach((todo) => (todo.completed = shouldComplete)); // przełączamy stan ukończenia wszystkich todo
    this.saveTodos(); // zapisujemy zmiany
  }

  // Metoda do usuwania ukończonych todo
  clearCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.completed); // filtrujemy listę, aby usunąć tylko ukończone todo
    this.saveTodos(); // zapisujemy zmiany
  }

  private saveTodos(): void {
    this.todoService.saveTodos(this.todos);
  }
}
