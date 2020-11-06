import { TestBed, inject } from '@angular/core/testing';
import { MapperService } from './mapper.service';
describe('MapperService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [MapperService]
        });
    });
    it('should be created', inject([MapperService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=mapper.service.spec.js.map