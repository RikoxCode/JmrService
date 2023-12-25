import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { ArchiveComponent } from './features/archive/archive.component';
import { HomeComponent } from './features/home/home.component';
import { PwResetComponent } from './features/pw-reset/pw-reset.component';
import { EmailincommingComponent } from './features/emailincomming/emailincomming.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'archive',
        component: ArchiveComponent
    },
    {
        path: 'pw-reset/:token',
        pathMatch: 'prefix',
        component: PwResetComponent
    },
    {
        path: 'pw-request-email',
        component: EmailincommingComponent
    }
];
