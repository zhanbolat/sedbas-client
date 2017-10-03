import {Component} from '@angular/core';
import {ProcessService} from "../../services/process.service";
import {ProcessDefinition} from "../../model/process.definition";
import {SearchParams} from "../../model/search.params";
import {Message} from "primeng/primeng";
import {AuthService} from "../../../auth/services/auth.service";


@Component({
    selector: 'processes',
    templateUrl: './processes.component.html'
})
export class ProcessesComponent {

    constructor(private processService: ProcessService,
                private authService: AuthService) {
    }

    // items: MenuItem[];
    // activeItem: MenuItem;
    processes: ProcessDefinition[];
    msgs: Message[];
    selectedProcess: ProcessDefinition;
    selectedProcessInfo: ProcessDefinition;
    dialogVisible: boolean;
    user_id: string;

    ngOnInit() {
        this.user_id = "1";
        this.authService.getCurrentSession().subscribe(session => {
            this.user_id = session.user_id;
        });

        var order = 'displayName ASC';
        var query = null;
        var filters = ['user_id='+this.user_id];
        var deploys = null;
        var searchParams = new SearchParams(0, 100, order, query, filters, deploys);

        this.processService.searchProcessDefinitions(searchParams)
            .subscribe(processes => { this.processes = processes; });
        // this.processes = [new ProcessDefinition({"displayDescription":"","deploymentDate":"2017-08-25 10:58:20.172","displayName":"My first process","name":"My first process","description":"","deployedBy":"4","id":"6342417351716212978","activationState":"DISABLED","version":"1.0","configurationState":"RESOLVED","last_update_date":"2017-08-25 10:58:20.364","actorinitiatorid":"1"}),
        //     new ProcessDefinition({"displayDescription":"","deploymentDate":"2017-08-25 10:58:20.172","displayName":"My first process","name":"My first process","description":"","deployedBy":"4","id":"6342417351716212979","activationState":"DISABLED","version":"1.0","configurationState":"RESOLVED","last_update_date":"2017-08-25 10:58:20.364","actorinitiatorid":"1"}),
        //     new ProcessDefinition({"displayDescription":"","deploymentDate":"2017-08-25 10:58:20.172","displayName":"My first process","name":"My first process","description":"","deployedBy":"4","id":"6342417351716212970","activationState":"DISABLED","version":"1.0","configurationState":"RESOLVED","last_update_date":"2017-08-25 10:58:20.364","actorinitiatorid":"1"}),
        //     new ProcessDefinition({"displayDescription":"","deploymentDate":"2017-08-25 10:58:20.172","displayName":"My first process","name":"My first process","description":"","deployedBy":"4","id":"6342417351716212971","activationState":"DISABLED","version":"1.0","configurationState":"RESOLVED","last_update_date":"2017-08-25 10:58:20.364","actorinitiatorid":"1"}),
        //     new ProcessDefinition({"displayDescription":"","deploymentDate":"2017-08-25 10:58:20.172","displayName":"My first process","name":"My first process","description":"","deployedBy":"4","id":"6342417351716212972","activationState":"DISABLED","version":"1.0","configurationState":"RESOLVED","last_update_date":"2017-08-25 10:58:20.364","actorinitiatorid":"1"}),
        //     new ProcessDefinition({"displayDescription":"","deploymentDate":"2017-08-25 10:58:20.172","displayName":"My first process","name":"My first process","description":"","deployedBy":"4","id":"6342417351716212973","activationState":"DISABLED","version":"1.0","configurationState":"RESOLVED","last_update_date":"2017-08-25 10:58:20.364","actorinitiatorid":"1"}),
        //     new ProcessDefinition({"displayDescription":"","deploymentDate":"2017-09-01 18:15:22.721","displayName":"My fourth process","name":"My fourth process","description":"","deployedBy":"4","id":"9157813678106044619","activationState":"ENABLED","version":"1.0","configurationState":"RESOLVED","last_update_date":"2017-09-01 18:15:28.550","actorinitiatorid":"201"})];

        // this.items = [
        //     {label: 'Tasks', icon: 'fa-tasks', routerLink: '/tasks'},
        //     {label: 'Cases', icon: 'fa-random', routerLink: '/cases'},
        //     {label: 'Processes', icon: 'fa-refresh', routerLink: '/processes'}
        // ];
        // this.activeItem = this.items[2];
    }

    showProcess(process: ProcessDefinition) {
        this.selectedProcess = process;
        this.dialogVisible = true;
    }

    onRowSelect(event) {
        this.processService.getProcessDefinition(event.data.id)
            .subscribe(process => {this.selectedProcessInfo = process; });
        // this.selectedProcessInfo = new ProcessDefinition({"displayDescription":"","deploymentDate":"2017-08-25 10:58:20.172","displayName":"My first process","name":"My first process","description":"","deployedBy":"4","id":"6342417351716212979","activationState":"DISABLED","version":"1.0","configurationState":"RESOLVED","last_update_date":"2017-08-25 10:58:20.364","actorinitiatorid":"1"});
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Process Selected', detail: event.data.id + ' - ' + event.data.name});
    }

    onRowUnselect(event) {
        this.selectedProcessInfo = null;
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Process Unselected', detail: event.data.id + ' - ' + event.data.name});
    }
}
