import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnglesComponent } from './angles.component';

describe('AnglesComponent', () => {
  let component: AnglesComponent;
  let fixture: ComponentFixture<AnglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnglesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
