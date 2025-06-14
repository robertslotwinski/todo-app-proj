import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-filters.component.html',
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
        border-color: var(--light-blue);
        color: var(--light-blue);
      }

      .filter-btn.active {
        background: linear-gradient(
          135deg,
          var(--light-blue) 0%,
          var(--primary-blue) 100%
        );
        color: white;
        border-color: var(--light-blue);
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
  @Input() currentFilter: FilterType = 'all'; // sprawdzamy jaki filtr jest aktualnie ustawiony - default all
  @Output() filterChanged = new EventEmitter<FilterType>(); // emitujemy zdarzenie zmiany filtra

  // Lista filtrów do wyboru
  filters = [
    { key: 'all' as const, label: 'Wszystkie' }, // wyswietla wszystkie todos
    { key: 'active' as const, label: 'Aktywne' }, // wyswietla tylko aktywne todos
    { key: 'completed' as const, label: 'Ukończone' }, // wyswietla tylko ukończone todos
  ];

  // Metoda do ustawiania filtra
  setFilter(filter: FilterType): void {
    this.filterChanged.emit(filter);
  }
}
