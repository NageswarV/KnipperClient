import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'samplicity-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerOverlayComponent implements OnInit, OnDestroy {

  @Input() messageText: string = 'Spinner.Saving';
  @Input() messageTextTranslated: string = null;
  noScrollStyle: HTMLStyleElement;
  isVisible: boolean = false;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'no-scroll');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'no-scroll');
  }

}
