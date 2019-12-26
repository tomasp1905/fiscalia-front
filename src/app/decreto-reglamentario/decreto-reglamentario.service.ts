import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DecretoReglamentario } from './decretoReglamentario';

@Injectable({
  providedIn: 'root'
})
export class DecretoReglamentarioService {

   private urlEndPoint: string = 'http://localhost:8080/api/decretosReglamentario';


  constructor(private http: HttpClient, private router: Router) { }

  getDecretosReglamentarios(): Observable<DecretoReglamentario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let decretosReglamentarios = response as DecretoReglamentario[];
        return decretosReglamentarios.map(decretoReglamentario => {
          decretoReglamentario.fechaEmision = formatDate(decretoReglamentario.fechaEmision, 'dd-MM-yyyy', 'en-US');
          decretoReglamentario.publicacionBO = formatDate(decretoReglamentario.publicacionBO, 'dd-MM-yyyy', 'en-US');
          return decretoReglamentario;
        });
      }
      )
    );
  }

  create(decretoReglamentario: DecretoReglamentario): Observable<DecretoReglamentario> {
    return this.http.post(this.urlEndPoint, decretoReglamentario).pipe(
      map((response: any) => response.decretoReglamentario as DecretoReglamentario),
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

  getDecretoReglamentario(id): Observable<DecretoReglamentario> {
    return this.http.get<DecretoReglamentario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/decretosReglamentarios']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }

  update(decretoReglamentario: DecretoReglamentario): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${decretoReglamentario.id}`, decretoReglamentario).pipe(
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

  delete(id: number): Observable<DecretoReglamentario> {
    return this.http.delete<DecretoReglamentario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  subirArchivoDecretoReglamentario(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true

    });

    return this.http.request(req);
  }


}
