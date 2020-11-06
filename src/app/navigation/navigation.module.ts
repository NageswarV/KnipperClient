import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { NavigationComponent } from './navigation.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
    SharedModule,
    CommonModule, 
    BrowserModule
    ],
    declarations: [
        NavigationComponent
    ],
    exports: [
        NavigationComponent
    ]
})
export class NavigationModule { }
