import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineCategoryComponent } from './wine-category.component';

describe('WineCategoryComponent', () => {
  let component: WineCategoryComponent;
  let fixture: ComponentFixture<WineCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WineCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
