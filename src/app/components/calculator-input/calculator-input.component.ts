import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommandsService} from "../../services/commands.service";
import {CalculateResult} from "../../interfaces/interfaces";
import {NgIf} from "@angular/common";
import {MathjaxModule} from "mathjax-angular";
import {ToolBarButtonComponent} from "../tool-bar/components/tool-bar-button/tool-bar-button.component";

@Component({
  selector: 'app-calculator-input',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInput,
    CdkTextareaAutosize,
    ReactiveFormsModule,
    NgIf,
    MathjaxModule,
    ToolBarButtonComponent
  ],
  templateUrl: './calculator-input.component.html',
  styleUrl: './calculator-input.component.scss'
})
export class CalculatorInputComponent {
  @Input() formControl!: FormControl<string>;
  @Input() isActive!: boolean;
  @Output() setActive = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  calculationResult: string = '';
  mathJaxEnabled = false;
  mathJaxInput: string = '';

  constructor(private commandsService: CommandsService) {
  }

  calculate() {
    this.commandsService.calculate({task: this.formControl.value}).subscribe((response: CalculateResult) => {
      this.calculationResult = response.result.replace(/\n/g, '<br>');
      this.mathJaxInput = response.latex.replace(/\n\n/g, '<br>');
      this.mathJaxEnabled = true;
      // console.log(response);
      // console.log('this.calculatorInput.value', this.calculatorInput.value);
      // console.log('this.mathJaxInput', this.mathJaxInput);
    });
  }
}
