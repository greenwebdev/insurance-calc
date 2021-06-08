import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { audFormatter } from '../quotes.util';
import { QuoteConfig } from '../quote-config';
import { ConfigService } from '../config.service';
import { OccupationRating } from '../occupation-rating';
import { DEFAULT_FACTOR } from '../../config';

@Component({
    selector: 'premium-quote',
    templateUrl: './premium-quote.component.html',
    providers: [
        ConfigService
    ],
    styleUrls: ['./premium-quote.component.scss']
})
export class PremiumQuoteComponent implements OnInit {
    defaultSumInsured = 500000;
    monthlyPremium: number = 0;
    hasCalculated: boolean = false;
    quoteConfig: QuoteConfig | undefined;
    isLoading: boolean = true;

    quoteForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private configService: ConfigService) {
    }

    ngOnInit() {
        this.quoteForm = this.formBuilder.group({
            name: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            occupationId: ['', Validators.required],
            sumInsured: [this.defaultSumInsured, Validators.required],
            age: [0]
        });

        this.getConfig();
    }

    getConfig(): void {
        this.configService.getQuoteConfig()
            .subscribe(config => {
                setTimeout(() => {
                    this.isLoading = false;
                }, 500);
                this.quoteConfig = config;
            }, (err: HttpErrorResponse) => {
                console.info('error', err);
                this.isLoading = false;
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
        const occupation = this.quoteConfig?.occupations.find(occupation => occupation.id === occupationId);
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
        const occupation = this.quoteConfig?.occupations.find(occupation => occupation.id === this.quoteForm.controls.occupationId.value);
        const ratingIndex: number = occupation?.ratingIndex ?? -1;
        let rating: OccupationRating | undefined = this.quoteConfig?.occupationRatings[ratingIndex];

        this.monthlyPremium = (this.quoteForm.controls.sumInsured.value * (rating ? rating?.factor : DEFAULT_FACTOR) * this.quoteForm.controls.age.value) / (1000 * 12);
        this.hasCalculated = true;
    }

    onChangeDate(dateValue: any) {
        this.quoteForm.controls.age.setValue(moment().diff(moment(dateValue, 'DD-MM-YYYY'), 'years'));
        if (this.hasCalculated) {
            this.calculatePremium();
        }
    }
}
