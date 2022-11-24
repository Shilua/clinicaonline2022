import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any[], filtro:string): any[] {
  if (filtro == '') {
    return value
  }

  let filterData:any[]
  filterData = value.filter(
    data => data.especialidad.includes(filtro) ||
    data.paciente.includes(filtro) ||
    data.especialista.includes(filtro) ||
    data.estado.includes(filtro) ||
    data.puntuacion.incluses(filtro) ||
    data.historiaClinica.forEach((element:any) => {
     element.includes(filtro)
    })
  )


  return filterData;
  }

}
