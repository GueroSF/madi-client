import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'auth-form', pathMatch: 'full'},
    {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
    {
        path: 'auth-form',
        loadChildren: () => import('./auth-form/auth-form.module').then(m => m.AuthFormPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
