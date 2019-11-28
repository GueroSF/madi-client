import {Injectable} from '@angular/core';
import {ApiRequestService} from './api-request.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private _api: ApiRequestService, private _user: UserService) {
    }

    public auth(data: {username: string, password: string}): Observable<boolean> {
        return this._api.post('/auth/login', data)
            .pipe(
                map(res => {
                    try {
                        if (res.token !== undefined && res.token !== null) {
                            this._api.pushToken(res.token);
                            this._user.setIsLoggedIn(true);
                        }

                        return this._user.isLoggedIn();
                    } catch (e) {
                        throw e;
                    }
                })
            );
    }
}
