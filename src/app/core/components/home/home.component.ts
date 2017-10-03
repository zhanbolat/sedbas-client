import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/components/common/api';
import {Message} from 'primeng/components/common/api';
import {TasksComponent} from "../tasks/tasks.component";
import {SearchParams} from "../../model/search.params";


@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    // items: MenuItem[];
    activeItem: MenuItem;
    leftMenuItems: MenuItem[];
    msgs: Message[] = [];
    splitBtnItems: MenuItem[];
    username: string;
    user_id: string;

    @ViewChild(TasksComponent)
    private tasksComponent: TasksComponent;

    ngOnInit() {
        this.username = "user";
        this.user_id = "1";
        this.authService.getCurrentSession().subscribe(session => {
            this.username = session.user_name;
            this.user_id = session.user_id;
        });

        this.leftMenuItems = [{
            label: 'Tasks',
            items: [
                {label: 'To do', icon: 'fa-plus', command: () => {
                    this.setItemState(this.leftMenuItems[0].items[0]);
                    var order = 'displayName ASC';
                    var query = null;
                    var filters = ['state=ready', 'user_id='+this.user_id];
                    var deploys = ['rootContainerId'];
                    var searchParams = new SearchParams(0, 100, order, query, filters, deploys);

                    this.tasksComponent.updateTaskSearchParams(searchParams);
                    // this.update();
                }},
                {label: 'My tasks', icon: 'fa-plus', command: () => {
                    this.setItemState(this.leftMenuItems[0].items[1]);
                    var order = 'displayName ASC';
                    var query = null;
                    var filters = ['state=ready', 'assigned_id='+this.user_id];
                    var deploys = ['rootContainerId'];
                    var searchParams = new SearchParams(0, 100, order, query, filters, deploys);

                    this.tasksComponent.updateTaskSearchParams(searchParams);
                    // this.update();
                }},
                {label: 'Done', icon: 'fa-plus', command: () => {
                    this.setItemState(this.leftMenuItems[0].items[2]);
                    // this.update();
                }}
            ]},
            {
                label: 'Processes',
                items: [
                    {label: 'Процессы', icon: 'fa-plus', command: () => {
                        this.setItemState(this.leftMenuItems[1].items[0]);
                        // this.update();
                    }}
                ]
            },
            {
                label: 'Завершенные (Архив)',
                items: [
                    {label: 'Входящие', icon: 'fa-plus'},
                    {label: 'Исходящие', icon: 'fa-plus'},
                    {label: 'Заявки', icon: 'fa-plus'}
                ]
            }];


        this.activeItem = this.leftMenuItems[0].items[0];

        this.splitBtnItems = [
            {label: 'Update', icon: 'fa-refresh', command: () => {
                this.update();
            }},
            // {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
            {label: 'Logout', icon: 'fa-close"', command: () => {
                this.logOut();
            }}
        ];
    }

    setItemState(item) {
        this.activeItem = item;
    }

    update() {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Active menu: ' + this.activeItem.label});
    }

    logOut(): void {
        this.authService.logOut().subscribe(isLoggedIn => {
            if (isLoggedIn === false) {
                this.router.navigate(['/auth']);
                this.msgs = [];
                this.msgs.push({severity:'info', summary:'Success', detail:'Logout success'});
            }
        });
    }
}
