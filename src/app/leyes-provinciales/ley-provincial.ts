export class LeyProvincial {
  id: number;
  numero: string;
  titulo: string;
  fechaSancion: string;
  publicacionBO: string;
  archivo: string;
  listaDeLeyes: Array<LeyProvincial> = [];
}
