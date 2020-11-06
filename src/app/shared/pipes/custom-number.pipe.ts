import { Pipe, PipeTransform } from '@angular/core';
import { UtilityService } from '../../shared/utility.service';

@Pipe({ name: 'sgCustomNumber' })
export class CustomNumberPipe implements PipeTransform {
    constructor(private utilityService: UtilityService) { }

    transform(num: number): number {
        return this.utilityService.correctNegativeNumber(num);
    }
}
