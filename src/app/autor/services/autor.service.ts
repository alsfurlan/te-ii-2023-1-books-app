import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutorInterface } from '../types/autor.interface';

@Injectable()
export class AutorService {
  constructor(private httpClient: HttpClient) { }

  getAutor(id: number): Observable<AutorInterface> {
    return this.httpClient.get<AutorInterface>(
      `${environment.apiUrl}/autores/${id}`
    )
  }

  getAutores(): Observable<AutorInterface[]> {
    return this.httpClient.get<AutorInterface[]>(
      `${environment.apiUrl}/autores`
    );
  }

  update(autor: AutorInterface): Observable<AutorInterface> {
    return this.httpClient.put<AutorInterface>(
      `${environment.apiUrl}/autores/${autor.id}`,
      autor
    )
  }

  save(autor: AutorInterface): Observable<AutorInterface> {
    return this.httpClient.post<AutorInterface>(
      `${environment.apiUrl}/autores`,
      autor
    );
  }

  remove(autor: AutorInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/autores/${autor.id}`
    );
  }
}
