import { Component } from '@angular/core';
import {ToolBarExpansionComponent} from "./components/tool-bar-expansion/tool-bar-expansion.component";
import {ToolBarButtonComponent} from "./components/tool-bar-button/tool-bar-button.component";

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [
    ToolBarExpansionComponent,
    ToolBarButtonComponent
  ],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {
}
