import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeyProvincial } from '../leyes-provinciales/ley-provincial';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeyesProvincialesExtServiceService {

  private urlEndPoint: string = 'http://localhost:8080/api/leyesProvinciales';



  constructor(private http: HttpClient) { }

  getLeyesProvinciales(): Observable<LeyProvincial[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let leyesProvinciales = response as LeyProvincial[];
        return leyesProvinciales.map(ley => {
          ley.fechaSancion = formatDate(ley.fechaSancion, 'dd-MM-yyyy', 'en-US');
          ley.publicacionBO = formatDate(ley.publicacionBO, 'dd-MM-yyyy', 'en-US');
          return ley;
        });
      }
      )
    );
  }

filtrarLeyes(term:string):Observable<LeyProvincial[]> {
  return this.http.get<LeyProvincial[]>(`${this.urlEndPoint}/filtrar-titulo/${term}`)
}


}
