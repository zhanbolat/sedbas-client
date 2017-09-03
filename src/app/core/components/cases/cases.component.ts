import {Component} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';


@Component({
    templateUrl: './cases.component.html'
})
export class CasesComponent {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    items: MenuItem[];
    activeItem: MenuItem;

    ngOnInit() {
        this.items = [
            {label: 'Tasks', icon: 'fa-tasks', routerLink: '/tasks'},
            {label: 'Cases', icon: 'fa-random', routerLink: '/cases'},
            {label: 'Processes', icon: 'fa-refresh', routerLink: '/processes'}
        ];
        this.activeItem = this.items[1];
    }

    logOut(): void {
        this.authService.logOut().subscribe(isLoggedIn => {
            if (isLoggedIn === false) {
                this.router.navigate(['/auth']);
            }
        });
    }
}
