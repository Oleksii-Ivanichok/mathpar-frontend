import { Component } from '@angular/core';
import {CalculatorInputComponent} from "../../components/calculator-input/calculator-input.component";
import {ToolBarComponent} from "../../components/tool-bar/tool-bar.component";

@Component({
  selector: 'app-calculator',
  standalone: true,
    imports: [
        CalculatorInputComponent,
        ToolBarComponent
    ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {

}
