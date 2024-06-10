import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackettVintageComponent } from './blackett-vintage.component';

describe('BlackettVintageComponent', () => {
  let component: BlackettVintageComponent;
  let fixture: ComponentFixture<BlackettVintageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlackettVintageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackettVintageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
