import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationGuard } from './authentication.guard';
describe('AuthenticationGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [AuthenticationGuard]
        });
    });
    it('should ...', inject([AuthenticationGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=authentication.guard.spec.js.map