import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxfilingComponent } from './taxfiling.component';

describe('TaxfilingComponent', () => {
  let component: TaxfilingComponent;
  let fixture: ComponentFixture<TaxfilingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxfilingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
