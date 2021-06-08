import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { QuotesModule } from '../quotes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { PremiumQuoteComponent } from './premium-quote.component';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

let loader: HarnessLoader;

describe('PremiumQuoteComponent', () => {
    let fixture: ComponentFixture<PremiumQuoteComponent>;
    let component: PremiumQuoteComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, QuotesModule], declarations: [PremiumQuoteComponent],
            providers: [FormBuilder]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PremiumQuoteComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    beforeEach(() => {
        component = fixture.componentInstance;
        let formBuilder = TestBed.get(FormBuilder);
        component.quoteForm = formBuilder.group({
            name: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            occupationId: ['', Validators.required],
            sumInsured: [component.sumInsured, Validators.required],
            age: [0]
        });

        component.ngOnInit();
        fixture.detectChanges();
    })

    it('should initialise with an empty form and a disabled form button', async () => {
        spyOn(fixture.componentInstance, 'onSubmit');
        const calculateButton = await loader.getHarness(
            MatButtonHarness.with({ selector: '#btnCalculate', text: 'Calculate' }));
        expect(fixture.componentInstance.hasCalculated).toBe(false);
        expect(await calculateButton.isDisabled()).toBe(true);
    });

    it('should contain name field', async () => {
        const nameInput = await loader.getHarness(
            MatInputHarness.with({ selector: '#name' })
        );

        expect(await nameInput.getValue()).toBe('');
        const nameControl = fixture.componentInstance.quoteForm.controls.name;
        nameControl.setValue('Dwight Test');
        expect(await nameInput.getValue()).toBe('Dwight Test');
    });

    it('should contain date of birth field', async () => {
        const dobDatePicker = await loader.getHarness(
            MatDatepickerInputHarness.with({ selector: '#dateOfBirth' })
        );

        expect(await dobDatePicker.getValue()).toBe('');
    });

    it('should contain occupation field', async () => {
        const occupationSelect = await loader.getHarness(
            MatSelectHarness.with({ selector: '#occupationId' })
        );

        expect(await occupationSelect.getValueText()).toBe('');
    });

    it('should contain sum insured slider', async () => {
        const sumInsuredSlider = await loader.getHarness(
            MatSliderHarness.with({ selector: '#sumInsuredSlider' })
        );

        expect(await sumInsuredSlider.getValue()).toBe(fixture.componentInstance.sumInsured);
    });

    it('should calculate age when a date of birth is entered', async () => {
        const givenDate = '18/11/1981';
        const givenAge = moment().diff(moment(givenDate, 'DD-MM-YYYY'), 'years');

        const dobDatePicker = await loader.getHarness(
            MatDatepickerInputHarness.with({ selector: '#dateOfBirth' })
        );

        await dobDatePicker.setValue(givenDate);
        fixture.detectChanges()
        dobDatePicker.blur();
        fixture.detectChanges();
        expect(await dobDatePicker.getValue()).toBe(givenDate);
        fixture.detectChanges();

        // Set this manually, there's an issue with it setting using (dateChange)
        const dobControl = fixture.componentInstance.quoteForm.controls.dateOfBirth;
        dobControl.setValue(moment(givenDate, 'DD-MM-YYYY'));
        fixture.detectChanges();

        expect(await component.quoteForm.controls.dateOfBirth.value.format('DD/MM/YYYY')).toBe(givenDate);
        expect(fixture.componentInstance.quoteForm.controls.age.value).toBe(givenAge);
    });

    it('should enable calculate button when all values are set', async () => {
        const givenDate = '18/11/1981';

        spyOn(fixture.componentInstance, 'onSubmit');
        const nameInput = await loader.getHarness(
            MatInputHarness.with({ selector: '#name' })
        );
        const dobDatePicker = await loader.getHarness(
            MatDatepickerInputHarness.with({ selector: '#dateOfBirth' })
        );
        const occupationSelect = await loader.getHarness(
            MatSelectHarness.with({ selector: '#occupationId' })
        );
        const sumInsuredSlider = await loader.getHarness(
            MatSliderHarness.with({ selector: '#sumInsuredSlider' })
        );
        const calculateButton = await loader.getHarness(
            MatButtonHarness.with({ selector: '#btnCalculate', text: 'Calculate' }));

        await calculateButton.click();
        expect(fixture.componentInstance.onSubmit).not.toHaveBeenCalled();

        await nameInput.setValue('Test Person');
        await dobDatePicker.setValue(givenDate);
        await dobDatePicker.blur();
        fixture.detectChanges();
        await (await occupationSelect.host()).click();
        await occupationSelect.open();
        await occupationSelect.clickOptions({ text: 'Doctor' });
        await sumInsuredSlider.setValue(600000);
        fixture.detectChanges();

        expect(await nameInput.getValue()).toBe('Test Person');
        expect(await dobDatePicker.getValue()).toBe(givenDate);
        expect(await occupationSelect.getValueText()).toBe('Doctor');

        // For some reason material datepicker setValue() is not updating this reactive form field:
        // We do it manually here, but that's a hacky fix.
        const dobControl = fixture.componentInstance.quoteForm.controls.dateOfBirth;
        dobControl.setValue(moment(await dobDatePicker.getValue(), 'DD-MM-YYYY'));
        expect(fixture.componentInstance.quoteForm.valid).toBe(true);
        expect(await calculateButton.isDisabled()).toBe(false);
        await calculateButton.click();
        expect(fixture.componentInstance.onSubmit).toHaveBeenCalled();
    });
});