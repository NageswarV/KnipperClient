import { async, TestBed } from '@angular/core/testing';
import { GenerateReportFilterComponent } from './generate-report-filter.component';
describe('GenerateReportFilterComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [GenerateReportFilterComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(GenerateReportFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=generate-report-filter.component.spec.js.map