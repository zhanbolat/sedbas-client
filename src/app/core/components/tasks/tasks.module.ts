import {NgModule} from '@angular/core';
import {TasksComponent} from './tasks.component';
import {ButtonModule} from 'primeng/components/button/button';
import {MenuModule, PanelModule, TabMenuModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/components/splitbutton/splitbutton';
import {GrowlModule} from 'primeng/components/growl/growl';


@NgModule({
    imports: [
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
