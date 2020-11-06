import { async, TestBed } from '@angular/core/testing';
import { ExpandableTableRowComponent } from './expandable-table-row.component';
describe('ExpandableTableRowComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ExpandableTableRowComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ExpandableTableRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=expandable-table-row.component.spec.js.map