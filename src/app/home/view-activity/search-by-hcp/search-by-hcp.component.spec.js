import { async, TestBed } from '@angular/core/testing';
import { SearchByHCPComponent } from './search-by-hcp.component';
describe('SearchByHCPComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SearchByHCPComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SearchByHCPComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=search-by-hcp.component.spec.js.map