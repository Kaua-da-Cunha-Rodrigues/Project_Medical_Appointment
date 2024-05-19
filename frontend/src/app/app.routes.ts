import { Routes } from '@angular/router';
import { AppointmentComponent } from './modules/appointment/appointment.component';
import { AuthComponent } from './modules/auth/auth.component';
import { Component } from '@angular/core';
import { CreateComponent } from './modules/appointment/components/create/create.component';
import { ListComponent } from './modules/appointment/components/list/list.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { LoginComponent } from './modules/auth/components/login/login.component';

export const routes: Routes = [
    {
        path: 'appointment',
        component: AppointmentComponent,
        children:[
            {
                path: 'create',
                component: CreateComponent
            },
            {
                path: 'list',
                component: ListComponent
            },
            {
                path: 'edit/:id',
                component:CreateComponent
            }
        ]
    },
    {
        path: 'auth',
        component: AuthComponent,
        children:[
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
];
