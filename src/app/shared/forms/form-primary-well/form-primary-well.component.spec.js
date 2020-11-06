import { async, TestBed } from '@angular/core/testing';
import { FormPrimaryWellComponent } from './form-primary-well.component';
describe('FormPrimaryWellComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FormPrimaryWellComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FormPrimaryWellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=form-primary-well.component.spec.js.map