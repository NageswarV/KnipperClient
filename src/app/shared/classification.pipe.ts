import { Pipe, PipeTransform } from '@angular/core';

import { UtilityService } from '../shared/utility.service';

@Pipe({ name: 'sgClassification' })
export class ClassificationPipe implements PipeTransform {
    constructor(private utilityService: UtilityService) { }

    transform(classId: string) {
        // Implement translation service
        return this.utilityService.getClassificationValueNameByValueId(classId);
    }
}
