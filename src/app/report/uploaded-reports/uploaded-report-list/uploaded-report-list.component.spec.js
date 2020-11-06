import { async, TestBed } from '@angular/core/testing';
import { UploadedReportListComponent } from './uploaded-report-list.component';
describe('UploadedReportListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [UploadedReportListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(UploadedReportListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=uploaded-report-list.component.spec.js.map