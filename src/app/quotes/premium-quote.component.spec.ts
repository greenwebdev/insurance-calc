import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture } from '@angular/core/testing';
import { PremiumQuoteComponent } from './premium-quote.component';

describe('PremiumQuoteComponent', () => {
    let component: PremiumQuoteComponent;
    let fixture: ComponentFixture<PremiumQuoteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                PremiumQuoteComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PremiumQuoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
