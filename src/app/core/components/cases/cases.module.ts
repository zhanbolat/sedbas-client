import {NgModule} from '@angular/core';
import {CasesComponent} from './cases.component';
// import {ButtonModule} from 'primeng/components/button/button';
// import {} from 'primeng/primeng';
import {ButtonModule, DataTableModule, GrowlModule, PanelModule, SharedModule} from 'primeng/primeng';


@NgModule({
    imports: [DataTableModule,
        SharedModule,
        GrowlModule,
        PanelModule,
        ButtonModule],
    declarations: [CasesComponent],
    exports: [CasesComponent]
})
export class CasesModule {
}
