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
      expression: '',
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
      isActive: !index,
      id: this.uniqueIdCounter++
    })
  }

  setActive(id: number) {
    const index = this.calculatorInputs.findIndex(input => input.id === id);
    this.calculatorInputs.forEach(input => input.isActive = false)
    this.calculatorInputs[index].isActive = true;
    this.lastActiveIndex = index;
  }

  deleteInput(id: number) {
    const inputToDeleteIndex = this.calculatorInputs.findIndex(input => input.id === id);
    const wasInputActive = this.calculatorInputs[inputToDeleteIndex].isActive;
    this.calculatorInputs = this.calculatorInputs.filter(input => input.id !== id)
    if(wasInputActive && this.calculatorInputs.length){
      this.calculatorInputs[0].isActive = true;
    }
  }

}
