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

    private _apiHeaders: HttpHeaders;

    constructor(private _http: HttpClient) {
        this.initHeaders();
    }

    public pushToken(token: string): void {
        this._token = token;

        this.initHeaders();
    }

    public post(url: string, data?: object): Observable<any> {
        return this._http.post(
            this._apiUrl + url,
            data !== undefined ? JSON.stringify(data) : null,
            {headers: this._apiHeaders}
        );
    }

    public get(url: string): Observable<any> {
        return this._http.get(this._apiUrl + url, {headers: this._apiHeaders});
    }

    private initHeaders(): void {
        if (this._token === undefined) {
            this._apiHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
            });
        } else {
            this._apiHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this._token
            });
        }
    }
}
