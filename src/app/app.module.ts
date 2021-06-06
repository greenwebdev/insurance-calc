import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PremiumQuoteComponent } from './quotes/premium-quote.component';

import 'moment/locale/en-au';

@NgModule({
    declarations: [
        AppComponent,
        PremiumQuoteComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        MatSliderModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatMomentDateModule,
        NoopAnimationsModule,
        LayoutModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-AU' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
