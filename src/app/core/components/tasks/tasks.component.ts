import {Component} from '@angular/core';
// import {AuthService} from '../../../auth/services/auth.service';
// import {Router} from '@angular/router';
// import {MenuItem} from 'primeng/components/common/api';
import {Message} from 'primeng/components/common/api';
import {Task} from "../../model/task";
import {TaskService} from "../../services/task.service";
import {SearchParams} from "../../model/search.params";


@Component({
    selector: "tasks",
    templateUrl: './tasks.component.html'
})
export class TasksComponent {

    constructor(private taskService: TaskService) {
    }

    // items: MenuItem[];
    // leftMenuItems: MenuItem[];
    tasks: Task[];
    // activeItem: MenuItem;
    msgs: Message[] = [];
    // splitBtnItems: MenuItem[];
    // username: string;

    ngOnInit() {
        console.log("ngOnInit tasks.component called. ");
        this.taskService.searchTasks(new SearchParams(0,100))
            .subscribe(tasks => { this.tasks = tasks; });
        // this.items = [
        //     {label: 'Tasks', icon: 'fa-tasks', routerLink: '/tasks'},
        //     {label: 'Cases', icon: 'fa-random', routerLink: '/cases'},
        //     {label: 'Processes', icon: 'fa-refresh', routerLink: '/processes'}
        // ];
        // this.activeItem = this.items[0];
        //
        // this.leftMenuItems = [{
        //     label: 'Текущие (Активные)',
        //     items: [
        //         {label: 'Мои процессы', icon: 'fa-plus', command: () => {
        //             this.update();
        //         }},
        //         {label: 'Доступные', icon: 'fa-plus'}
        //     ]
        // },
        //     {
        //         label: 'Завершенные (Архив)',
        //         items: [
        //             {label: 'Входящие', icon: 'fa-plus'},
        //             {label: 'Исходящие', icon: 'fa-plus'}
        //         ]
        //     }];
        // this.cols = [
        //     {field: 'vin', header: 'Vin'},
        //     {field: 'year', header: 'Year'},
        //     {field: 'brand', header: 'Brand'},
        //     {field: 'color', header: 'Color'}
        // ];
        // this.username = "walter.bates";
        //
        // this.splitBtnItems = [
        //     {label: 'Update', icon: 'fa-refresh', command: () => {
        //         this.update();
        //     }},
        //     // {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
        //     {label: 'Logout', icon: 'fa-close"', command: () => {
        //         this.logOut();
        //     }}
        // ];
    }

    onRowSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Car Selected', detail: event.data.id + ' - ' + event.data.processDefinitionId});
    }

    onRowUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Car Unselected', detail: event.data.id + ' - ' + event.data.processDefinitionId});
    }

    refresh() {
        this.taskService.searchTasks(new SearchParams(0,100))
            .subscribe(tasks => { this.tasks = tasks; });
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Task list is successfully updated'});
    }

    // update() {
    //     this.msgs = [];
    //     this.msgs.push({severity:'info', summary:'Success', detail:'Data Updated'});
    // }

    // logOut(): void {
    //     this.authService.logOut().subscribe(isLoggedIn => {
    //         if (isLoggedIn === false) {
    //             this.router.navigate(['/auth']);
    //         }
    //     });
    // }
}
