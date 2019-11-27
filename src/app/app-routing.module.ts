import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/auth/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: 'auth-form', pathMatch: 'full'},
    {
        path: 'auth-form',
        loadChildren: () => import('./auth-form/auth-form.module').then(m => m.AuthFormPageModule)
    },
    {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogPageModule),
        canActivate: [AuthGuard]
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
