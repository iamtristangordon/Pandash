import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesSearchComponent } from './cities-search.component';

describe('CitiesSearchComponent', () => {
  let component: CitiesSearchComponent;
  let fixture: ComponentFixture<CitiesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
