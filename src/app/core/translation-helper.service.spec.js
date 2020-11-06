import { TestBed, inject } from '@angular/core/testing';
import { TranslationHelperService } from './translation-helper.service';
describe('TranslationService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [TranslationHelperService]
        });
    });
    it('should be created', inject([TranslationHelperService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=translation-helper.service.spec.js.map