import { async, TestBed } from '@angular/core/testing';
import { BlackoutHoldModalComponent } from './blackout-hold-modal.component';
describe('BlackoutHoldModalComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [BlackoutHoldModalComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BlackoutHoldModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=blackout-hold-modal.component.spec.js.map