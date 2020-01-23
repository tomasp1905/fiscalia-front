import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { Decreto } from '../decretos/decreto';

@Injectable({
  providedIn: 'root'
})
export class DecretoExtService {

  private urlEndPoint: string = 'http://localhost:8080/api/decretos';

  constructor(private http: HttpClient) { }

  getDecretos(): Observable<Decreto[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let decretos = response as Decreto[];
        return decretos.map(decreto => {
          decreto.fechaEmision = formatDate(decreto.fechaEmision, 'dd-MM-yyyy', 'en-US');
          decreto.publicacionBO = formatDate(decreto.publicacionBO, 'dd-MM-yyyy', 'en-US');
          return decreto;
        });
      }
      )
    );
  }

  filtrarDecretos(term:string):Observable<Decreto[]> {
    return this.http.get<Decreto[]>(`${this.urlEndPoint}/filtrar-titulo/${term}`)
  }

  filtrarDecretosPorAnio(term:string):Observable<Decreto[]> {
    return this.http.get<Decreto[]>(`${this.urlEndPoint}/filtrar-anio/${term}`)
  }

  filtrarDecretosPorNumero(term:string):Observable<Decreto[]> {
    return this.http.get<Decreto[]>(`${this.urlEndPoint}/filtrar-numero/${term}`)
  }

}
