import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly STORAGE_KEY = 'angular-todos';

  loadTodos(): Todo[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }

  formatDate(date: Date): string {
    const now = new Date();
    const todoDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - todoDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Dzisiaj';
    } else if (diffDays === 2) {
      return 'Wczoraj';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} dni temu`;
    } else {
      return todoDate.toLocaleDateString('pl-PL');
    }
  }
}
