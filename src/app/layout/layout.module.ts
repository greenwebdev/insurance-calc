import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { PageFooterComponent } from './page-footer/page-footer.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NavbarComponent,
        PageFooterComponent
    ],
    exports: [
        NavbarComponent,
        PageFooterComponent
    ]
})
export class LayoutModule { }