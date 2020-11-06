import { async, TestBed } from '@angular/core/testing';
import { FileAttachmentDescriptionComponent } from './file-attachment-description.component';
describe('FileAttachmentDescriptionComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FileAttachmentDescriptionComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FileAttachmentDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=file-attachment-description.component.spec.js.map