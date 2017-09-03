import {NgModule} from '@angular/core';
import {CasesComponent} from './cases.component';
import {ButtonModule} from 'primeng/components/button/button';
import {TabMenuModule} from 'primeng/primeng';

@NgModule({
    imports: [
        ButtonModule,
        TabMenuModule],
    declarations: [CasesComponent],
    exports: [CasesComponent]
})
export class CasesModule {
}
