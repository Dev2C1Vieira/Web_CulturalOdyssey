import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinhoDoPortoComponent } from './vinho-do-porto.component';

describe('VinhoDoPortoComponent', () => {
  let component: VinhoDoPortoComponent;
  let fixture: ComponentFixture<VinhoDoPortoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VinhoDoPortoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinhoDoPortoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
