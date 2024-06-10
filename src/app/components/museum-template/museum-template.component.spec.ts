import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumTemplateComponent } from './museum-template.component';

describe('MuseumTemplateComponent', () => {
  let component: MuseumTemplateComponent;
  let fixture: ComponentFixture<MuseumTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuseumTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuseumTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
