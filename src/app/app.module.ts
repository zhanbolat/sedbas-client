import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './core/components/home/home.module';
import {TasksModule} from './core/components/tasks/tasks.module';
import {routing} from './app.routing';

import {AppComponent} from './app.component';
import {CasesModule} from "./core/components/cases/cases.module";
import {ProcessesModule} from "./core/components/processes/processes.module";

@NgModule({
    imports: [
        BrowserModule,
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
})
export class AppModule {
}
