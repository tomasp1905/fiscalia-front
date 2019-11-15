import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import {CrearUsuarioService} from './crear-usuario.service';
import swal from 'sweetalert2';
import {FormControl} from '@angular/forms';

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


    deleteUsuario(usuario: Usuario): void {
      swal.fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar la Ley ${usuario.username}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {

          this.usuarioService.deleteUsuario(usuario.id).subscribe(
            response => {
              this.usuarios = this.usuarios.filter(user => user !== usuario)
              swal.fire(
                'Ley Eliminada!',
                `Ley ${usuario.username} eliminada con éxito.`,
                'success'
              )

            }
          )

        }
      })
    }

}
