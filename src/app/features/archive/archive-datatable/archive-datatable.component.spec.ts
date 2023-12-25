import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveDatatableComponent } from './archive-datatable.component';

describe('ArchiveDatatableComponent', () => {
  let component: ArchiveDatatableComponent;
  let fixture: ComponentFixture<ArchiveDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveDatatableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchiveDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
