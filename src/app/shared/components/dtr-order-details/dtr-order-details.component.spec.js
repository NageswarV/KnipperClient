import { async, TestBed } from '@angular/core/testing';
import { DtrOrderDetailsComponent } from './dtr-order-details.component';
describe('DtrOrderDetailsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DtrOrderDetailsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DtrOrderDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=dtr-order-details.component.spec.js.map