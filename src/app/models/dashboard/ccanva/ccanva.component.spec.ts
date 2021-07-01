import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCanvaComponent } from './ccanva.component';

describe('CCanvaComponent', () => {
  let component: CCanvaComponent;
  let fixture: ComponentFixture<CCanvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CCanvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CCanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
