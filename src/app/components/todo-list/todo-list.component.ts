import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FilterType } from '../todo-filters/todo-filters.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  template: `
    <div class="todos-container">
      <div *ngIf="filteredTodos.length === 0" class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>{{ getEmptyMessage() }}</h3>
        <p *ngIf="currentFilter === 'all'">
          Dodaj swoje pierwsze zadanie powyżej
        </p>
      </div>

      <div class="todos-list">
        <app-todo-item
          *ngFor="let todo of filteredTodos; trackBy: trackByTodo"
          [todo]="todo"
          (todoUpdated)="onTodoUpdated($event)"
          (todoDeleted)="onTodoDeleted($event)"
        ></app-todo-item>
      </div>
    </div>
  `,
  styles: [
    `
      .todos-container {
        margin-bottom: 30px;
      }

      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #6c757d;
      }

      .empty-icon {
        font-size: 4rem;
        margin-bottom: 20px;
      }

      .empty-state h3 {
        margin: 0 0 10px 0;
        font-size: 1.5rem;
        color: #495057;
      }

      .todos-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      @media (max-width: 480px) {
        .empty-state {
          padding: 40px 15px;
        }

        .empty-icon {
          font-size: 3rem;
        }
      }
    `,
  ],
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Input() currentFilter: FilterType = 'all';
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  get filteredTodos(): Todo[] {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter((todo) => !todo.completed);
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }

  trackByTodo(index: number, todo: Todo): number {
    return todo.id;
  }

  getEmptyMessage(): string {
    switch (this.currentFilter) {
      case 'active':
        return 'Brak aktywnych zadań';
      case 'completed':
        return 'Brak ukończonych zadań';
      default:
        return 'Brak zadań do wyświetlenia';
    }
  }

  onTodoUpdated(todo: Todo): void {
    this.todoUpdated.emit(todo);
  }

  onTodoDeleted(id: number): void {
    this.todoDeleted.emit(id);
  }
}
