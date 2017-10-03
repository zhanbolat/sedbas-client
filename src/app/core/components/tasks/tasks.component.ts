import {Component, ElementRef, ViewChild} from '@angular/core';
import {Message} from 'primeng/components/common/api';
import {SearchParams} from "../../model/search.params";
import {HumanTaskService} from "../../services/human.task.service";
import {HumanTask} from "../../model/human.task";
import {AuthService} from "../../../auth/services/auth.service";
import {ProcessService} from "../../services/process.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";


@Component({
    selector: "tasks",
    templateUrl: './tasks.component.html'
})
export class TasksComponent {

    constructor(private taskService: HumanTaskService,
                private processService: ProcessService,
                private authService: AuthService,
                private sanitizer: DomSanitizer) {
    }

    tasks: HumanTask[];
    msgs: Message[] = [];
    searchParamsOut: SearchParams;
    user_id: string;
    selectedTaskInfo: HumanTask;
    selectedTask: HumanTask;
    dialogVisible: boolean;
    taskFrameUrl: SafeResourceUrl;
    @ViewChild('iframe') iframe: ElementRef;

    ngOnInit() {
        console.log("ngOnInit tasks.component called. ");
        this.user_id = "1";
        this.authService.getCurrentSession().subscribe(session => {
            this.user_id = session.user_id;
        });

        var order = 'displayName ASC';
        var query = null;
        var filters = ['state=ready', 'user_id='+this.user_id];
        var deploys = ['rootContainerId'];
        var searchParams = new SearchParams(0, 100, order, query, filters, deploys);
        this.searchParamsOut = searchParams;
        this.taskService.searchHumanTasks(searchParams)
            .subscribe(tasks => { this.tasks = tasks; });

    }

    // ngAfterViewInit() {
    //     console.log("ngAfterViewInit");
    //     let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    //     if (typeof doc.addEventListener !== undefined) {
    //         doc.addEventListener("click", this.iframeClickHandler, false);
    //     } else if (typeof doc.attachEvent !== undefined) {
    //         doc.attachEvent("onclick", this.iframeClickHandler);
    //     }
    // }
    //
    // iframeClickHandler() {
    //     alert("Iframe clicked");
    //     console.log("Iframe clicked");
    // }

    showProcess(task: HumanTask) {
        this.selectedTask = task;
        this.getTaskURI(task.id);
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

    getTaskURI(taskId: string) {
        this.taskService.getHumanTask(taskId).subscribe(task => {
                this.processService.getProcessDefinition(task.processId).subscribe(process => {
                    var taskFormUrl = this.taskService.getTaskURI(process.name, process.version, task.name, task.id);
                    console.log("taskFormUrl: " + taskFormUrl);
                    this.taskFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(taskFormUrl);
                    this.dialogVisible = true;
                });
            });
    }

    takeTask(taskId: string) {
        this.taskService.assignHumanTask(taskId, this.user_id).subscribe(resp => {
            console.log(resp.status);
            console.log(resp.statusText);

            if(resp.status=== 200) {
                this.msgs = [];
                this.msgs.push({severity: 'info', summary: 'Task is assigned.'});
            }
        });
    }

    refresh() {
        if (this.searchParamsOut) {
            this.taskService.searchHumanTasks(this.searchParamsOut)
                .subscribe(tasks => { this.tasks = tasks; });
            this.msgs = [];
            this.msgs.push({severity: 'info', summary: 'Task list is successfully loaded'});
        }
    }

    updateTaskSearchParams(searchParams) {
        console.log("updateTaskSearchParams");
        this.searchParamsOut = searchParams;
        this.taskService.searchHumanTasks(searchParams)
            .subscribe(tasks => { this.tasks = tasks; });
    }
}
