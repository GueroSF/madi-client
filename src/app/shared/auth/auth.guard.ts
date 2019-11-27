import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {NavController} from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private _user: UserService,
        private _navController: NavController,
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._user.isLoggedIn()) {
            return true;
        }

        this._navController.navigateRoot('/');

        return false;
    }

}
