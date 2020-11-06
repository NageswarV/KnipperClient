import { async, TestBed } from '@angular/core/testing';
import { RepOrderListFilterComponent } from './rep-order-list-filter.component';
describe('RepOrderListFilterComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [RepOrderListFilterComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(RepOrderListFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=rep-order-list-filter.component.spec.js.map