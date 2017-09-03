import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthComponent} from './auth/components/auth/auth.component';
import {HomeComponent} from './core/components/home/home.component';
import {TasksComponent} from './core/components/tasks/tasks.component';
import {CasesComponent} from './core/components/cases/cases.component';
import {ProcessesComponent} from './core/components/processes/processes.component';
import {AuthGuard} from './auth/services/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tasks',
        component: TasksComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cases',
        component: CasesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'processes',
        component: ProcessesComponent,
        canActivate: [AuthGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
