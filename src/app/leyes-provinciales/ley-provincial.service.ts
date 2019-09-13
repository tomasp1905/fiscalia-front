import { Injectable } from '@angular/core';
import { LeyProvincial } from './ley-provincial.js';
import { of, Observable } from 'rxjs'; //Observable esta basado en el patron Observador
import { HttpClient } from '@angular/common/http';



@Injectable()
export class LeyProvincialService {
  private urlEndPoint: string = 'http://localhost:8080/api/leyesProvinciales'; //defino EndPoint del BACK

  constructor(private http: HttpClient) { } //se inyecta la referencia a HttpClient

  getLeyesProvinciales(): Observable <LeyProvincial[]> { //convierte el listado de leyes en un Observable

   return this.http.get<LeyProvincial[]>(this.urlEndPoint); //lleva el THIS porque es un atributo

  }
}
