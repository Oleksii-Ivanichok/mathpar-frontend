import {
  Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommandsService} from "../../services/commands.service";
import {CalculateResult, ExpressionData} from "../../interfaces/interfaces";
import {NgClass, NgIf} from "@angular/common";
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
    ToolBarButtonComponent,
    NgClass
  ],
  templateUrl: './calculator-input.component.html',
  styleUrl: './calculator-input.component.scss'
})
export class CalculatorInputComponent implements OnChanges {
  @ViewChild('input') inputRef!: ElementRef<HTMLTextAreaElement>;
  @Input() expressionData!: ExpressionData;
  @Input() isActive!: boolean;
  @Output() setActive = new EventEmitter<void>();
  @Output() deleteInput = new EventEmitter<void>();
  @Output() addInput = new EventEmitter<void>;

  formControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  calculationResult: string = '';
  mathJaxEnabled: boolean = false;
  mathJaxInput: string = '';
  lastCalculationResult: boolean = false;
  constructor(private commandsService: CommandsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expressionData']) {
      if (this.inputRef) {
        const cursorPosition = this.inputRef.nativeElement.selectionStart;
        const insertedValue = this.expressionData.expression;
        const currentValue = this.formControl.value;
        const newValue = [
          currentValue.slice(0, cursorPosition),
          insertedValue,
          currentValue.slice(cursorPosition)
        ].join('');
        this.formControl.setValue(newValue);
        if (this.expressionData.moveBack) {
          this.inputRef.nativeElement.selectionStart = this.inputRef.nativeElement.selectionEnd = cursorPosition + insertedValue.length - this.expressionData.moveBack;
        }
        this.inputRef.nativeElement.focus();
      }
    }
  }

  calculate() {
    this.commandsService.calculate({task: this.formControl.value}).subscribe((response: CalculateResult) => {
      console.log(response)
      if (response.status === "OK") {
        this.calculationResult = response.result.replace(/\n/g, '<br>');
        this.mathJaxInput = response.latex.replace(/\n\n/g, '<br>');
        this.mathJaxEnabled = true;
        this.lastCalculationResult = true;
      } else {
        this.calculationResult = response.error.replace(/\n/g, '<br>');
        this.mathJaxInput = ''
        this.lastCalculationResult = false;
      }

    });
  }

  resetInput() {
    this.formControl.setValue('');
    this.calculationResult = '';
    this.mathJaxEnabled = false;
    this.mathJaxInput = '';
  }
}
