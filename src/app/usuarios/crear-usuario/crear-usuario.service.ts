import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; //Observable esta basado en el patron Observador
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';

@Injectable({
    providedIn: 'root'
})

export class CrearUsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let Usuario = response as Usuario[];
        return Usuario.map(usuario => {
          return usuario;
        });
      }
      )
    );
  }


}
