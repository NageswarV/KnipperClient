import { async, TestBed } from '@angular/core/testing';
import { SamplicityChartComponent } from './samplicity-chart.component';
describe('SamplicityChartComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SamplicityChartComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SamplicityChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=samplicity-chart.component.spec.js.map