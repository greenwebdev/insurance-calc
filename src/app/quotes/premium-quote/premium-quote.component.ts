import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { audFormatter } from '../quotes.util';
import { ratings, occupations } from '../quote-data';

@Component({
    selector: 'premium-quote',
    templateUrl: './premium-quote.component.html',
    styleUrls: ['./premium-quote.component.scss']
})
export class PremiumQuoteComponent implements OnInit {
    submitted = false;

    // name: string = '';
    sumInsured: number = 500000;
    // age: number = 0;
    monthlyPremium: number = 0;
    // occupationId: any = null;
    hasCalculated: boolean = false;
    occupations = occupations;
    // isValid: boolean = false;

    quoteForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.quoteForm = this.formBuilder.group({
            name: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            occupationId: ['', Validators.required],
            sumInsured: [this.sumInsured, Validators.required],
            age: [0]
        });
    }

    onSubmit() {
        // this.setFormValid();
        this.calculatePremium();
        this.submitted = true;
    }

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
        // console.info('onChangeOcc', occupation, this.quoteForm);
        // this.quoteForm.controls.occupationId = occupation;
        if (this.hasCalculated) {
            this.calculatePremium();
        }
    }

    calculateAge(date: any): void {
        console.info('calculateAge', date);
        if (date) {
            this.quoteForm.controls.age.setValue(moment().diff(date, 'years'));
            console.info('this.quoteForm.controls.age.value', this.quoteForm.controls.age.value);
        }
    }

    calculatePremium(): void {
        //Death Premium = (Death Cover amount * Occupation Rating Factor * Age) /1000 * 12
        // const ratingIndex = this.occupations[this.occupationId].ratingIndex;
        const occupation = occupations.find(occupation => occupation.id === this.quoteForm.controls.occupationId.value);
        const ratingIndex: number = occupation?.ratingIndex ?? -1;
        let rating = ratingIndex >= 0 ? ratings[ratingIndex] : null;
        if (!rating) {
            return;
        }

        let premium: number = (this.quoteForm.controls.sumInsured.value * rating.factor * this.quoteForm.controls.age.value) / (1000 * 12);
        this.monthlyPremium = premium;
        this.hasCalculated = true;
    }

    onChangeDate(dateValue: any) {
        console.info('onChange datepicker', dateValue);
        // this.calculateAge(moment(dateValue, 'DD-MM-YYYY'));
        this.quoteForm.controls.age.setValue(moment().diff(moment(dateValue, 'DD-MM-YYYY'), 'years'));
        // this.quoteForm.controls.dateOfBirth.setValue(moment().diff(moment(dateValue, 'DD-MM-YYYY'), 'years'));
        console.info('date change', moment(dateValue, 'DD-MM-YYYY'), this.quoteForm.controls.dateOfBirth.value);
        if (this.hasCalculated) {
            this.calculatePremium();
        }
    }
}
