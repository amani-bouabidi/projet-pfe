import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerDialog } from './video-player-dialog';

describe('VideoPlayerDialog', () => {
  let component: VideoPlayerDialog;
  let fixture: ComponentFixture<VideoPlayerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPlayerDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
