import {Component} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/components/common/api';
import {Message} from 'primeng/components/common/api';


@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    items: MenuItem[];
    activeItem: MenuItem;
    leftMenuItems: MenuItem[];
    msgs: Message[] = [];
    splitBtnItems: MenuItem[];
    username: string;

    ngOnInit() {
        this.username = "walter.bates";
        this.items = [
            {label: 'Tasks', icon: 'fa-tasks', command: () => {
                this.setItemState(this.items[0]);
            }},
            {label: 'Cases', icon: 'fa-random', command: () => {
                this.setItemState(this.items[1]);
            }},
            {label: 'Processes', icon: 'fa-refresh', command: () => {
                this.setItemState(this.items[2]);
            }}
        ];
        this.activeItem = this.items[0];

        this.leftMenuItems = [{
                label: 'Текущие (Активные)',
                items: [
                    {label: 'Мои процессы', icon: 'fa-plus', command: () => {
                        this.update();
                    }},
                    {label: 'Доступные', icon: 'fa-plus'}
                ]
            },
            {
                label: 'Завершенные (Архив)',
                items: [
                    {label: 'Входящие', icon: 'fa-plus'},
                    {label: 'Исходящие', icon: 'fa-plus'}
                ]
            }];

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
        this.msgs.push({severity:'info', summary:'Success', detail:'Data Updated'});
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
