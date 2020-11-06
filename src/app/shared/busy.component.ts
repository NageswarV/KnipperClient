import { Component } from '@angular/core';

@Component({
  selector: 'default-busy',
  template: `
<div class="sk-folding-cube">
  <div class="sk-cube1 sk-cube"></div>
  <div class="sk-cube2 sk-cube"></div>
  <div class="sk-cube4 sk-cube"></div>
  <div class="sk-cube3 sk-cube"></div>
</div>
  `,
})
export class CustomBusyComponent {}
