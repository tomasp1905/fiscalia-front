import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'

})
export class LoginComponent implements OnInit {

  titulo:string = 'INICIAR SESIÓN';
  usuario:Usuario;

  constructor(private authservice: AuthService, private router: Router) {
   this.usuario = new Usuario();
   }

  ngOnInit() {
    if(this.authservice.isAuthenticated()){
      swal.fire('Login',`${this.authservice.usuario.username} ya se encuentra autenticado`, 'info' );
      this.router.navigate(['/leyesProvinciales']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error Login', 'Usuario o Contraseña vacías', 'error');
      return
    }

    this.authservice.login(this.usuario).subscribe(response => {
       console.log(response);

        this.authservice.guardarUsuario(response.access_token);
        this.authservice.guardarToken(response.access_token);

        let usuario = this.authservice.usuario;

      this.router.navigate(['/leyesProvinciales']);
      swal.fire('Login', `Usuario ${usuario.username} ha ingresado correctamente`, 'success');
    }, err => {
      if(err.status == 400){
        swal.fire('Error Login', 'Usuario o Contraseña incorrecta', 'error');
      }
    }
  );
  }



}
