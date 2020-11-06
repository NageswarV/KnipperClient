import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[StockAvailability]'
})
export class StockAvailabilityDirective implements OnInit {
  @Input('StockAvailability') stockbit: boolean;
  currentElement: ElementRef;
  constructor(private el: ElementRef) {
    this.currentElement = el;
  }
  ngOnInit() {
    const StockBit = this.stockbit;
    if (StockBit) {
      this.currentElement.nativeElement.innerHTML = '<div class="in-stock"><span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> In Stock</div>';
      //this.currentElement.nativeElement.style.color = 'green';
    } else {
      this.currentElement.nativeElement.innerHTML = '<div class="out-of-stock"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> Out Of Stock</div>';
      //this.currentElement.nativeElement.style.color = 'red';
    }
  }
}


