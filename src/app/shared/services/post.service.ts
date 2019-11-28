import {Injectable} from '@angular/core';
import {ApiRequestService} from './api-request.service';
import {interval, Observable, ReplaySubject} from 'rxjs';
import {PostInterface} from '../interfaces/post.interface';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private _list$ = new ReplaySubject<PostInterface[]>(1);

    private _previousCount: number;

    constructor(
        private _api: ApiRequestService,
        private _toastController: ToastController
    ) {
        this.requestPostsList();
        this.replayInitRequest();
    }

    get list$(): Observable<PostInterface[]> {
        return this._list$.asObservable() as Observable<PostInterface[]>;
    }

    public markAsRead(post: PostInterface): void {
        this._api.get('/blog/posts/' + post.id).subscribe(res => {
            this.requestPostsList();
        })
    }

    public markAsSign(post: PostInterface): Observable<true> {
        if (post.isSign === true) {
            return;
        }
        post.isSign = true;
        return this._api.post('/blog/post/' + post.id + '/sign');
    }

    private replayInitRequest(): void {
        interval(10000).subscribe(() => this.requestPostsList());
    }

    private requestPostsList(): void {
        this._api.get('/blog/').subscribe((result: {list: PostInterface[], count: number}) => {
            if (this._previousCount !== undefined && this._previousCount < result.count ) {
                this.createToast();
            }
            this._previousCount = result.count;
            this._list$.next(result.list);
        });
    }

    private createToast(): void {
        this._toastController.create({
            message: 'Появились новые документы!',
            position: 'top',
            color: 'warning',
            duration: 2000
        }).then(toast => toast.present());
    }
}
