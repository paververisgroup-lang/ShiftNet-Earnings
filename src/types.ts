/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CalculatorInputs {
  grossEarnings: number | '';
  totalMiles: number | '';
  fuelPrice: number | '';
  mpg: number | '';
  hours: number | '';
  taxRate: number; // decimal representation, e.g., 0.20
}

export interface CalculationResults {
  grossHourlyRate: number;
  totalFuelCost: number;
  wearAndTearCost: number;
  estimatedTaxOwed: number;
  trueNetHourlyProfit: number;
  trueTakeHomePay: number;
}

export interface SavedShift {
  id: string;
  date: string;
  inputs: CalculatorInputs;
  results: CalculationResults;
}
