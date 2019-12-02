import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import { map, catchError } from 'rxjs/operators';
import { Decreto } from './decreto';


@Injectable({
  providedIn: 'root'
})
export class DecretoService {

  private urlEndPoint: string = 'http://localhost:8080/api/decretos';

  constructor(private http: HttpClient, private router: Router) { }


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

  create(decreto: Decreto): Observable<Decreto> {
    return this.http.post(this.urlEndPoint, decreto).pipe(
      map((response: any) => response.decreto as Decreto),
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

  getDecreto(id): Observable<Decreto> {
    return this.http.get<Decreto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/decretos']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }

  update(decreto: Decreto): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${decreto.id}`, decreto).pipe(
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

  delete(id: number): Observable<Decreto> {
    return this.http.delete<Decreto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );

  }

  subirArchivoDecreto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true

    });

    return this.http.request(req);
  }









}
