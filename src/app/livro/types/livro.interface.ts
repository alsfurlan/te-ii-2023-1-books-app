import { AutorInterface } from 'src/app/autor/types/autor.interface';
import { GeneroEnum } from './genero.enum';

export interface LivroInterface {
  id: string;
  titulo: string;
  subtitulo?: string;
  genero: GeneroEnum;
  dataLancamento?: string;
  autores: AutorInterface[];
}
