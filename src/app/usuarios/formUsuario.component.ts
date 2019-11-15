import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { CrearUsuarioService } from './crear-usuario/crear-usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './formUsuario.component.html',
  styleUrls: ['./formUsuario.component.css']
})
export class FormComponentUsuario implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private crearUsuarioService:CrearUsuarioService, private router: Router,
  private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
  }

  public createUsuario():void {
    this.crearUsuarioService.createUsuario(this.usuario).subscribe(
      response => this.router.navigate(['crearUsuario'])
    )
  }

  public updateUsuario(): void{
    this.crearUsuarioService.updateUsuario(this.usuario).subscribe(
      response => this.router.navigate(['crearUsuario'])
    )
  }

}
