import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMuseumsComponent } from './get-museums.component';

describe('GetMuseumsComponent', () => {
  let component: GetMuseumsComponent;
  let fixture: ComponentFixture<GetMuseumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetMuseumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetMuseumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
