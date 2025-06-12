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
  todos: Todo[] = [];
  currentFilter: FilterType = 'all';

  constructor(private todoService: TodoService) {
    this.todos = this.todoService.loadTodos();

    // Jeśli brak zapisanych todos, dodaj przykładowe
    if (this.todos.length === 0) {
      this.initializeDefaultTodos();
    }
  }

  private initializeDefaultTodos(): void {
    const now = new Date();

    // Różne daty do demonstracji
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

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
        text: 'Napisać testy jednostkowe',
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

    this.saveTodos();
  }
  addTodo(text: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.unshift(newTodo);
    this.saveTodos();
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.saveTodos();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
  }

  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
  }

  toggleAll(shouldComplete: boolean): void {
    this.todos.forEach((todo) => (todo.completed = shouldComplete));
    this.saveTodos();
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.saveTodos();
  }

  private saveTodos(): void {
    this.todoService.saveTodos(this.todos);
  }
}
