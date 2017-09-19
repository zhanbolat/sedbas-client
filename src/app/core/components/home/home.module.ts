import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {ButtonModule} from 'primeng/components/button/button';
import {MenuModule, PanelModule, TabMenuModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/components/splitbutton/splitbutton';
import {GrowlModule} from 'primeng/components/growl/growl';
import {routing} from "../../../app.routing";
// import {HomeModule} from './core/components/home/home.module';
import {TasksModule} from '../tasks/tasks.module';
import {CasesModule} from "../cases/cases.module";
import {ProcessesModule} from "../processes/processes.module";
import {CommonModule} from "@angular/common";


@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        MenuModule,
        PanelModule,
        TabMenuModule,
        SplitButtonModule,
        // HomeModule,
        TasksModule,
        CasesModule,
        ProcessesModule,
        GrowlModule,
        routing],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule {
}
