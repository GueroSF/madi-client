import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationMessageInterface} from '../shared/interfaces/validation-message.interface';

@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.page.html',
    styleUrls: ['./auth-form.page.scss'],
})
export class AuthFormPage implements OnInit {

    private _validateMessages: {[fieldName: string]: ValidationMessageInterface[] } = {
        'username': [
            {type: 'required', message: 'Это обязательное поле'}
        ],
        'password': [
            {type: 'required', message: 'Это обязательное поле'},
            {type: 'minlength', message: 'Минимум 6 символов'}
        ]
    };

    private _userForm = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ]))
    });

    constructor() {
    }

    get userForm(): FormGroup {
        return this._userForm;
    }


    get validateMessages(): { [p: string]: ValidationMessageInterface[] } {
        return this._validateMessages;
    }

    ngOnInit() {
    }

    public auth(): void {
        if (this._userForm.valid) {
            console.log(this._userForm.getRawValue());
        }
    }

    public checkErrorField(fieldName: string, validation: ValidationMessageInterface): boolean {
        return this.userForm.get(fieldName).hasError(validation.type)
            && (this.userForm.get(fieldName).dirty || this.userForm.get(fieldName).touched);
    }
}
