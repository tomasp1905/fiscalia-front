import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { DecretoLey } from '../decretos-ley/decretoLey';

@Injectable({
  providedIn: 'root'
})
export class DecretoLeyExtService {

  private urlEndPoint: string = 'http://localhost:8080/api/decretosley';

  constructor(private http: HttpClient) { }

  getDecretosLey(): Observable<DecretoLey[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let decretosLey = response as DecretoLey[];
        return decretosLey.map(decretoLey => {
          decretoLey.fechaSancion = formatDate(decretoLey.fechaSancion, 'dd-MM-yyyy', 'en-US');
          decretoLey.publicacionBO = formatDate(decretoLey.publicacionBO, 'dd-MM-yyyy', 'en-US');
          return decretoLey;
        });
      }
      )
    );
  }

  filtrarDecretosLeyPorTitulo(term:string):Observable<DecretoLey[]> {
    return this.http.get<DecretoLey[]>(`${this.urlEndPoint}/filtrar-titulo/${term}`)
  }

  filtrarDecretosLeyPorNumero(term:string):Observable<DecretoLey[]> {
    return this.http.get<DecretoLey[]>(`${this.urlEndPoint}/filtrar-numero/${term}`)
  }

  filtrarDecretosLeyPorAnio(term:string):Observable<DecretoLey[]> {
    return this.http.get<DecretoLey[]>(`${this.urlEndPoint}/filtrar-anio/${term}`)
  }



}
