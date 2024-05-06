import {Component, OnDestroy, OnInit} from '@angular/core';
import {CalculatorInputComponent} from "../../components/calculator-input/calculator-input.component";
import {ToolBarComponent} from "../../components/tool-bar/tool-bar.component";
import {MatButton} from "@angular/material/button";
import {InputEmitterService} from "../../services/input-emitter.service";
import {Subject, takeUntil} from "rxjs";
import {CalculatorInput} from "../../interfaces/interfaces";

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CalculatorInputComponent,
    ToolBarComponent,
    MatButton
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  lastActiveIndex: number = 0;
  uniqueIdCounter: number = 1;
  calculatorInputs: CalculatorInput[] = [{
    expressionData: {
      expression: 'SPACE = R64[x, y];\n' +
        'f1 = \\sin(x);\n' +
        'f2 = \\sin(\\cos(x + \\tg(y)));\n' +
        'f3 = \\sin(x^2) + y;\n' +
        '\\print(f1, f2, f3);',
      moveBack: 0
    }, isActive: true, id: 0
  }];

  constructor(private inputEmitterService: InputEmitterService) {
  }

  ngOnInit(): void {
    this.inputEmitterService.expression$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.calculatorInputs[this.lastActiveIndex] ? this.calculatorInputs[this.lastActiveIndex].expressionData = value : null;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addInput(id?: number) {
    const index = this.calculatorInputs.findIndex(input => input.id === id) + 1;
    this.calculatorInputs.splice(index || 0, 0, {
      expressionData: {expression: ''},
      isActive: false,
      id: this.uniqueIdCounter++
    })
  }

  setActive(id: number) {
    const index = this.calculatorInputs.findIndex(input => input.id === id);
    this.calculatorInputs[this.lastActiveIndex].isActive = false;
    this.calculatorInputs[index].isActive = true;
    this.lastActiveIndex = index;
  }

  deleteInput(index: number) {
    this.calculatorInputs = this.calculatorInputs.filter(input => input.id !== index)
  }

}
