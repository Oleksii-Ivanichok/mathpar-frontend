export interface CalculatePayload {
  task: string;
}
export interface CalculateResult {
  result: string;
  latex: string;
}
export interface ExpressionData {
  expression: string;
  moveBack?: number;
}
