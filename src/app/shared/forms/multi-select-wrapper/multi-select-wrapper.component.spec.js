import { async, TestBed } from '@angular/core/testing';
import { MultiSelectWrapperComponent } from './multi-select-wrapper.component';
describe('MultiSelectWrapperComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [MultiSelectWrapperComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MultiSelectWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=multi-select-wrapper.component.spec.js.map