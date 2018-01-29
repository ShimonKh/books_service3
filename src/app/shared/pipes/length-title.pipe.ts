import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lengthTitle'
})
export class LengthTitlePipe implements PipeTransform {

  transform(title) {
    return title.length>60 ? title.slice(0,60)+'...' : title;
  }

}
