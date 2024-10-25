import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpsLogoComponent } from './rps-logo.component';

describe('RpsLogoComponent', () => {
  let component: RpsLogoComponent;
  let fixture: ComponentFixture<RpsLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RpsLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RpsLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
