import { Injectable } from '@angular/core';
import { LeyProvincial } from './ley-provincial.js';
import { Observable, throwError } from 'rxjs'; //Observable esta basado en el patron Observador
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';




@Injectable()
export class LeyProvincialService {
  private urlEndPoint: string = 'http://localhost:8080/api/leyesProvinciales'; //defino EndPoint del BACK

  //private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }); //especificamos el tipo de contenido que estamos enviando desde el cliente angular hacia el api rest, los datos los estamos enviando en estructura json


  constructor(private http: HttpClient, private router: Router) { } //se inyecta la referencia a HttpClient




  //----------- METODOS -----------//

  // getLeyesProvinciales(): Observable<LeyProvincial[]> {
  //   return this.http.get(this.urlEndPoint).pipe(
  //     map(response => {
  //       let leyesProvinciales = response as LeyProvincial[];
  //       return leyesProvinciales.map(ley => {
  //         ley.fechaSancion = formatDate(ley.fechaSancion, 'dd-MM-yyyy', 'en-US');
  //         ley.publicacionBO = formatDate(ley.publicacionBO, 'dd-MM-yyyy', 'en-US');
  //         return ley;
  //       });
  //     }
  //     )
  //   );
  // }

  getLeyes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as LeyProvincial[]).forEach(ley => console.log(ley.titulo));
      }),
      map((response: any) => {
        (response.content as LeyProvincial[]).map(ley => {
          ley.titulo = ley.titulo.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
          return ley;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as LeyProvincial[]).forEach(ley => console.log(ley.titulo));
      })
    );
  }

  //para crear una ley
  create(leyProvincial: LeyProvincial): Observable<LeyProvincial> {
    return this.http.post(this.urlEndPoint, leyProvincial).pipe(
      map((response: any) => response.leyProvincial as LeyProvincial),
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

  //para traer ley por ID
  getLeyProvincial(id): Observable<LeyProvincial> {
    return this.http.get<LeyProvincial>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/leyesProvinciales']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }

  //para modificar ley por ID
  update(leyProvincial: LeyProvincial): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${leyProvincial.id}`, leyProvincial).pipe(
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

  //eliminar
  delete(id: number): Observable<LeyProvincial> {
    return this.http.delete<LeyProvincial>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );

  }


  subirArchivo(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true

    });

    return this.http.request(req);
  }



}
