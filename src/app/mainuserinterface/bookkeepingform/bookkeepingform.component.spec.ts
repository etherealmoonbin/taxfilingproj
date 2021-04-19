import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingformComponent } from './bookkeepingform.component';

describe('BookkeepingformComponent', () => {
  let component: BookkeepingformComponent;
  let fixture: ComponentFixture<BookkeepingformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookkeepingformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookkeepingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
