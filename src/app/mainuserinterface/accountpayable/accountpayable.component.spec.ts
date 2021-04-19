import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountpayableComponent } from './accountpayable.component';

describe('AccountpayableComponent', () => {
  let component: AccountpayableComponent;
  let fixture: ComponentFixture<AccountpayableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountpayableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountpayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
