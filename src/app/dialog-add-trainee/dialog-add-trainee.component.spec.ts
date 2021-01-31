import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTraineeComponent } from './dialog-add-trainee.component';

describe('DialogAddTraineeComponent', () => {
  let component: DialogAddTraineeComponent;
  let fixture: ComponentFixture<DialogAddTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTraineeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
