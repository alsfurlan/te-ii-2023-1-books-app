import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LivroInterface } from '../types/livro.interface';

@Injectable()
export class LivroService {
  constructor(private httpClient: HttpClient) { }

  getLivro(id: string): Observable<LivroInterface> {
    return this.httpClient.get<LivroInterface>(
      `${environment.apiUrl}/livros/${id}`
    )
  }

  getLivros(): Observable<LivroInterface[]> {
    return this.httpClient.get<LivroInterface[]>(
      `${environment.apiUrl}/livros`
    );
  }

  update(livro: LivroInterface): Observable<LivroInterface> {
    return this.httpClient.put<LivroInterface>(
      `${environment.apiUrl}/livros/${livro.id}`,
      livro
    )
  }

  add(livro: LivroInterface): Observable<LivroInterface> {
    return this.httpClient.post<LivroInterface>(
      `${environment.apiUrl}/livros`,
      livro
    );
  }

  remove(livro: LivroInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/livros/${livro.id}`
    );
  }
}
