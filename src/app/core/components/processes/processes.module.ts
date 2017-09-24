import {NgModule} from '@angular/core';
import {ProcessesComponent} from './processes.component';
// import {ButtonModule} from 'primeng/components/button/button';
import {DataTableModule, DialogModule, GrowlModule, PanelModule, SharedModule, TabMenuModule} from 'primeng/primeng';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        DataTableModule,
        SharedModule,
        DialogModule,
        PanelModule,
        GrowlModule],
    declarations: [ProcessesComponent],
    exports: [ProcessesComponent]
})
export class ProcessesModule {
}
