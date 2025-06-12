import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
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
  @Input() todo!: Todo; //
  @Output() todoUpdated = new EventEmitter<Todo>(); // wysylamy zaktualizowany todo
  @Output() todoDeleted = new EventEmitter<number>(); // wysylamy todo do usuniecia

  isEditing = false; // czy jestesmy w trybie edycji
  editText = ''; // tekst do edycji, default input pusty

  constructor(public todoService: TodoService) {} // wstrzykujemy serwis TodoService

  toggleCompleted(): void {
    this.todo.completed = !this.todo.completed; // przełączamy stan todo
    this.todoUpdated.emit(this.todo); // emitujemy zaktualizowany todo
  }

  // Rozpoczynamy edycję todo
  startEditing(): void {
    this.isEditing = true; // ustawiamy tryb edycji na true
    this.editText = this.todo.text; // ustawiamy tekst do edycji na aktualny tekst todo

    setTimeout(() => {
      // czeka na render DOM
      const input = document.querySelector('.edit-input') as HTMLInputElement;
      if (input) {
        input.focus(); // ustawiamy fokus na inpucie
        input.select(); // zaznaczamy cały tekst w inpucie
      }
    });
  }

  saveEdit(): void {
    // sprawdzamy czy input nie jest pusty
    if (this.editText.trim()) {
      this.todo.text = this.editText.trim(); // usuwamy niepotrzebne spacje z poczatku i konca
      this.todoUpdated.emit(this.todo); // emitujemy zaktualizowany todo
    }
    this.cancelEdit(); // konczymy edycje
  }

  cancelEdit(): void {
    this.isEditing = false; // ustawiamy tryb edycji na false
    this.editText = ''; // resetujemy tekst do edycji
  }

  deleteTodo(): void {
    this.todoDeleted.emit(this.todo.id); // emitujemy id todo do usuniecia
  }
}
