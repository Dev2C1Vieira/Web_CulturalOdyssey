import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle blur class on scroll', () => {
    window.scrollTo(0, 100); // Simulate scroll
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(component.isBlurred).toBeTrue();
    
    window.scrollTo(0, 0); // Reset scroll
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(component.isBlurred).toBeFalse();
  });
});
