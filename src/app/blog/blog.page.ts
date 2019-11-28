import {Component, OnInit} from '@angular/core';
import {PostService} from '../shared/services/post.service';
import {Observable, ReplaySubject} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {PostInterface} from '../shared/interfaces/post.interface';
import {AlertButton, AlertOptions} from '@ionic/core';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.page.html',
    styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {

    private _list$ = new ReplaySubject<PostInterface[]>(1);

    constructor(
        private _postService: PostService,
        public alertController: AlertController
    ) {
    }

    get list$(): Observable<PostInterface[]> {
        return this._list$.asObservable();
    }

    ngOnInit() {
        this._postService.list$.subscribe(res => {
            this._list$.next(res.list);
        });

        this._postService.requestPostsList();
    }

    public show(post: PostInterface): void {
        const buttons: AlertButton[] = [
            {
                text: 'Закрыть',
                role: 'cancel',
                cssClass: 'secondary',
            }
        ];

        if (!post.isSign) {
            buttons.push({
                text: 'Подписать',
                handler: () => {
                    this._postService.markAsSign(post).subscribe(() => {});
                }
            })
        }

        this._postService.markAsRead(post);
        this.alertController
            .create({
                    header: post.title,
                    message: post.content,
                    buttons: buttons
                })
            .then(alert => alert.present());
    }

}
