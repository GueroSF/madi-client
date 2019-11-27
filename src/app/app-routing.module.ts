import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'auth-form', pathMatch: 'full'},
    {
        path: 'auth-form',
        loadChildren: () => import('./auth-form/auth-form.module').then(m => m.AuthFormPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
