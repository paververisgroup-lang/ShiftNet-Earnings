/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DollarSign, Navigation, Fuel, Gauge, Clock, Percent } from 'lucide-react';
import { CalculatorInputs } from '../types';

interface InputFormProps {
  inputs: CalculatorInputs;
  onInputChange: (name: keyof CalculatorInputs, value: number | '') => void;
  onReset: () => void;
}

export default function InputForm({ inputs, onInputChange, onReset }: InputFormProps) {
  const handleChange = (name: keyof CalculatorInputs, valueString: string) => {
    if (valueString === '') {
      onInputChange(name, '');
      return;
    }

    // Parse the float, but strip out negative values for logical consistency
    const num = parseFloat(valueString);
    if (!isNaN(num)) {
      onInputChange(name, Math.max(0, num));
    }
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onInputChange('taxRate', parseFloat(e.target.value));
  };

  return (
    <div id="calculator-input-form" className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 id="form-heading" className="text-sm font-bold uppercase text-sky-400 tracking-wider flex items-center gap-2">
          Shift Details
        </h2>
        <button
          id="btn-reset-form"
          type="button"
          onClick={onReset}
          className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors py-1 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg"
        >
          Reset
        </button>
      </div>

      <form id="calculator-form" className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Gross Shift Earnings */}
        <div className="space-y-1.5 flex flex-col">
          <label htmlFor="grossEarnings" className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            Gross Shift Earnings ($)
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <DollarSign className="h-4 w-4 text-slate-500" aria-hidden="true" />
            </div>
            <input
              type="number"
              name="grossEarnings"
              id="grossEarnings"
              min="0"
              step="any"
              placeholder="0.00"
              value={inputs.grossEarnings}
              onChange={(e) => handleChange('grossEarnings', e.target.value)}
              className="block w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-9 pr-4 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none text-sm font-medium"
            />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Your total gross payout for this shift (before expenses).</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Total Miles Driven */}
          <div className="space-y-1.5 flex flex-col">
            <label htmlFor="totalMiles" className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
              Total Miles Driven
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Navigation className="h-4 w-4 text-slate-500 rotate-45" aria-hidden="true" />
              </div>
              <input
                type="number"
                name="totalMiles"
                id="totalMiles"
                min="0"
                step="any"
                placeholder="0"
                value={inputs.totalMiles}
                onChange={(e) => handleChange('totalMiles', e.target.value)}
                className="block w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-9 pr-4 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none text-sm font-medium"
              />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">All miles driven on the clock.</p>
          </div>

          {/* Shift Duration */}
          <div className="space-y-1.5 flex flex-col">
            <label htmlFor="hours" className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
              Shift Duration (Hours)
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Clock className="h-4 w-4 text-slate-500" aria-hidden="true" />
              </div>
              <input
                type="number"
                name="hours"
                id="hours"
                min="0"
                step="any"
                placeholder="0.0"
                value={inputs.hours}
                onChange={(e) => handleChange('hours', e.target.value)}
                className="block w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-9 pr-4 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none text-sm font-medium"
              />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Active working hours for the shift.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Fuel Price */}
          <div className="space-y-1.5 flex flex-col">
            <label htmlFor="fuelPrice" className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
              Fuel Price ($ / Gal)
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Fuel className="h-4 w-4 text-slate-500" aria-hidden="true" />
              </div>
              <input
                type="number"
                name="fuelPrice"
                id="fuelPrice"
                min="0"
                step="any"
                placeholder="3.50"
                value={inputs.fuelPrice}
                onChange={(e) => handleChange('fuelPrice', e.target.value)}
                className="block w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-9 pr-4 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none text-sm font-medium"
              />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Estimated cost of gas per gallon.</p>
          </div>

          {/* Vehicle MPG */}
          <div className="space-y-1.5 flex flex-col">
            <label htmlFor="mpg" className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
              Vehicle MPG
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Gauge className="h-4 w-4 text-slate-500" aria-hidden="true" />
              </div>
              <input
                type="number"
                name="mpg"
                id="mpg"
                min="1"
                step="any"
                placeholder="25"
                value={inputs.mpg}
                onChange={(e) => handleChange('mpg', e.target.value)}
                className="block w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-9 pr-4 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none text-sm font-medium"
              />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Average fuel economy (default: 25).</p>
          </div>
        </div>

        {/* Tax Withholding Rate */}
        <div className="space-y-1.5 flex flex-col">
          <label htmlFor="taxRate" className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            Estimated Tax Withholding
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Percent className="h-4 w-4 text-slate-500" aria-hidden="true" />
            </div>
            <select
              name="taxRate"
              id="taxRate"
              value={inputs.taxRate}
              onChange={handleTaxChange}
              className="block w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-9 pr-10 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none text-sm font-medium appearance-none"
            >
              <option value={0.15}>15% (Low Bracket / Multi-Deduction)</option>
              <option value={0.20}>20% (Recommended Standard / Default)</option>
              <option value={0.25}>25% (Middle Bracket / Standard)</option>
              <option value={0.30}>30% (High Bracket / Self-Employment Tax)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">For self-employment income taxes (calculated after expenses).</p>
        </div>
      </form>
    </div>
  );
}
