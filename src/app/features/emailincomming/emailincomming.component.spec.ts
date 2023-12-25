import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailincommingComponent } from './emailincomming.component';

describe('EmailincommingComponent', () => {
  let component: EmailincommingComponent;
  let fixture: ComponentFixture<EmailincommingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailincommingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailincommingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
