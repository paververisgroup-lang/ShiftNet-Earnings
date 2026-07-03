/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { CalculatorInputs, CalculationResults } from '../types';
import { formatCurrency, formatPercent } from './calculator';

export function generatePdfReport(inputs: CalculatorInputs, results: CalculationResults): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const grossEarnings = Number(inputs.grossEarnings) || 0;
  const totalMiles = Number(inputs.totalMiles) || 0;
  const fuelPrice = Number(inputs.fuelPrice) || 0;
  const mpg = Number(inputs.mpg) || 25;
  const hours = Number(inputs.hours) || 0;
  const taxRate = inputs.taxRate;

  const {
    grossHourlyRate,
    totalFuelCost,
    wearAndTearCost,
    estimatedTaxOwed,
    trueNetHourlyProfit,
    trueTakeHomePay,
  } = results;

  const totalExpenses = totalFuelCost + wearAndTearCost;
  const totalDeductions = totalExpenses + estimatedTaxOwed;

  // --- Theme Colors ---
  // Slate dark and sleek colors
  const primaryColor = [15, 23, 42]; // #0f172a (Slate-900)
  const accentColor = [2, 132, 199];  // #0284c7 (Sky-600)
  const successColor = [16, 185, 129]; // #10b981 (Emerald-500)
  const textColor = [51, 65, 85];    // #334155 (Slate-700)
  const lightBg = [248, 250, 252];    // #f8fafc (Slate-50)

  // --- Document Title & Header ---
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('SHIFTNET EARNINGS', 15, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(186, 230, 253); // sky-200
  doc.text('CONTRACTOR PROFIT & MILEAGE SUMMARY REPORT', 15, 24);

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(`Generated: ${dateStr}`, 15, 30);

  // --- Column 1: Shift Details (Left) ---
  let y = 55;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('SHIFT INPUTS', 15, y);

  // Draw line
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.line(15, y + 2, 95, y + 2);

  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  const leftColumnInputs = [
    { label: 'Gross Shift Earnings:', value: formatCurrency(grossEarnings) },
    { label: 'Total Miles Driven:', value: `${totalMiles} miles` },
    { label: 'Shift Duration:', value: `${hours} hours` },
    { label: 'Estimated Fuel Price:', value: `${formatCurrency(fuelPrice)} / gal` },
    { label: 'Vehicle fuel economy:', value: `${mpg} MPG` },
    { label: 'Estimated Tax Rate:', value: formatPercent(taxRate) },
  ];

  leftColumnInputs.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.text(item.label, 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(item.value, 62, y);
    y += 8;
  });

  // --- Column 2: Net Hourly Performance Metrics (Right) ---
  y = 55;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('EFFICIENCY METRICS', 110, y);

  doc.setDrawColor(226, 232, 240);
  doc.line(110, y + 2, 195, y + 2);

  y += 10;
  
  // Gross hourly box
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.rect(110, y, 85, 14, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('GROSS HOURLY WAGE', 114, y + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`${formatCurrency(grossHourlyRate)} / hr`, 114, y + 11);

  y += 18;

  // True Net Hourly Profit Box (Highlighted)
  doc.setFillColor(224, 242, 254); // sky-100
  doc.rect(110, y, 85, 18, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('TRUE NET HOURLY PROFIT', 114, y + 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text(`${formatCurrency(trueNetHourlyProfit)} / hr`, 114, y + 14);

  // --- Bottom Section: Financial Statement Breakdown ---
  y = 115;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('EXPENSE &amp; REVENUE STATEMENT', 15, y);

  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.8);
  doc.line(15, y + 2, 195, y + 2);

  y += 10;

  // Table header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(15, y, 180, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('LINE ITEM', 18, y + 5);
  doc.text('CALCULATION BASIS', 75, y + 5);
  doc.text('AMOUNT', 165, y + 5);

  y += 8;

  const tableRows = [
    {
      name: 'Gross Shift Revenue',
      basis: 'Total driver payout recorded',
      amount: formatCurrency(grossEarnings),
      isBold: true,
      isPositive: true,
    },
    {
      name: 'Fuel Expense',
      basis: `(${totalMiles} mi / ${mpg} MPG) * ${formatCurrency(fuelPrice)}/gal`,
      amount: `-${formatCurrency(totalFuelCost)}`,
      isBold: false,
      isPositive: false,
    },
    {
      name: 'Vehicle wear-and-tear',
      basis: `${totalMiles} miles * IRS standard maint. estimate ($0.30/mi)`,
      amount: `-${formatCurrency(wearAndTearCost)}`,
      isBold: false,
      isPositive: false,
    },
    {
      name: 'Estimated Self-Employment Tax',
      basis: `Taxable net income * withhold rate (${formatPercent(taxRate)})`,
      amount: `-${formatCurrency(estimatedTaxOwed)}`,
      isBold: false,
      isPositive: false,
    },
  ];

  doc.setFontSize(9);
  tableRows.forEach((row, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.rect(15, y, 180, 8, 'F');
    }
    
    if (row.isBold) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    }

    doc.text(row.name, 18, y + 5.5);
    doc.text(row.basis, 75, y + 5.5);
    
    if (row.isBold) {
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    } else if (row.isPositive) {
      doc.setTextColor(successColor[0], successColor[1], successColor[2]);
    } else {
      doc.setTextColor(190, 24, 74); // rose-700
    }
    doc.text(row.amount, 165, y + 5.5);

    y += 8;
  });

  // Total Deductions summary row
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(15, y, 195, y);

  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('Total Expense & Tax Deductions:', 75, y + 5);
  doc.setTextColor(190, 24, 74);
  doc.text(`-${formatCurrency(totalDeductions)}`, 165, y + 5);

  y += 10;

  // Final Net Take-Home Pay Grand Box
  doc.setFillColor(209, 250, 229); // emerald-100
  doc.rect(15, y, 180, 16, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(6, 95, 70); // emerald-800
  doc.text('FINAL TRUE TAKE-HOME PAY', 18, y + 10);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(formatCurrency(trueTakeHomePay), 160, y + 11);

  // --- Visual Bar Chart in PDF ---
  y += 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('REVENUE SHARE VISUALIZATION', 15, y);
  
  doc.setDrawColor(226, 232, 240);
  doc.line(15, y + 2, 195, y + 2);

  y += 8;

  const netPct = grossEarnings > 0 ? (trueTakeHomePay / grossEarnings) * 100 : 0;
  const fuelPct = grossEarnings > 0 ? (totalFuelCost / grossEarnings) * 100 : 0;
  const wearPct = grossEarnings > 0 ? (wearAndTearCost / grossEarnings) * 100 : 0;
  const taxPct = grossEarnings > 0 ? (estimatedTaxOwed / grossEarnings) * 100 : 0;

  const barX = 15;
  const barWidth = 180;
  const barHeight = 6;

  // Background
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(barX, y, barWidth, barHeight, 'F');

  let currentX = barX;

  // Draw Take-home segment
  if (netPct > 0) {
    const w = (netPct / 100) * barWidth;
    doc.setFillColor(successColor[0], successColor[1], successColor[2]);
    doc.rect(currentX, y, w, barHeight, 'F');
    currentX += w;
  }
  // Draw fuel segment
  if (fuelPct > 0) {
    const w = (fuelPct / 100) * barWidth;
    doc.setFillColor(251, 191, 36); // amber-400
    doc.rect(currentX, y, w, barHeight, 'F');
    currentX += w;
  }
  // Draw wear segment
  if (wearPct > 0) {
    const w = (wearPct / 100) * barWidth;
    doc.setFillColor(239, 68, 68); // rose-500
    doc.rect(currentX, y, w, barHeight, 'F');
    currentX += w;
  }
  // Draw tax segment
  if (taxPct > 0) {
    const w = (taxPct / 100) * barWidth;
    doc.setFillColor(99, 102, 241); // indigo-500
    doc.rect(currentX, y, w, barHeight, 'F');
    currentX += w;
  }

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  let legendX = 15;
  const legendItems = [
    { label: `Take-home (${netPct.toFixed(0)}%)`, color: successColor },
    { label: `Fuel (${fuelPct.toFixed(0)}%)`, color: [251, 191, 36] },
    { label: `Wear (${wearPct.toFixed(0)}%)`, color: [239, 68, 68] },
    { label: `Tax (${taxPct.toFixed(0)}%)`, color: [99, 102, 241] },
  ];

  legendItems.forEach((item) => {
    doc.setFillColor(item.color[0], item.color[1], item.color[2]);
    doc.rect(legendX, y - 2, 3, 3, 'F');
    doc.text(item.label, legendX + 5, y);
    legendX += 45;
  });

  // --- Document Footer ---
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Privacy Note: This report was compiled entirely client-side on your device. We do not track or save your earnings history.', 15, 282);
  doc.text('ShiftNet Earnings Calculator &copy; 2026. Made for independent professionals.', 15, 287);

  // Save the PDF
  const filename = `ShiftNet_Earnings_Shift_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
