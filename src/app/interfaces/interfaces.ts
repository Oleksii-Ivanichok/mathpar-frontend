export interface CalculatePayload {
  task: string;
}
export interface CalculateResult {
  result: string;
  latex: string;
  status: string;
  error: string;
}
export interface CalculatorInput {
  expressionData: ExpressionData;
  isActive: boolean;
  id: number;
}
export interface ExpressionData {
  expression: string;
  moveBack?: number;
}


