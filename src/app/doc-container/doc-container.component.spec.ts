import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocContainerComponent } from './doc-container.component';

describe('DocContainerComponent', () => {
  let component: DocContainerComponent;
  let fixture: ComponentFixture<DocContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
