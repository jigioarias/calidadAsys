import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComfortComponent } from './room-comfort.component';

describe('RoomComfortComponent', () => {
  let component: RoomComfortComponent;
  let fixture: ComponentFixture<RoomComfortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomComfortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComfortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
