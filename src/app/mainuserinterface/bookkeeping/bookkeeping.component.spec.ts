import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeepingComponent } from './bookkeeping.component';

describe('BookkeepingComponent', () => {
  let component: BookkeepingComponent;
  let fixture: ComponentFixture<BookkeepingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookkeepingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookkeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
