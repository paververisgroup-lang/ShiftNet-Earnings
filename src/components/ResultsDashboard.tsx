/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { formatCurrency, formatPercent } from '../utils/calculator';
import { CalculationResults, CalculatorInputs } from '../types';
import { ShieldAlert, Info, FileDown, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultsDashboardProps {
  inputs: CalculatorInputs;
  results: CalculationResults;
  onGenerateReport: () => void;
}

export default function ResultsDashboard({ inputs, results, onGenerateReport }: ResultsDashboardProps) {
  const {
    grossHourlyRate,
    totalFuelCost,
    wearAndTearCost,
    estimatedTaxOwed,
    trueNetHourlyProfit,
    trueTakeHomePay,
  } = results;

  const grossEarnings = Number(inputs.grossEarnings) || 0;
  const totalDeductions = totalFuelCost + wearAndTearCost + estimatedTaxOwed;
  
  // Calculate percentage of gross earnings for visualization
  const netPercent = grossEarnings > 0 ? Math.max(0, (trueTakeHomePay / grossEarnings) * 100) : 0;
  const fuelPercent = grossEarnings > 0 ? (totalFuelCost / grossEarnings) * 100 : 0;
  const wearPercent = grossEarnings > 0 ? (wearAndTearCost / grossEarnings) * 100 : 0;
  const taxPercent = grossEarnings > 0 ? (estimatedTaxOwed / grossEarnings) * 100 : 0;

  // Visual warning if the net hourly profit is very low or below minimum wage
  const isLowHourly = trueNetHourlyProfit > 0 && trueNetHourlyProfit < 12;

  return (
    <div id="calculator-results-dashboard" className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between h-full">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 id="results-heading" className="text-sm font-bold uppercase text-sky-400 tracking-wider">
            True Pay Dashboard
          </h2>
          <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-400 ring-1 ring-inset ring-sky-500/20">
            Real-Time
          </span>
        </div>

        {/* Primary Metrics Row (True Take-Home & True Hourly Profit) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Gross Hourly Rate Card */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col justify-center items-center text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Gross Hourly</span>
            <div id="res-gross-hr" className="text-3xl font-light text-white font-mono">
              {formatCurrency(grossHourlyRate)}/hr
            </div>
          </div>

          {/* True Net Hourly Profit Card */}
          <div className="bg-sky-900/20 border border-sky-800/30 rounded-2xl p-5 flex flex-col justify-center items-center text-center ring-1 ring-sky-500/20">
            <span className="text-[10px] text-sky-400 uppercase font-bold tracking-widest mb-1">True Net Hourly Profit</span>
            <div id="res-net-hr" className="text-3xl font-bold text-sky-400 font-mono">
              {formatCurrency(trueNetHourlyProfit)}/hr
            </div>
          </div>
        </div>

        {/* Fuel & Maintenance details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Fuel & Maintenance Card */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block mb-2">Fuel &amp; Maintenance</span>
            <div className="flex justify-between mb-1 text-xs">
              <span className="text-slate-400">Total Fuel Cost</span>
              <span id="res-fuel-total" className="text-white font-mono font-medium">{formatCurrency(totalFuelCost)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                Wear &amp; Tear ($0.30/mi)
                <div className="group relative">
                  <Info className="h-3 w-3 text-slate-500 cursor-pointer hover:text-slate-400" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-slate-950 text-[9px] p-2 rounded border border-slate-800 hidden group-hover:block z-10 text-slate-400 leading-normal font-sans normal-case tracking-normal">
                    Calculated using standard maintenance &amp; depreciation estimate of $0.30 per mile driven.
                  </div>
                </div>
              </span>
              <span id="res-wear" className="text-white font-mono font-medium">{formatCurrency(wearAndTearCost)}</span>
            </div>
          </div>

          {/* Taxes & Deductions Card */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block mb-2">Taxes &amp; Deductions</span>
            <div className="flex justify-between mb-1 text-xs">
              <span className="text-slate-400">Est. Tax Owed</span>
              <span id="res-tax" className="text-rose-400 font-mono font-medium">{formatCurrency(estimatedTaxOwed)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Total Deductions</span>
              <span id="res-deduct" className="text-white font-mono font-medium">{formatCurrency(totalDeductions)}</span>
            </div>
          </div>
        </div>

        {/* Final True Take-Home Pay Column Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-widest block">Final True Take-Home Pay</span>
            <div className="text-xs text-slate-500 italic mt-1">Calculated after fuel, maintenance, and taxes.</div>
          </div>
          <div id="res-take-home" className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight shrink-0">
            {formatCurrency(trueTakeHomePay)}
          </div>
        </div>

        {/* Warning Indicator for low net pay */}
        {isLowHourly && (
          <div id="low-pay-warning" className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2.5 text-amber-400 text-xs">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Low Net Earnings Warning:</span> After factoring in vehicle expenses and tax liabilities, your true net hourly rate is lower than average local minimum wage ({formatCurrency(trueNetHourlyProfit)}/hr). Try optimizing your mileage routes or adjusting fuel costs.
            </div>
          </div>
        )}

        {/* Total Deductions / Margin visualizer */}
        {grossEarnings > 0 && (
          <div className="bg-slate-950/30 border border-slate-800/60 p-4 rounded-xl space-y-2 pt-3">
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Earnings Breakdown</span>
              <span>{formatCurrency(totalDeductions)} in expenses &amp; tax ({formatPercent(totalDeductions / grossEarnings)})</span>
            </div>
            {/* Visual Segmented Bar */}
            <div className="h-2 w-full bg-slate-950 rounded-full flex overflow-hidden">
              <div
                style={{ width: `${netPercent}%` }}
                className="bg-sky-500 h-full transition-all duration-300"
                title={`Take-Home Pay: ${netPercent.toFixed(1)}%`}
              />
              <div
                style={{ width: `${fuelPercent}%` }}
                className="bg-amber-400 h-full transition-all duration-300"
                title={`Fuel Cost: ${fuelPercent.toFixed(1)}%`}
              />
              <div
                style={{ width: `${wearPercent}%` }}
                className="bg-rose-500 h-full transition-all duration-300"
                title={`Wear & Tear: ${wearPercent.toFixed(1)}%`}
              />
              <div
                style={{ width: `${taxPercent}%` }}
                className="bg-indigo-500 h-full transition-all duration-300"
                title={`Taxes: ${taxPercent.toFixed(1)}%`}
              />
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 inline-block"></span> Take-Home ({netPercent.toFixed(0)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 inline-block"></span> Fuel ({fuelPercent.toFixed(0)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 inline-block"></span> Wear ({wearPercent.toFixed(0)}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 inline-block"></span> Tax ({taxPercent.toFixed(0)}%)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Free Weekly Reports CTA */}
      <div className="pt-6 border-t border-slate-800 mt-6">
        <button
          id="btn-generate-pdf-report"
          type="button"
          onClick={onGenerateReport}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-sky-950/40 to-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-xl transition-all duration-200 group text-left cursor-pointer shadow-lg shadow-sky-950/10"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 rounded-lg group-hover:bg-sky-500/20 transition-colors">
              <FileDown className="h-5 w-5 text-sky-400 group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                Generate Shift PDF Report <span className="inline-flex items-center rounded bg-sky-500/10 px-1.5 py-0.5 text-[9px] font-bold text-sky-400 ring-1 ring-inset ring-sky-500/20">FREE</span>
              </p>
              <p className="text-xs text-slate-400">Download professional summary report instantly</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}
