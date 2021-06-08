import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { audFormatter } from '../quotes.util';
import { ratings, occupations } from '../quote-data';

@Component({
    selector: 'premium-quote',
    templateUrl: './premium-quote.component.html',
    styleUrls: ['./premium-quote.component.scss']
})
export class PremiumQuoteComponent implements OnInit {

    monthlyPremium: number = 0;
    hasCalculated: boolean = false;
    occupations = occupations;

    quoteForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.quoteForm = this.formBuilder.group({
            name: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            occupationId: ['', Validators.required],
            sumInsured: [500000, Validators.required],
            age: [0]
        });
    }

    onSubmit() {
        this.calculatePremium();
    }

    /**
     * Set the control value manually on slider change. Without this the changes are sluggish.
     * @param sliderValue Value of the material slider component
     */
    onSliderChange(sliderValue: any) {
        this.quoteForm.controls.sumInsured.setValue(sliderValue);
        if (this.hasCalculated) {
            this.calculatePremium();
        }
    }

    /**
     * Format the occupation and its indefinite article prefix.
     * @param occupationId 
     * @returns {String}
     */
    formatOccupation(occupationId: number) {
        const occupation = occupations.find(occupation => occupation.id === occupationId);
        return `${occupation?.prefix ?? ''} ${occupation?.label ?? ''}` ?? '';
    }

    formatSumInsured() {
        return audFormatter.format(this.quoteForm.controls.sumInsured.value);
    }

    onChangeOccupation() {
        if (this.hasCalculated) {
            this.calculatePremium();
        }
    }

    calculatePremium(): void {
        //Death Premium = (Death Cover amount * Occupation Rating Factor * Age) /1000 * 12
        const occupation = occupations.find(occupation => occupation.id === this.quoteForm.controls.occupationId.value);
        const ratingIndex: number = occupation?.ratingIndex ?? -1;
        let rating = ratingIndex >= 0 ? ratings[ratingIndex] : { factor: 1 };

        this.monthlyPremium = (this.quoteForm.controls.sumInsured.value * rating.factor * this.quoteForm.controls.age.value) / (1000 * 12);
        this.hasCalculated = true;
    }

    onChangeDate(dateValue: any) {
        this.quoteForm.controls.age.setValue(moment().diff(moment(dateValue, 'DD-MM-YYYY'), 'years'));
        if (this.hasCalculated) {
            this.calculatePremium();
        }
    }
}
