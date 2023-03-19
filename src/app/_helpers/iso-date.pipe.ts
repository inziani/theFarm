import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'isoDate',
})
export class IsoDatePipe extends DatePipe implements PipeTransform {
  /**
   * Returns the date in ISO format - <b>2019-01-01 12:34:56</b>
   */
  transform(value: Date | string | number): string | null;
  transform(value: null | undefined): null;
  transform(value: Date | string | number | null | undefined): string | null;
  transform(value: Date | string | number | null | undefined): string | null {
    return super.transform(value, 'yyyy-MM-dd HH:mm:ss');
  }
}
