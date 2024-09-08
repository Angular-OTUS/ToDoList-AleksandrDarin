import {Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnDestroy {

  @Input() appTooltip: string = '';

  tooltipElement: HTMLDivElement | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.tooltipElement = this.renderer.createElement('div');

      this.tooltipElement!.innerText = this.appTooltip;

      this.renderer.addClass(this.tooltipElement, 'tooltip');
      this.renderer.appendChild(document.body, this.tooltipElement);

      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
      this.renderer.setStyle(this.tooltipElement, 'top', `${rect.top + window.scrollY - 30}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${rect.left + window.scrollX}px`);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip();
  }

  ngOnDestroy() {
    this.removeTooltip();
  }

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
