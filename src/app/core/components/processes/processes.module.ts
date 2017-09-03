import {NgModule} from '@angular/core';
import {ProcessesComponent} from './processes.component';
import {ButtonModule} from 'primeng/components/button/button';
import {TabMenuModule} from 'primeng/primeng';

@NgModule({
    imports: [
        ButtonModule,
        TabMenuModule],
    declarations: [ProcessesComponent],
    exports: [ProcessesComponent]
})
export class ProcessesModule {
}
