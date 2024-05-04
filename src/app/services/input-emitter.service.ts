import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ExpressionData} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class InputEmitterService {
  expression$: Subject<ExpressionData> = new Subject();

  constructor() {
  }
}
