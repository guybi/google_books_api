import { Directive, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[detect-scroll]'
})
export class ScrollDirective implements OnInit {
  
  constructor() { }
  
  ngOnInit(): void {
    console.log("yy")
  }

  @HostListener('scroll', ['$event']) public scrolled($event: Event) {
    console.log("HERE2");
  }
}
