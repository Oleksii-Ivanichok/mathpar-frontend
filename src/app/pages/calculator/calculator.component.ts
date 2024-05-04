import {Component, input, OnDestroy, OnInit} from '@angular/core';
import {CalculatorInputComponent} from "../../components/calculator-input/calculator-input.component";
import {ToolBarComponent} from "../../components/tool-bar/tool-bar.component";
import {MatButton} from "@angular/material/button";
import {FormControl} from "@angular/forms";
import {InputEmitterService} from "../../services/input-emitter.service";
import {Subject, takeUntil} from "rxjs";

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
  lastActiveIndex: number = 1;
  uniqueIdCounter: number = 1;
  calculatorInputs = [{
    control: new FormControl('SPACE = R64[x, y];\n' +
      'f1 = \\sin(x);\n' +
      'f2 = \\sin(\\cos(x + \\tg(y)));\n' +
      'f3 = \\sin(x^2) + y;\n' +
      '\\print(f1, f2, f3);', {nonNullable: true}), isActive: true, id: 0
  }];

  constructor(private inputEmitterService: InputEmitterService) {
  }

  ngOnInit(): void {
    this.inputEmitterService.expression$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.calculatorInputs[this.lastActiveIndex].control.setValue(value.expression);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  addInput() {
    this.calculatorInputs.push({
      control: new FormControl('', {nonNullable: true}),
      isActive: false,
      id: this.uniqueIdCounter++
    });
  }

  setActive(index: number) {
    this.calculatorInputs[this.lastActiveIndex].isActive = false;
    this.calculatorInputs[index].isActive = true;
    this.lastActiveIndex = index;
  }

  deleteInput(index: number) {
    this.calculatorInputs = this.calculatorInputs.filter(input => input.id !== index)
  }


}
