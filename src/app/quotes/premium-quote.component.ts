import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { audFormatter } from './quotes.util';
import { ratings, occupations } from './quote-data';

@Component({
    selector: 'premium-quote',
    templateUrl: './premium-quote.component.html',
    styleUrls: ['./premium-quote.component.scss'],
    providers: []
})
export class PremiumQuoteComponent {
    name: string = '';
    sumInsured: number = 500000;
    age: number = 0;
    monthlyPremium: number = 0;
    occupationId: any = null;
    hasCalculated: boolean = false;
    occupations = occupations;

    onSliderChange(sliderValue: any) {
        this.sumInsured = sliderValue;
        if (this.hasCalculated) {
            this.calculatePremium();
        }
        console.info('occupation', this.occupationId);
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
        return audFormatter.format(this.sumInsured);
    }

    onChangeOccupation(occupation: any) {
        this.occupationId = occupation;
        if (this.hasCalculated) {
            this.calculatePremium();
        }
    }

    isFormValid() {
        return this.age && this.age >= 18 && this.occupationId && this.name !== '' ? true : false;
    }

    calculatePremium(): void {
        if (!this.isFormValid()) {
            return;
        }
        //Death Premium = (Death Cover amount * Occupation Rating Factor * Age) /1000 * 12
        // const ratingIndex = this.occupations[this.occupationId].ratingIndex;
        const occupation = occupations.find(occupation => occupation.id === this.occupationId);
        const ratingIndex: number = occupation?.ratingIndex ?? -1;
        let rating = ratingIndex >= 0 ? ratings[ratingIndex] : null;
        if (!rating) {
            return;
        }

        let premium: number = (this.sumInsured * rating.factor * this.age) / (1000 * 12);
        this.monthlyPremium = premium;
        this.hasCalculated = true;
    }

    onCalculate() {
        this.calculatePremium();
    }

    onChangeDate(type: string, event: MatDatepickerInputEvent<Date>) {
        this.age = moment().diff(event.value, 'years');
        if (this.hasCalculated) {
            this.calculatePremium();
        }
    }
}
