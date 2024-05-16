import { Routes } from '@angular/router';
import { AppointmentComponent } from './modules/appointment/appointment.component';
import { AuthComponent } from './modules/auth/auth.component';

export const routes: Routes = [
    {
        path: 'appointment',
        component: AppointmentComponent,
        children:[

        ]
    },
    {
        path: 'auth',
        component: AuthComponent
    }
];
