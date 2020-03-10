import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComfortsComponent } from './room-comforts.component';

describe('RoomComfortsComponent', () => {
  let component: RoomComfortsComponent;
  let fixture: ComponentFixture<RoomComfortsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomComfortsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComfortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
