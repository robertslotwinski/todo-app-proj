import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-input.component.html',
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
        border-color: var(--light-blue);
        box-shadow: 0 0 0 3px rgba(140, 212, 209, 0.1);
      }

      .add-btn {
        padding: 15px 25px;
        background: linear-gradient(
          135deg,
          var(--light-blue) 0%,
          var(--primary-blue) 100%
        );
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
        box-shadow: 0 10px 20px rgba(108, 182, 231, 0.39);
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
          box-shadow: 0 8px 16px rgba(102, 203, 234, 0.3);
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
  @Output() todoAdded = new EventEmitter<string>(); // wysyla nowy todo
  newTodoText: string = ''; // default input jest pusty

  addTodo(): void {
    const text = this.newTodoText.trim(); // usuwa niepotrzebne spacje z poczatku i konca
    if (text) {
      // jak jest cos w inpucie idziemy dalej
      this.todoAdded.emit(text); // emitujemy tekst do rodzica
      this.newTodoText = ''; // resetujemy input
    }
  }
}
