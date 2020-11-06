import { async, TestBed } from '@angular/core/testing';
import { HandcarryDistbursementOrderDetailsComponent } from './handcarry-distbursement-order-details.component';
describe('HandcarryDistbursementOrderDetailsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [HandcarryDistbursementOrderDetailsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(HandcarryDistbursementOrderDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=handcarry-distbursement-order-details.component.spec.js.map