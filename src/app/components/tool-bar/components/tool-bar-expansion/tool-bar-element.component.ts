import {Component, Input, Optional, SkipSelf, ViewEncapsulation} from '@angular/core';
import {MatExpansionModule} from "@angular/material/expansion";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-tool-bar-expansion',
  standalone: true,
  imports: [
    MatExpansionModule,
    NgClass
  ],
  templateUrl: './tool-bar-element.component.html',
  styleUrl: './tool-bar-element.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ToolBarElementComponent {
  @Input() title?: string;
  isNested: boolean;

  constructor(
    @Optional() @SkipSelf() parentExpansion: ToolBarElementComponent
  ) {
    this.isNested = !!parentExpansion;
  }
}
