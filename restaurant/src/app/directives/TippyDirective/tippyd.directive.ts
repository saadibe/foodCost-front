import { Directive, ElementRef, Renderer2, AfterViewChecked, Input } from '@angular/core';
import { makeTippy } from 'src/app/libs/tools';

@Directive({
  selector: '[SHOW_IMAGE_ON_HOVER]'
})
export class TippydDirective implements AfterViewChecked {
  is_setted = false
  @Input()TEMPLATE_REF: string = ""
  constructor(private el: ElementRef, private rendrer: Renderer2) { }
  


  ngAfterViewChecked(): void {
    try{
      if( this.is_setted )return
      let t = document.getElementById( this.TEMPLATE_REF )
      if( t )this.is_setted = true
      let htmlContent = t.innerHTML
      makeTippy(this.el.nativeElement, htmlContent)
    }catch(e){}
  }

}
