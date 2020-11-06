import { Pipe, PipeTransform } from '@angular/core';

import { UtilityService } from '../shared/utility.service';

import * as cls from '../../generated/classification-values';

@Pipe({ name: 'sgClassificationUom' })
export class ClassificationUomPipe implements PipeTransform {
    constructor(private utilityService: UtilityService) { }

    transform(classId: string, multiplier: number, orderedQty: number) {
        return this.utilityService.getClassificationUnitOfMeasure(classId, multiplier,orderedQty);
    }

}
