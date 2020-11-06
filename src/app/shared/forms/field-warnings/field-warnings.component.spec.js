import { async, TestBed } from '@angular/core/testing';
import { FieldWarningsComponent } from './field-warnings.component';
describe('FieldWarningsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FieldWarningsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FieldWarningsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=field-warnings.component.spec.js.map