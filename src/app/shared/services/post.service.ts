import {Injectable} from '@angular/core';
import {ApiRequestService} from './api-request.service';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {PostInterface} from '../interfaces/post.interface';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private _list$ = new ReplaySubject<{list: {}[], count: number}>(1);

    constructor(private _api: ApiRequestService) {
    }

    get list$(): Observable<{list: PostInterface[], count: number}> {
        return this._list$.asObservable() as Observable<{list: PostInterface[], count: number}>;
    }

    public requestPostsList(): void {
        this._api.get('/blog').subscribe(result => this._list$.next(result));
    }

    public markAsRead(post: PostInterface): void {
        this._api.get('/blog/posts/' + post.id).subscribe(res => {
            this.requestPostsList();
        })
    }

    public markAsSign(post: PostInterface): Observable<true> {
        return this._api.post('/blog/post/' + post.id + '/sign');
    }
}
