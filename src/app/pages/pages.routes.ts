import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';




const pagesRoutes: Routes = [

    {
        path: 'dashboard',
        component:  DashboardComponent,
        // VerificaTokenGuard debería incluirse en todas la paginas para evitar que caduque
        canActivate: [VerificaTokenGuard],
        data: { titulo: 'Dashboard'}
    },
    { path: 'progress', component:  ProgressComponent, data: { titulo: 'Progress'} },
    { path: 'graficas1', component:  Graficas1Component, data: { titulo: 'Gráficas'} },
    { path: 'promesas', component:  PromesasComponent, data: { titulo: 'Promesas'} },
    { path: 'rxjs', component:  RxjsComponent, data: { titulo: 'RxJs'} },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema'} },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'} },

    // Mantenimientos
    { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'}, canActivate: [AdminGuard] },
    { path: 'hospitales', component: HospitalComponent, data: { titulo: 'Mantenimiento de hospitales'} },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos'} },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar médico'} },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
