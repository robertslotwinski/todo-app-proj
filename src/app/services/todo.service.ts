import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root', // wstrzykujemy do calej aplikacji
})
export class TodoService {
  // klucz do zachowania todo w localStorage
  private readonly STORAGE_KEY = 'angular-todos';

  // metoda do wczytywania todos z localStorage JSON (string) -> parsowanie na obiekt js
  loadTodos(): Todo[] {
    const saved = localStorage.getItem(this.STORAGE_KEY); // pobieramy z localStorage
    if (saved) {
      try {
        const parsed = JSON.parse(saved); // parsujemy JSON (string) na obiekt js i zapisujemy
        return parsed.map((todo: any) => ({
          ...todo, // Przechodzimy przez kazdy element tablicy i rekonstrukcja createdAt ze stringa na obiekt Date
          createdAt: new Date(todo.createdAt),
        }));
      } catch (e) {
        return []; // blad parsowania, zwracamy pusta liste
      }
    }
    return []; // brak zapisanych todos to pusta lista
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos)); // konwertuje na JSON i zapisuje w localstorage
  }

  // formatowanie daty do czytelnej formy
  formatDate(date: Date): string {
    const now = new Date(); // pobieramy aktualna date
    const todoDate = new Date(date); // tworzymy nowy obiekt daty z przekazanej daty z todo
    const diffTime = Math.abs(now.getTime() - todoDate.getTime()); // obliczamy roznice czasu w milisekundach, abs aby uniknac ujemnych wartosci przy datach z przyszlosci
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // obliczamy roznice dni (1000ms * 60s * 60min * 24h), gdzie ceil zaokragla w gore do najblizszej liczby calkowitej dla dni

    // sprawdzamy roznice dni i zwracamy odpowiedni format
    if (diffDays === 1) {
      return 'Dzisiaj';
    } else if (diffDays === 2) {
      return 'Wczoraj';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} dni temu`; // Odejmujemy 1, przez dzialanie ceil()
    } else {
      return todoDate.toLocaleDateString('pl-PL'); // formatowanie daty w formacie polskim
    }
  }
}
