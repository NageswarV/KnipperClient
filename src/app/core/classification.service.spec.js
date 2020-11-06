import { TestBed, inject } from '@angular/core/testing';
import { ClassificationService } from './classification.service';
describe('ClassificationService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [ClassificationService]
        });
    });
    it('should be created', inject([ClassificationService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=classification.service.spec.js.map