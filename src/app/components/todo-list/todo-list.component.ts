import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FilterType } from '../todo-filters/todo-filters.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
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
  @Input() todos: Todo[] = []; // Lista wszystkich todos
  @Input() currentFilter: FilterType = 'all'; // Aktualny filtr zadań na wszystkie
  @Output() todoUpdated = new EventEmitter<Todo>(); // Zdarzenie aktualizacji todo
  @Output() todoDeleted = new EventEmitter<number>(); // Zdarzenie usunięcia todo

  // logika filtrowania todos
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
    return todo.id; // Używamy id todo jako unikalnego identyfikatora
  }

  // Sprawdza czy lista todos jest pusta dla aktualnego filtra
  getEmptyMessage(): string {
    switch (this.currentFilter) {
      case 'active': // jak nie ma aktywnych todos
        return 'Brak aktywnych zadań';
      case 'completed': // jak nie ma ukończonych todos
        return 'Brak ukończonych zadań';
      default: // jak nie ma żadnych todos
        return 'Brak zadań do wyświetlenia';
    }
  }

  onTodoUpdated(todo: Todo): void {
    this.todoUpdated.emit(todo); // emitujemy zaktualizowany todo
  }

  onTodoDeleted(id: number): void {
    this.todoDeleted.emit(id); // emitujemy id todo do usunięcia
  }
}
