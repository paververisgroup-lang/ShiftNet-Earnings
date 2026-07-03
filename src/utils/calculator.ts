/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CalculatorInputs, CalculationResults } from '../types';

export function calculateResults(inputs: CalculatorInputs): CalculationResults {
  // Coerce empty strings or invalid inputs to numbers safely
  const earnings = Number(inputs.grossEarnings) || 0;
  const miles = Number(inputs.totalMiles) || 0;
  const fuelPrice = Number(inputs.fuelPrice) || 0;
  const mpg = Number(inputs.mpg) || 25; // fallback to default 25 to avoid division by zero
  const hours = Number(inputs.hours) || 0;
  const taxRate = inputs.taxRate;

  // 1. Gross Hourly Rate
  const grossHourlyRate = hours > 0 ? earnings / hours : 0;

  // 2. Total Fuel Cost: (Total Miles / MPG) * Fuel Price
  const totalFuelCost = mpg > 0 ? (miles / mpg) * fuelPrice : 0;

  // 3. Vehicle Wear-and-Tear Cost: Total Miles * $0.30
  const wearAndTearCost = miles * 0.30;

  // 4. Estimated Tax Owed: (Gross Earnings - Fuel Cost - Wear-and-Tear Cost) * Tax Rate
  // Taxable income shouldn't be less than 0.
  const taxableIncome = Math.max(0, earnings - totalFuelCost - wearAndTearCost);
  const estimatedTaxOwed = taxableIncome * taxRate;

  // 5. True Take-Home Pay: Gross Earnings - Fuel Cost - Wear-and-Tear Cost - Estimated Tax
  const trueTakeHomePay = earnings - totalFuelCost - wearAndTearCost - estimatedTaxOwed;

  // 6. True Net Hourly Profit: True Take-Home Pay / Hours
  const trueNetHourlyProfit = hours > 0 ? trueTakeHomePay / hours : 0;

  return {
    grossHourlyRate,
    totalFuelCost,
    wearAndTearCost,
    estimatedTaxOwed,
    trueNetHourlyProfit,
    trueTakeHomePay,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
