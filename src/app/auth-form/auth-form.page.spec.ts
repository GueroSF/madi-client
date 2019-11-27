import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthFormPage } from './auth-form.page';

describe('AuthFormPage', () => {
  let component: AuthFormPage;
  let fixture: ComponentFixture<AuthFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
