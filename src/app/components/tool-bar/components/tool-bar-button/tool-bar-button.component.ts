import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MathjaxModule} from "mathjax-angular";

@Component({
  selector: 'app-tool-bar-button',
  standalone: true,
  imports: [
    MatButton,
    MathjaxModule
  ],
  templateUrl: './tool-bar-button.component.html',
  styleUrl: './tool-bar-button.component.scss'
})
export class ToolBarButtonComponent {
  @Input() title!: string;
}
