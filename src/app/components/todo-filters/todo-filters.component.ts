import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filters">
      <button
        *ngFor="let filter of filters"
        (click)="setFilter(filter.key)"
        [class.active]="currentFilter === filter.key"
        class="filter-btn"
      >
        {{ filter.label }}
      </button>
    </div>
  `,
  styles: [
    `
      .filters {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 30px;
        flex-wrap: wrap;
      }

      .filter-btn {
        padding: 10px 20px;
        border: 2px solid #e1e5e9;
        background: white;
        border-radius: 25px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.3s ease;
      }

      .filter-btn:hover {
        border-color: #667eea;
        color: #667eea;
      }

      .filter-btn.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-color: transparent;
      }

      @media (max-width: 480px) {
        .filters {
          gap: 8px;
        }

        .filter-btn {
          padding: 8px 16px;
          font-size: 0.8rem;
        }
      }

      @media (max-width: 320px) {
        .filter-btn {
          padding: 6px 12px;
          font-size: 0.75rem;
        }
      }
    `,
  ],
})
export class TodoFiltersComponent {
  @Input() currentFilter: FilterType = 'all';
  @Output() filterChanged = new EventEmitter<FilterType>();

  filters = [
    { key: 'all' as const, label: 'Wszystkie' },
    { key: 'active' as const, label: 'Aktywne' },
    { key: 'completed' as const, label: 'Ukończone' },
  ];

  setFilter(filter: FilterType): void {
    this.filterChanged.emit(filter);
  }
}
