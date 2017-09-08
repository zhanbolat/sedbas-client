import {NgModule} from '@angular/core';
import {TasksComponent} from './tasks.component';
import {ButtonModule} from 'primeng/components/button/button';
import {TabMenuModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';


@NgModule({
    imports: [
        ButtonModule,
        TabMenuModule,
        DataTableModule,
        SharedModule],
    declarations: [TasksComponent],
    exports: [TasksComponent]
})
export class TasksModule {
}
