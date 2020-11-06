import { async, TestBed } from '@angular/core/testing';
import { RepPushShipmentListComponent } from './rep-push-shipment-list.component';
describe('RepPushShipmentListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [RepPushShipmentListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(RepPushShipmentListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=rep-push-shipment-list.component.spec.js.map