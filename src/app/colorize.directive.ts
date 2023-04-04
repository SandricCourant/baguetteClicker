import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[colorize]'
})
export class ColorizeDirective {

  constructor(private elem: ElementRef) { }
  @HostListener('mouseenter') onMouseOverHandler(){
    this.onMouseOver();
  }
  @HostListener('mouseleave') onMouseOutHandler(){
    this.onMouseOut();
  }
  onMouseOver() {
   this.elem.nativeElement.style.color = "var(--bread-count)";
  }
  onMouseOut(){
    this.elem.nativeElement.style.color = "var(--clear-text)";
  }
}
