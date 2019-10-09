import { Injectable } from '@angular/core';
import { LeyProvincial } from './ley-provincial.js';
import { Observable, throwError } from 'rxjs'; //Observable esta basado en el patron Observador
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { formatDate } from '@angular/common';
import swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service.js';



@Injectable()
export class LeyProvincialService {
  private urlEndPoint: string = 'http://localhost:8080/api/leyesProvinciales'; //defino EndPoint del BACK

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }); //especificamos el tipo de contenido que estamos enviando desde el cliente angular hacia el api rest, los datos los estamos enviando en estructura json


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { } //se inyecta la referencia a HttpClient

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null ){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

 // PARA LOGIN
  private isNoAutorizado(e):boolean{
    if(e.status==401 || e.status==403) { //401 es NO AUTORIZADO, carece de credenciales válidas || 403 servidor ha denegado el acceso
     this.router.navigate(['/login'])
     return true;
   }
   return false;
  }

  //----------- METODOS -----------//


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
    return this.http.post(this.urlEndPoint, leyProvincial, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.leyProvincial as LeyProvincial),
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }

        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //para traer ley por ID
  getLeyProvincial(id): Observable<LeyProvincial> {
    return this.http.get<LeyProvincial>(`${this.urlEndPoint}/${id}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.router.navigate(['/leyesProvinciales'])
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //para modificar ley por ID
  update(leyProvincial: LeyProvincial): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${leyProvincial.id}`, leyProvincial, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //eliminar
  delete(id: number): Observable<LeyProvincial> {
    return this.http.delete<LeyProvincial>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );

  }


  subirArchivo(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders= httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req);
  }




}
