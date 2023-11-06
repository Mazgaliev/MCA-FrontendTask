import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunctuateTitles'
})
export class TrunctuateTitlesPipe implements PipeTransform {

  transform(value: string): string {

    return value.length > 30 ? value.slice(0, 30) + '...' : value;
  }

}
