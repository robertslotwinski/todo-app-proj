import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-item" [class.completed]="todo.completed">
      <div class="todo-content">
        <label class="checkbox-container">
          <input
            type="checkbox"
            [checked]="todo.completed"
            (change)="toggleCompleted()"
          />
          <span class="checkmark"></span>
        </label>

        <div class="todo-text-container">
          <span
            *ngIf="!isEditing"
            class="todo-text"
            (dblclick)="startEditing()"
          >
            {{ todo.text }}
          </span>
          <input
            *ngIf="isEditing"
            type="text"
            [(ngModel)]="editText"
            (keyup.enter)="saveEdit()"
            (keyup.escape)="cancelEdit()"
            (blur)="saveEdit()"
            class="edit-input"
            #editInput
          />
          <small class="todo-date">
            {{ todoService.formatDate(todo.createdAt) }}
          </small>
        </div>
      </div>

      <div class="todo-actions">
        <button
          *ngIf="!isEditing"
          (click)="startEditing()"
          class="action-btn edit-btn"
          title="Edytuj"
        >
          ✏️
        </button>
        <button
          (click)="deleteTodo()"
          class="action-btn delete-btn"
          title="Usuń"
        >
          🗑️
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .todo-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: #fafafa;
        border-radius: 15px;
        border: 2px solid transparent;
        transition: all 0.3s ease;
      }

      .todo-item:hover {
        border-color: #e1e5e9;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .todo-item.completed {
        opacity: 0.7;
        background: #f8f9fa;
      }

      .todo-content {
        display: flex;
        align-items: center;
        gap: 15px;
        flex: 1;
      }

      .checkbox-container {
        position: relative;
        cursor: pointer;
        user-select: none;
      }

      .checkbox-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkmark {
        height: 24px;
        width: 24px;
        background-color: white;
        border: 2px solid #ddd;
        border-radius: 50%;
        display: inline-block;
        transition: all 0.3s ease;
      }

      .checkbox-container:hover .checkmark {
        border-color: #667eea;
      }

      .checkbox-container input:checked ~ .checkmark {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-color: #667eea;
      }

      .checkmark:after {
        content: '';
        position: absolute;
        display: none;
        left: 7px;
        top: 3px;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      .checkbox-container input:checked ~ .checkmark:after {
        display: block;
      }

      .todo-text-container {
        flex: 1;
      }

      .todo-text {
        font-size: 1.1rem;
        color: #333;
        line-height: 1.4;
        display: block;
        margin-bottom: 4px;
        cursor: pointer;
      }

      .todo-item.completed .todo-text {
        text-decoration: line-through;
        color: #6c757d;
      }

      .todo-date {
        color: #6c757d;
        font-size: 0.8rem;
      }

      .edit-input {
        width: 100%;
        padding: 8px 12px;
        border: 2px solid #667eea;
        border-radius: 8px;
        font-size: 1.1rem;
        outline: none;
        margin-bottom: 4px;
      }

      .todo-actions {
        display: flex;
        gap: 8px;
      }

      .action-btn {
        padding: 8px 12px;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;
        font-size: 1rem;
      }

      .action-btn:hover {
        background: #e9ecef;
        transform: scale(1.1);
      }

      .delete-btn:hover {
        background: #fee;
      }

      @media (max-width: 768px) {
        .todo-item {
          padding: 15px;
        }

        .todo-text {
          font-size: 1rem;
        }
      }

      @media (max-width: 480px) {
        .todo-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
          padding: 15px;
        }

        .todo-content {
          width: 100%;
        }

        .todo-actions {
          width: 100%;
          justify-content: flex-end;
        }

        .action-btn {
          padding: 10px 15px;
        }

        .todo-text {
          font-size: 0.95rem;
        }
      }
    `,
  ],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  isEditing = false;
  editText = '';

  constructor(public todoService: TodoService) {}

  toggleCompleted(): void {
    this.todo.completed = !this.todo.completed;
    this.todoUpdated.emit(this.todo);
  }

  startEditing(): void {
    this.isEditing = true;
    this.editText = this.todo.text;

    setTimeout(() => {
      const input = document.querySelector('.edit-input') as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
      }
    });
  }

  saveEdit(): void {
    if (this.editText.trim()) {
      this.todo.text = this.editText.trim();
      this.todoUpdated.emit(this.todo);
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editText = '';
  }

  deleteTodo(): void {
    this.todoDeleted.emit(this.todo.id);
  }
}
