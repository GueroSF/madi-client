import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _isLogin = false;

    constructor() {
    }

    public isLogin(): boolean {
        return this._isLogin;
    }

    public setIsLogin(value: boolean): void {
        this._isLogin = value;
    }
}
