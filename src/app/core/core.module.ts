import {NgModule, Optional, SkipSelf} from '@angular/core';
import {UserService} from './services/user.service';
import {TaskService} from "./services/task.service";
import {ConfigService} from "../config/configs";
import {ProcessService} from "./services/process.service";
import {CaseService} from "./services/case.service";

@NgModule({
    providers: [UserService,
        TaskService,
        ProcessService,
        CaseService,
        ConfigService]
})
export class CoreModule {

    constructor(@Optional()
                @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}


