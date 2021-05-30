import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageFooterComponent } from './page-footer.component';

describe('PageFooterComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                PageFooterComponent
            ],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(PageFooterComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should render author name', () => {
        const fixture = TestBed.createComponent(PageFooterComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('footer').textContent).toContain('Dwight Mowbray');
    });

    it('should render link to author GitHub', () => {
        const fixture = TestBed.createComponent(PageFooterComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        const a: Element = compiled.querySelector('footer a');
        expect(a.getAttribute('href')).toEqual('https://github.com/greenwebdev');
    });
});
