import {NgModule} from '@angular/core';
import {TasksComponent} from './tasks.component';
import {ButtonModule} from 'primeng/components/button/button';
import {DialogModule, MenuModule, PanelModule, TabMenuModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/components/splitbutton/splitbutton';
import {GrowlModule} from 'primeng/components/growl/growl';
import {CommonModule} from "@angular/common";


@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        MenuModule,
        PanelModule,
        TabMenuModule,
        DataTableModule,
        SharedModule,
        SplitButtonModule,
        GrowlModule],
    declarations: [TasksComponent],
    exports: [TasksComponent]
})
export class TasksModule {
}
