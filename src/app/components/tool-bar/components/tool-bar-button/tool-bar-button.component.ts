import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MathjaxModule} from "mathjax-angular";
import {MatTooltip} from "@angular/material/tooltip";
import {InputEmitterService} from "../../../../services/input-emitter.service";

@Component({
  selector: 'app-tool-bar-button',
  standalone: true,
  imports: [
    MatButton,
    MathjaxModule,
    MatTooltip
  ],
  templateUrl: './tool-bar-button.component.html',
  styleUrl: './tool-bar-button.component.scss'
})
export class ToolBarButtonComponent {
  @Input() title!: string;
  @Input() expression!: string;
  @Input() moveBack?: number;
  @Input() description?: string;

  constructor(public inputEmitterService: InputEmitterService) {
  }

}
