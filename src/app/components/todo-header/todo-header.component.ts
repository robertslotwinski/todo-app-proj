import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-header.component.html',
  styleUrl: './todo-header.component.css',
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
