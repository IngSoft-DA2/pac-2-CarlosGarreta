import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService { //lo hice con el localStorage, no pude hacer singleton del servicio desde root
  private readonly KEY = 'visits';
  visits = signal(this.load());

  private load(): number {
    return Number(localStorage.getItem(this.KEY)) || 0;
  }

  increment() {
    const newVal = this.visits() + 1;
    this.visits.set(newVal);
    localStorage.setItem(this.KEY, newVal.toString());
  }

  getCount() {
    return this.visits();
  }
}
