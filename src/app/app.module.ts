import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { QuotesModule } from './quotes/quotes.module';
import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { APP_DATE_FORMATS } from './shared/date-formats';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import 'moment/locale/en-au';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        LayoutModule,
        QuotesModule
    ],
    providers: [
        // Date formats and locale setup
        { provide: MAT_DATE_LOCALE, useValue: 'en-AU' },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
