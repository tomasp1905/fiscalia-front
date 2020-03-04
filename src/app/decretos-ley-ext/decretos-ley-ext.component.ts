import { Component, OnInit } from '@angular/core';
import { DecretoLey } from '../decretos-ley/decretoLey';
import { DecretoLeyExtService } from './decreto-ley-ext.service';
import { DecretoLeyExt } from './decreto-ley';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'app-decretos-ley-ext',
  templateUrl: './decretos-ley-ext.component.html',
  styleUrls: ['./decretos-ley-ext.component.css']
})
export class DecretosLeyExtComponent implements OnInit {

  constructor(private decretoLeyExtService: DecretoLeyExtService) { }

  decretosLey: DecretoLey[];

  decretosAuto: DecretoLeyExt[];

  autocompleteControlPorTitulo = new FormControl();
  decretosLeyFiltradosPorTitulo: Observable<DecretoLey[]>;
  autocompleteControlPorNumero = new FormControl();
  decretosLeyFiltradosPorNumero: Observable<DecretoLey[]>;
  autocompleteControlPorAnio = new FormControl();
  decretosLeyFiltradosPorAnio: Observable<DecretoLey[]>;

  decretoLeyExt: DecretoLeyExt = new DecretoLeyExt();

  ngOnInit() {

    this.decretoLeyExtService.getDecretosLey().subscribe( //llama al metodo GET del Service
      decretosLey => this.decretosLey = decretosLey //es el Observador, esto actualiza el listado de leyes y lo pasa a la vista con los posibles cambios
    );

    this.decretosLeyFiltradosPorTitulo = this.autocompleteControlPorTitulo.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value: value.titulo),
        flatMap(value =>value ?  this._filterPorTitulo(value): [] )
      );

      this.decretosLeyFiltradosPorNumero = this.autocompleteControlPorNumero.valueChanges
        .pipe(
          map(value => typeof value === 'string'? value: value.numero),
          flatMap(value =>value ?  this._filterPorNumero(value): [] )
        );

        this.decretosLeyFiltradosPorAnio = this.autocompleteControlPorAnio.valueChanges
          .pipe(
            map(value => typeof value === 'string'? value: value.anio),
            flatMap(value =>value ?  this._filterPorAnio(value): [] )
          );

  }

  private _filterPorTitulo(value: string): Observable<DecretoLey[]> {
    const filterValue = value.toLowerCase();

    return this.decretoLeyExtService.filtrarDecretosLeyPorTitulo(filterValue);
  }

  private _filterPorNumero(value: string): Observable<DecretoLey[]> {
    const filterValue = value.toLowerCase();

    return this.decretoLeyExtService.filtrarDecretosLeyPorNumero(filterValue);
  }

  private _filterPorAnio(value: string): Observable<DecretoLey[]> {
    const filterValue = value.toLowerCase();

    return this.decretoLeyExtService.filtrarDecretosLeyPorAnio(filterValue);
  }

  mostrarNombrePorTitulo(decretosAuto?: DecretoLey):string | undefined {
    return decretosAuto? decretosAuto.titulo: undefined;
  }

  mostrarNombrePorNumero(decretosAuto?: DecretoLey):string | undefined {
    return decretosAuto? decretosAuto.numero: undefined;
  }

  mostrarNombrePorAnio(decretosAuto?: DecretoLey):string | undefined {
    return decretosAuto? decretosAuto.anio: undefined;
  }

  seleccionarDecretoLeyPorTitulo(event: MatAutocompleteSelectedEvent) : void {
    let decretoLey = event.option.value as DecretoLey;
    console.log(decretoLey);
    this.decretoLeyExt.listaDeDecretosLey.push(decretoLey);

    this.autocompleteControlPorTitulo.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  seleccionarDecretoLeyPorNumero(event: MatAutocompleteSelectedEvent) : void {
    let decretoLey = event.option.value as DecretoLey;
    console.log(decretoLey);
    this.decretoLeyExt.listaDeDecretosLey.push(decretoLey);

    this.autocompleteControlPorNumero.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  seleccionarDecretoLeyPorAnio(event: MatAutocompleteSelectedEvent) : void {
    let decretoLey = event.option.value as DecretoLey;
    console.log(decretoLey);
    this.decretoLeyExt.listaDeDecretosLey.push(decretoLey);

    this.autocompleteControlPorAnio.setValue('');
    event.option.focus();
    event.option.deselect();

  }


}
