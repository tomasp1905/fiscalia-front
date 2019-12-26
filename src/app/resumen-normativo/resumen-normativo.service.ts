import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import { map, catchError } from 'rxjs/operators';
import { ResumenNormativo } from './resumenNormativo';

@Injectable({
  providedIn: 'root'
})
export class ResumenNormativoService {

  private urlEndPoint: string = 'http://localhost:8080/api/resumenNormativo';

  constructor(private http: HttpClient, private router: Router) { }


  getResumenes(): Observable<ResumenNormativo[]>{
    return this.http.get<ResumenNormativo[]>(this.urlEndPoint);
  }

  create(resumen: ResumenNormativo): Observable<ResumenNormativo> {
    return this.http.post(this.urlEndPoint, resumen).pipe(
      map((response: any) => response.resumen as ResumenNormativo),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

  getResumen(id): Observable<ResumenNormativo> {
    return this.http.get<ResumenNormativo>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/resumenesNormativos']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }

  update(resumen: ResumenNormativo): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${resumen.id}`, resumen).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }

        return throwError(e);
      }));
  }

  delete(id: number): Observable<ResumenNormativo> {
    return this.http.delete<ResumenNormativo>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  subirArchivoResumen(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true

    });

    return this.http.request(req);
  }


}
