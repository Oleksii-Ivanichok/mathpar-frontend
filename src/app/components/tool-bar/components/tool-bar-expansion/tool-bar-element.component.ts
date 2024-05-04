import {Component, Input} from '@angular/core';
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: 'app-tool-bar-expansion',
  standalone: true,
  imports: [
    MatExpansionModule
  ],
  templateUrl: './tool-bar-element.component.html',
  styleUrl: './tool-bar-element.component.scss'
})
export class ToolBarElementComponent {
  @Input() title?: string;
}
