import {Component} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';
import {Task} from "../../model/task";
import {TaskService} from "../../services/task.service";
import {SearchParams} from "../../model/search.params";


@Component({
    templateUrl: './tasks.component.html'
})
export class TasksComponent {

    constructor(private router: Router,
                private authService: AuthService,
                private taskService: TaskService
    ) {
    }

    items: MenuItem[];
    tasks: Task[];
    activeItem: MenuItem;

    ngOnInit() {
        console.log("ngOnInit tasks.component called. ");
        this.taskService.searchTasks(new SearchParams(1,2)).subscribe(tasks => { this.tasks = tasks; });
        // this.tasks = [new Task({"displayDescription":"","executedBy":"0","rootContainerId":"2001","assigned_date":"","displayName":"My first step","executedBySubstitute":"0","dueDate":"","description":"","type":"USER_TASK","priority":"normal","actorId":"201","processId":"9157813678106044619","caseId":"2001","name":"My first step","reached_state_date":"2017-09-01 18:15:33.576","rootCaseId":"2001","id":"40003","state":"ready","parentCaseId":"2001","last_update_date":"2017-09-01 18:15:33.576","assigned_id":""}),
        //     new Task({"displayDescription":"","executedBy":"0","rootContainerId":"1003","assigned_date":"","displayName":"My first step","executedBySubstitute":"0","dueDate":"","description":"","type":"USER_TASK","priority":"normal","actorId":"101","processId":"5220322292622641775","caseId":"1003","name":"My first step","reached_state_date":"2017-08-26 14:17:52.347","rootCaseId":"1003","id":"20010","state":"ready","parentCaseId":"1003","last_update_date":"2017-08-26 14:17:52.347","assigned_id":""})];
        this.items = [
            {label: 'Tasks', icon: 'fa-tasks', routerLink: '/tasks'},
            {label: 'Cases', icon: 'fa-random', routerLink: '/cases'},
            {label: 'Processes', icon: 'fa-refresh', routerLink: '/processes'}
        ];
        this.activeItem = this.items[0];
        // this.cols = [
        //     {field: 'vin', header: 'Vin'},
        //     {field: 'year', header: 'Year'},
        //     {field: 'brand', header: 'Brand'},
        //     {field: 'color', header: 'Color'}
        // ];
    }

    logOut(): void {
        this.authService.logOut().subscribe(isLoggedIn => {
            if (isLoggedIn === false) {
                this.router.navigate(['/auth']);
            }
        });
    }
}
