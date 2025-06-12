// ====== src/app/components/todo-input/todo-input.component.ts ======
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="add-todo-section">
      <div class="input-group">
        <input
          type="text"
          [(ngModel)]="newTodoText"
          (keyup.enter)="addTodo()"
          placeholder="Dodaj nowe zadanie..."
          class="todo-input"
          #todoInput
        />
        <button
          (click)="addTodo()"
          [disabled]="!newTodoText.trim()"
          class="add-btn"
        >
          <span class="add-icon">+</span>
          <span class="add-text">Dodaj</span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .add-todo-section {
        margin-bottom: 30px;
      }

      .input-group {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }

      .todo-input {
        flex: 1;
        padding: 15px 20px;
        border: 2px solid #e1e5e9;
        border-radius: 50px;
        font-size: 1rem;
        outline: none;
        transition: all 0.3s ease;
      }

      .todo-input:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      .add-btn {
        padding: 15px 25px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 100px;
      }

      .add-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
      }

      .add-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .add-icon {
        font-size: 1.2rem;
        font-weight: bold;
      }

      @media (max-width: 768px) {
        .input-group {
          flex-direction: column;
        }

        .add-btn {
          justify-content: center;
          width: 100%;
        }
      }

      @media (max-width: 480px) {
        .add-text {
          display: none;
        }

        .add-btn {
          min-width: auto;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          padding: 0;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }

        .add-icon {
          font-size: 1.5rem;
        }

        .input-group {
          margin-bottom: 80px;
        }
      }
    `,
  ],
})
export class TodoInputComponent {
  @Output() todoAdded = new EventEmitter<string>();
  newTodoText: string = '';

  addTodo(): void {
    const text = this.newTodoText.trim();
    if (text) {
      this.todoAdded.emit(text);
      this.newTodoText = '';
    }
  }
}
