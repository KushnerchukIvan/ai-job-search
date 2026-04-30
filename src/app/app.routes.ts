import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page-component/home-page-component';
import { FormComponent } from './components/form-component/form-component';
import { JobListComponent } from './components/job-list-component/job-list-component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'form', component: FormComponent},
    {path: 'jobs', component: JobListComponent}
];
