import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiRequestService {

    private _apiUrl: string = environment.apiUrl;

    private _token: string;

    private _apiHeaders: {headers: HttpHeaders};

    constructor(private _http: HttpClient) {
        this.initHeaders();
    }

    public pushToken(token: string): void {
        this._token = token;

        this.initHeaders();
    }

    public post(url: string, data: object): Observable<any> {
        return this._http.post(this._apiUrl + url, JSON.stringify(data), this._apiHeaders);
    }

    private initHeaders(): void {
        if (this._token === undefined) {
            this._apiHeaders = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            };
        } else {
            this._apiHeaders = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this._token
                })
            };
        }
    }
}
