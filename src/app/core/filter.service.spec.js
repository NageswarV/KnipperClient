import { TestBed, inject } from '@angular/core/testing';
import { FilterService } from './filter.service';
describe('FilterService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [FilterService]
        });
    });
    it('should be created', inject([FilterService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=filter.service.spec.js.map