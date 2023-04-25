import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NacionalidadeInterface } from "../types/nacionalidade.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class NacionalidadeService {

  constructor(private httpClient: HttpClient) {}

  getNacionalidades(): Observable<NacionalidadeInterface[]> {
    return this.httpClient.get<NacionalidadeInterface[]>(
      `${environment.apiUrl}/nacionalidades`
    )
  }

}
