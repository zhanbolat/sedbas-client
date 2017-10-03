import {Component} from '@angular/core';
import {Message} from 'primeng/components/common/api';
import {SearchParams} from "../../model/search.params";
import {ArchievedHumanTaskService} from "../../services/archieved.human.task.service";
import {ArchievedHumanTask} from "../../model/archieved.human.task";
import {AuthService} from "../../../auth/services/auth.service";


@Component({
    selector: "archieved-tasks",
    templateUrl: './archieved.tasks.component.html'
})
export class ArchievedTasksComponent {

    constructor(private taskService: ArchievedHumanTaskService,
                private authService: AuthService) {
    }

    // items: MenuItem[];
    // leftMenuItems: MenuItem[];
    tasks: ArchievedHumanTask[];
    // activeItem: MenuItem;
    msgs: Message[] = [];
    // splitBtnItems: MenuItem[];
    user_id: string;
    selectedTaskInfo: ArchievedHumanTask;

    ngOnInit() {
        this.user_id = "4";
        this.authService.getCurrentSession().subscribe(session => {
            this.user_id = session.user_id;
        });

        this.refresh();
    }

    onRowSelect(event) {
        this.taskService.getHumanTask(event.data.id)
            .subscribe(task => {this.selectedTaskInfo = task; });
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Task Selected', detail: event.data.id + ' - ' + event.data.displayName});
    }

    onRowUnselect(event) {
        this.selectedTaskInfo = null;
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Task Unselected', detail: event.data.id + ' - ' + event.data.displayName});
    }

    refresh() {
        var order = 'displayName ASC';
        var query = null;
        var filters = ['state=completed', 'assigned_id='+this.user_id];
        var deploys = ['rootContainerId'];
        var searchParams = new SearchParams(0, 100, order, query, filters, deploys);
        this.taskService.searchArchievedHumanTasks(searchParams)
            .subscribe(tasks => { this.tasks = tasks; });

        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Task list is successfully loaded'});
    }

    // updateTaskSearchParams(searchParams) {
    //     console.log("updateTaskSearchParams");
    //     this.taskService.searchArchievedHumanTasks(searchParams)
    //         .subscribe(tasks => { this.tasks = tasks; });
    // }
}
