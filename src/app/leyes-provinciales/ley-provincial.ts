import { DecretoReglamentario } from './decretos-reglamentarios/decretosReglamentarios';

export class LeyProvincial {
  id: number;
  numero: string;
  titulo: string;
  fechaSancion: string;
  publicacionBO: string;
  archivo: string;
  listaDeLeyes: Array<LeyProvincial> = [];
  archivoActualizado: string;

  //DECRETOS REGLAMENTARIOS
  archivoDecretoReglamentario:string;
  archivoDecretoReglamentario2:string;


  listaDeDecretosReglamentarios: Array<DecretoReglamentario> = [];

}
