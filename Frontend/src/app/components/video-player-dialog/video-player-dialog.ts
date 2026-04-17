import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface VideoData {
  video: {
    id: number;
    titre: string;
    description: string;
    videoUrl: string;
    duration: string;
  };
}

@Component({
  selector: 'app-video-player-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  template: `
    <div class="video-dialog-container">
      <div class="video-header">
        <h2>{{ data.video.titre }}</h2>
        <button mat-icon-button (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="video-player">
        <video
          #videoPlayer
          controls
          autoplay
          [src]="getSafeVideoUrl()"
          class="video-element">
          Votre navigateur ne supporte pas la lecture de vidéo.
        </video>
      </div>

      <div class="video-info">
        <p class="video-description">{{ data.video.description }}</p>
        <div class="video-meta">
          <span>Durée: {{ data.video.duration }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .video-dialog-container {
      background: #1a1a2e;
      color: white;
    }

    .video-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .video-header h2 {
      margin: 0;
      font-size: 20px;
    }

    .video-player {
      padding: 24px;
    }

    .video-element {
      width: 100%;
      border-radius: 8px;
      outline: none;
    }

    .video-info {
      padding: 0 24px 24px 24px;
    }

    .video-description {
      color: #a0a0c0;
      margin-bottom: 12px;
      line-height: 1.5;
    }

    .video-meta {
      color: #0b8f7a;
      font-size: 14px;
    }
  `]
})
export class VideoPlayerDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: VideoData,
    private dialogRef: MatDialogRef<VideoPlayerDialogComponent>,
    private sanitizer: DomSanitizer
  ) {}

  getSafeVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video.videoUrl);
  }

  close(): void {
    this.dialogRef.close();
  }
}
