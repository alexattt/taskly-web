import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddEditFormComponent } from './task-add-edit-form.component';

describe('TaskAddEditFormComponent', () => {
  let component: TaskAddEditFormComponent;
  let fixture: ComponentFixture<TaskAddEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAddEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
