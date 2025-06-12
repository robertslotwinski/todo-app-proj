import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-header.component.html',
  styles: [
    `
      .app-header {
        text-align: center;
        margin-bottom: 30px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 25px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .app-header h1 {
        margin: 0 0 15px 0;
        color: white;
        font-size: 2.5rem;
        font-weight: 300;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      .stats {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
      }

      .stat {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        padding: 8px 16px;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 500;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      @media (max-width: 768px) {
        .app-header h1 {
          font-size: 2rem;
        }

        .stats {
          gap: 10px;
        }

        .stat {
          font-size: 0.8rem;
          padding: 6px 12px;
        }
      }

      @media (max-width: 480px) {
        .app-header {
          padding: 20px;
        }

        .app-header h1 {
          font-size: 1.8rem;
        }

        .stats {
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
      }

      @media (max-width: 320px) {
        .app-header h1 {
          font-size: 1.5rem;
        }
      }
    `,
  ],
})
export class TodoHeaderComponent {
  @Input() todos: Todo[] = []; // Lista wszystkich todos

  // Zlicza aktywne todos
  get activeTodos(): Todo[] {
    return this.todos.filter((todo) => !todo.completed);
  }

  // Zlicza ukończone todos
  get completedTodos(): Todo[] {
    return this.todos.filter((todo) => todo.completed);
  }
}
