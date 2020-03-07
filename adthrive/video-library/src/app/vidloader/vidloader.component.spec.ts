import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VidloaderComponent } from './vidloader.component';

describe('VidloaderComponent', () => {
  let component: VidloaderComponent;
  let fixture: ComponentFixture<VidloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VidloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VidloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
