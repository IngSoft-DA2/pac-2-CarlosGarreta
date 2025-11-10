import { Component, signal, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-reflection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reflection.component.html',
  styleUrls: ['./reflection.component.css']
})
export class ReflectionComponent implements OnInit {
  private apiUrl = 'https://localhost:7152/api/Reflection/importers';
    
  isLoading = signal(false);
  names = signal<string[]>([]);
  error = signal<string | null>(null);
  emptyList = signal(false);

  constructor(private http: HttpClient, public counter: CounterService) {}
  ngOnInit(): void {
    this.counter.increment();
  }

  cargarNombres() {
    this.isLoading.set(true);
    this.error.set(null);
    this.emptyList.set(false);

    this.http
      .get<string[]>(this.apiUrl)
      .subscribe({
        next: (response) => {
          const results = response;
          this.names.set(results);
          this.isLoading.set(false);
          if (results.length == 0)
            this.emptyList.set(true);
        },
        error: () => {
          this.error.set("error");
          this.isLoading.set(false);
        },
      });
  }
}
