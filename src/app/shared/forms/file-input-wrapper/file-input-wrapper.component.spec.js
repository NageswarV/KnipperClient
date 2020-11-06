import { async, TestBed } from '@angular/core/testing';
import { FileInputWrapperComponent } from './file-input-wrapper.component';
describe('FileInputWrapperComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FileInputWrapperComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FileInputWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=file-input-wrapper.component.spec.js.map