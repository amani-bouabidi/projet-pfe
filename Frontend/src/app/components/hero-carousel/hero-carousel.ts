import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { RouterLink } from '@angular/router';

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  gradient: string;
}

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-carousel.html',
  styleUrls: ['./hero-carousel.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  private autoSlideInterval: any;
  private isHovering = false;

  // Slides data
  slides: Slide[] = [
    {
      id: 1,
      title: 'Welcome to IRA Platform',
      subtitle: 'Institut des Régions Arides - Excellence in Education and Research',
      ctaText: 'Explore Courses',
      ctaLink: '/courses',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop',
      gradient: 'linear-gradient(135deg, rgba(0,38,43,0.85) 0%, rgba(11,143,122,0.75) 100%)'
    },
    {
      id: 2,
      title: 'Discover Our Programs',
      subtitle: 'Join world-class programs and advance your career',
      ctaText: 'View Programs',
      ctaLink: '/programs',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop',
      gradient: 'linear-gradient(135deg, rgba(0,38,43,0.85) 0%, rgba(59,130,246,0.75) 100%)'
    },
    {
      id: 3,
      title: 'Research Excellence',
      subtitle: 'Cutting-edge research facilities and international collaborations',
      ctaText: 'Learn More',
      ctaLink: '/research',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=600&fit=crop',
      gradient: 'linear-gradient(135deg, rgba(0,38,43,0.85) 0%, rgba(139,92,246,0.75) 100%)'
    },
    {
      id: 4,
      title: 'International Community',
      subtitle: 'Connect with students and researchers from around the world',
      ctaText: 'Join Us',
      ctaLink: '/community',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop',
      gradient: 'linear-gradient(135deg, rgba(0,38,43,0.85) 0%, rgba(236,72,153,0.75) 100%)'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    this.autoSlideInterval = setInterval(() => {
      if (!this.isHovering) {
        this.nextSlide();
      }
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  onMouseEnter(): void {
    this.isHovering = true;
    this.stopAutoSlide();
  }

  onMouseLeave(): void {
    this.isHovering = false;
    this.startAutoSlide();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    // Reset auto-slide timer when manually navigating
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  getCurrentSlide(): Slide {
    return this.slides[this.currentIndex];
  }

  // Keyboard navigation
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.previousSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    }
  }
}
