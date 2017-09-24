import {Component} from '@angular/core';
// import {MenuItem} from 'primeng/primeng';
import {CaseService} from "../../services/case.service";
import {SearchParams} from "../../model/search.params";
import {Case} from "../../model/case";
import {Message} from "primeng/primeng";


@Component({
    selector: 'cases',
    templateUrl: './cases.component.html'
})
export class CasesComponent {

    constructor(private caseService: CaseService) {
    }

    // items: MenuItem[];
    // activeItem: MenuItem;
    cases: Case[];
    msgs: Message[];

    ngOnInit() {
        this.caseService.searchCases(new SearchParams(0,100))
            .subscribe(cases => { this.cases = cases; });
        // this.items = [
        //     {label: 'Tasks', icon: 'fa-tasks', routerLink: '/tasks'},
        //     {label: 'Cases', icon: 'fa-random', routerLink: '/cases'},
        //     {label: 'Processes', icon: 'fa-refresh', routerLink: '/processes'}
        // ];
        // this.activeItem = this.items[1];
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
        this.caseService.searchCases(new SearchParams(0,100))
            .subscribe(cases => { this.cases = cases; });
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Case list is successfully updated'});
    }

    // logOut(): void {
    //     this.authService.logOut().subscribe(isLoggedIn => {
    //         if (isLoggedIn === false) {
    //             this.router.navigate(['/auth']);
    //         }
    //     });
    // }
}
