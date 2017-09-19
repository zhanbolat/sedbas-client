import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {routing} from './app.routing';

import {AppComponent} from './app.component';
import {HomeModule} from "./core/components/home/home.module";
import {TasksModule} from "./core/components/tasks/tasks.module";
import {CasesModule} from "./core/components/cases/cases.module";
import {ProcessesModule} from "./core/components/processes/processes.module";

@NgModule({
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        CoreModule,
        AuthModule,
        HomeModule,
        TasksModule,
        CasesModule,
        ProcessesModule,
        routing
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
