import { async, TestBed } from '@angular/core/testing';
import { MultiSelectSearchComponent } from './multi-select-search.component';
describe('MultiSelectSearchComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [MultiSelectSearchComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MultiSelectSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=multi-select-search.component.spec.js.map