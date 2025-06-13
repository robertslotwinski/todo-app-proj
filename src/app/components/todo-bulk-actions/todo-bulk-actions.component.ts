import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-bulk-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-bulk-actions.component.html',
  styles: [
    `
      .bulk-actions {
        display: flex;
        justify-content: center;
        gap: 15px;
        flex-wrap: wrap;
        padding-top: 20px;
        border-top: 1px solid #e9ecef;
      }

      .bulk-btn {
        padding: 12px 24px;
        border: 2px solid #e1e5e9;
        background: white;
        border-radius: 25px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.3s ease;
        font-family: 'Gotu', sans-serif;
      }

      .bulk-btn:hover {
        border-color: var(--light-blue);
        color: var(--light-blue);
      }

      .bulk-btn.danger:hover {
        border-color: #dc3545;
        color: #dc3545;
        background: #fee;
      }

      @media (max-width: 768px) {
        .bulk-actions {
          flex-direction: column;
          align-items: center;
        }

        .bulk-btn {
          width: 100%;
          max-width: 300px;
        }
      }
    `,
  ],
})
export class TodoBulkActionsComponent {
  @Input() todos: Todo[] = []; //Lista wszystkich todos
  @Output() toggleAllTodos = new EventEmitter<boolean>(); // Zaznaczamy lub odznaczamy wszystkie todos
  @Output() clearCompletedTodos = new EventEmitter<void>(); // Usuwamy wszystkie ukończone todos

  // filtruje todos czy aktywne
  get activeTodos(): Todo[] {
    return this.todos.filter((todo) => !todo.completed);
  }

  // filtruje todos czy ukończone
  get completedTodos(): Todo[] {
    return this.todos.filter((todo) => todo.completed);
  }

  // sprawdza czy wszystkie todos są ukończone
  get allCompleted(): boolean {
    return this.todos.length > 0 && this.activeTodos.length === 0;
  }

  // Zaznacza wszystkie todos
  toggleAll(): void {
    this.toggleAllTodos.emit(!this.allCompleted);
  }

  // Usuwa wszystkie ukończone todos
  clearCompleted(): void {
    this.clearCompletedTodos.emit();
  }
}
