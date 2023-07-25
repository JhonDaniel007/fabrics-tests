import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithMessuresComponent } from './with-messures.component';

describe('WithMessuresComponent', () => {
  let component: WithMessuresComponent;
  let fixture: ComponentFixture<WithMessuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithMessuresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithMessuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
