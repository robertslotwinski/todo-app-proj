import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-bulk-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="todos.length > 0" class="bulk-actions">
      <button (click)="toggleAll()" class="bulk-btn">
        {{ allCompleted ? 'Odznacz wszystkie' : 'Zaznacz wszystkie' }}
      </button>
      <button
        *ngIf="completedTodos.length > 0"
        (click)="clearCompleted()"
        class="bulk-btn danger"
      >
        Usuń ukończone ({{ completedTodos.length }})
      </button>
    </div>
  `,
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
      }

      .bulk-btn:hover {
        border-color: #667eea;
        color: #667eea;
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
  @Input() todos: Todo[] = [];
  @Output() toggleAllTodos = new EventEmitter<boolean>();
  @Output() clearCompletedTodos = new EventEmitter<void>();

  get activeTodos(): Todo[] {
    return this.todos.filter((todo) => !todo.completed);
  }

  get completedTodos(): Todo[] {
    return this.todos.filter((todo) => todo.completed);
  }

  get allCompleted(): boolean {
    return this.todos.length > 0 && this.activeTodos.length === 0;
  }

  toggleAll(): void {
    this.toggleAllTodos.emit(!this.allCompleted);
  }

  clearCompleted(): void {
    this.clearCompletedTodos.emit();
  }
}
