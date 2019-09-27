import { Injectable } from '@angular/core';
import { LeyProvincial } from './ley-provincial.js';
import { of, Observable, throwError } from 'rxjs'; //Observable esta basado en el patron Observador
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { formatDate } from '@angular/common';
import swal from 'sweetalert2';
import { map, catchError, tap } from 'rxjs/operators';



@Injectable()
export class LeyProvincialService {
  private urlEndPoint: string = 'http://localhost:8080/api/leyesProvinciales'; //defino EndPoint del BACK

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }) //especificamos el tipo de contenido que estamos enviando desde el cliente angular hacia el api rest, los datos los estamos enviando en estructura json

  constructor(private http: HttpClient) { } //se inyecta la referencia a HttpClient

  //----------- METODOS -----------//

  /*Para traer las leyes
  getLeyesProvinciales(): Observable <LeyProvincial[]> { //convierte el listado de leyes en un Observable
   return this.http.get<LeyProvincial[]>(this.urlEndPoint); //lleva el THIS porque es un atributo
 } */

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


  //para crear una ley
  create(leyProvincial: LeyProvincial): Observable<LeyProvincial> {
    return this.http.post<LeyProvincial>(this.urlEndPoint, leyProvincial, { headers: this.httpHeaders })
  }

  //para traer ley por ID
  getLeyProvincial(id): Observable<LeyProvincial> {
    return this.http.get<LeyProvincial>(`${this.urlEndPoint}/${id}`)
  }

  //para modificar ley por ID
  update(leyProvincial: LeyProvincial): Observable<LeyProvincial> {
    return this.http.put<LeyProvincial>(`${this.urlEndPoint}/${leyProvincial.id}`, leyProvincial, { headers: this.httpHeaders })
  }

  //eliminar
  delete(id: number): Observable<LeyProvincial> {
    return this.http.delete<LeyProvincial>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders })
  }

  //Subir Archivo
  /*  subirArchivo(archivo: File, id): Observable<LeyProvincial> {
      let formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("id", id);
      return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
        map((response: any) => response.leyprovincial as LeyProvincial),
        catchError(e => {
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    } */

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
