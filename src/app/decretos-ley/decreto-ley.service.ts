import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import { map, catchError, tap } from 'rxjs/operators';
import { DecretoLey } from './decretoLey';

@Injectable({
  providedIn: 'root'
})
export class DecretoLeyService {

  private urlEndPoint: string = 'http://localhost:8080/api/decretosley';

  constructor(private http: HttpClient, private router: Router) { }

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

  create(decretoLey: DecretoLey): Observable<DecretoLey> {
    return this.http.post(this.urlEndPoint, decretoLey).pipe(
      map((response: any) => response.decretoLey as DecretoLey),
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

  getDecretoLey(id): Observable<DecretoLey> {
    return this.http.get<DecretoLey>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/decretosLey']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }

  update(decretoLey: DecretoLey): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${decretoLey.id}`, decretoLey).pipe(
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

  delete(id: number): Observable<DecretoLey> {
    return this.http.delete<DecretoLey>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  subirArchivoDecretoLey(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true

    });

    return this.http.request(req);
  }


}
