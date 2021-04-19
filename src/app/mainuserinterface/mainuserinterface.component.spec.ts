import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainuserinterfaceComponent } from './mainuserinterface.component';

describe('MainuserinterfaceComponent', () => {
  let component: MainuserinterfaceComponent;
  let fixture: ComponentFixture<MainuserinterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainuserinterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainuserinterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
