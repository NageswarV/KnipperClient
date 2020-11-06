import { async, TestBed } from '@angular/core/testing';
import { SpinnerOverlayComponent } from './spinner-overlay.component';
describe('SpinnerOverlayComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SpinnerOverlayComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SpinnerOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=spinner-overlay.component.spec.js.map