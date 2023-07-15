import { Pipe, PipeTransform } from '@angular/core';
import { Service } from 'src/app/interfaces/services.interfaces';

@Pipe({
  name: 'programmable'
})
export class ProgrammablePipe implements PipeTransform {

  transform( value: number ) {
    let text: string = "";
    switch ( value ) {
      case 14:
        text = 'Quincenal';
        break;
      case 30:
        text = 'Mensual';
        break;
      case 90:
        text = 'Trimestral';
        break;
      case 360:
        text = 'Anual';
        break;
      default:
        text = 'Sin programación';
        break;
    }
    return text;
  }

}
