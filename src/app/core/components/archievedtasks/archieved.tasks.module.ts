import {NgModule} from '@angular/core';
import {ArchievedTasksComponent} from './archieved.tasks.component';
import {ButtonModule} from 'primeng/components/button/button';
import {MenuModule, PanelModule, TabMenuModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/components/splitbutton/splitbutton';
import {GrowlModule} from 'primeng/components/growl/growl';
import {CommonModule} from "@angular/common";


@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        MenuModule,
        PanelModule,
        TabMenuModule,
        DataTableModule,
        SharedModule,
        SplitButtonModule,
        GrowlModule],
    declarations: [ArchievedTasksComponent],
    exports: [ArchievedTasksComponent]
})
export class ArchievedTasksModule {
}
