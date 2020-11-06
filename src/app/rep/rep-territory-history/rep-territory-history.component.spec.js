import { async, TestBed } from '@angular/core/testing';
import { RepTerritoryHistoryComponent } from './rep-territory-history.component';
describe('RepTerritoryHistoryComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [RepTerritoryHistoryComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(RepTerritoryHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=rep-territory-history.component.spec.js.map