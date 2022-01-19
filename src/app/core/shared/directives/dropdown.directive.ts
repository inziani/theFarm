import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropDown]'
})
export class DowndownDirective{
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;

  }

}
