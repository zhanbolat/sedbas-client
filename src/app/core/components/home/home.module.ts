import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {ButtonModule} from 'primeng/components/button/button';
import {TabMenuModule} from 'primeng/primeng';

@NgModule({
    imports: [
        ButtonModule,
        TabMenuModule],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule {
}
