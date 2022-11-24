import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnosPacientes'
})
export class TurnosPacientesPipe implements PipeTransform {

  transform(value:any[], filter:any): any[] {
    let filterData:any[];
    filterData = value.filter(
      data => data.pacienteEmail == filter
    );
    filterData.slice(0,3);
    filterData = filterData.sort(
      (objA, objB) => objA.fecha.getTime() - objB.fecha.getTime(),
    )
    return filterData;
  }

}
