import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import {CrearUsuarioService} from './crear-usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuarioService:CrearUsuarioService ) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(usuarios => this.usuarios = usuarios);
  }

}
