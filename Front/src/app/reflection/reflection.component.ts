import { Component } from '@angular/core';

@Component({
  selector: 'app-reflection',
  imports: [],
  templateUrl: './reflection.component.html',
  styleUrl: './reflection.component.css'
})
export class ReflectionComponent {
  private apiUrl = 'https://localhost:7152/';
    
  list = []

  movies = signal<Movie[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  loadPopularMovies(page: number = 1) {
    this.isLoading.set(true);
    this.error.set(null);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('page', page.toString());

    this.http
      .get<{ results: Movie[] }>(`${this.apiUrl}/movie/popular`, { params })
      .subscribe({
        next: (response) => {
          const mappedMovies = response.results.map((m) => ({
            ...m,
            poster_path: m.poster_path
              ? `${this.imageBaseUrl}${m.poster_path}`
              : 'assets/no-poster.png',
          }));

          this.movies.set(mappedMovies);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error fetching movies:', err);
          this.error.set('Failed to load movies');
          this.isLoading.set(false);
        },
      });
}