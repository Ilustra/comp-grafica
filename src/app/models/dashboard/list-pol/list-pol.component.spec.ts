import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPolComponent } from './list-pol.component';

describe('ListPolComponent', () => {
  let component: ListPolComponent;
  let fixture: ComponentFixture<ListPolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
