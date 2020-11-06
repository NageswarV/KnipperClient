import { Pipe, PipeTransform } from '@angular/core';
import { UtilityService } from '../../shared/utility.service';

@Pipe({ name: 'sgCustomString' })
export class CustomStringPipe implements PipeTransform {
    constructor(private utilityService: UtilityService) { }

  transform(str: string): string {
      return this.utilityService.nullToNAString(str);
    }
}
