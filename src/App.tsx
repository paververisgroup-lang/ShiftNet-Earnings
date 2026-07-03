/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { CalculatorInputs } from './types';
import { calculateResults } from './utils/calculator';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';
import LockReportModal from './components/LockReportModal';
import AboutSection from './components/AboutSection';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Gauge, Navigation, DollarSign } from 'lucide-react';
import { generatePdfReport } from './utils/pdfGenerator';

const DEFAULT_INPUTS: CalculatorInputs = {
  grossEarnings: 150,
  totalMiles: 60,
  fuelPrice: 3.65,
  mpg: 25,
  hours: 5,
  taxRate: 0.20,
};

export default function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const results = useMemo(() => {
    return calculateResults(inputs);
  }, [inputs]);

  const handleInputChange = (name: keyof CalculatorInputs, value: number | '') => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setInputs({
      grossEarnings: '',
      totalMiles: '',
      fuelPrice: '',
      mpg: 25,
      hours: '',
      taxRate: 0.20,
    });
  };

  const handleGenerateReport = () => {
    generatePdfReport(inputs, results);
    setIsModalOpen(true);
  };

  return (
    <div id="app-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-sky-500/30 selection:text-white">
      {/* Top Header Navigation */}
      <header id="app-header" className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-600/10 border border-sky-500/20">
              <Gauge className="h-5 w-5" />
            </div>
            <div>
              <span id="app-logo-text" className="text-md sm:text-lg font-bold text-white tracking-tight leading-none uppercase block">
                ShiftNet Earnings
              </span>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Contractor Profit &amp; Mileage Calculator</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-2.5 py-1 text-xs text-slate-400 border border-slate-800">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse"></span> IRS Mileage Standard
            </span>
            <span className="text-[11px] bg-slate-900/65 px-2 py-1 rounded border border-slate-800/80">
              v1.0.0
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Page Hero Text */}
        <div id="page-hero" className="space-y-3 text-center max-w-3xl mx-auto pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            ShiftNet Earnings: Contractor Profit &amp; Mileage Calculator
          </h1>
          <h2 className="text-base sm:text-lg font-medium text-sky-400 tracking-normal">
            An independent contractor expense tracker tool built for the solo driver.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto pt-1">
            Learn how to calculate gig worker taxes and uncover your actual take-home earnings with our straightforward mileage tracker for independent contractors. Many gig platforms advertise high payout figures but obscure the heavy toll of fuel costs, vehicle wear-and-tear depreciation, and self-employment tax liabilities.
          </p>
        </div>

        {/* Dynamic Calculator Grid */}
        <div id="calculator-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left / Top column: Input controls */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-6">
            <InputForm
              inputs={inputs}
              onInputChange={handleInputChange}
              onReset={handleReset}
            />
          </div>

          {/* Right / Bottom column: Live dashboard outputs */}
          <div className="lg:col-span-7 xl:col-span-7 h-full">
            <ResultsDashboard
              inputs={inputs}
              results={results}
              onGenerateReport={handleGenerateReport}
            />
          </div>
        </div>

        {/* About Creator section underneath calculator */}
        <AboutSection />

        {/* Invisible SEO Content Block for search engine crawlers */}
        <div className="sr-only" aria-hidden="true" id="seo-content-block">
          <h3>Delivery Driver True Hourly Profit Calculator Reference Information</h3>
          <p>
            This web page acts as a comprehensive <strong>delivery driver true hourly profit calculator</strong> and robust <strong>independent contractor expense tracker tool</strong>. 
            For those seeking <strong>how to calculate gig worker taxes</strong>, this system handles the core math of self-employment tax estimations. 
            Our digital <strong>mileage tracker for independent contractors</strong> factors in real-time mileage, MPG, fuel rates, and depreciation algorithms to represent your true wage transparently.
          </p>
          <ul>
            <li>SEO Phrase 1: delivery driver true hourly profit calculator</li>
            <li>SEO Phrase 2: independent contractor expense tracker tool</li>
            <li>SEO Phrase 3: how to calculate gig worker taxes</li>
            <li>SEO Phrase 4: mileage tracker for independent contractors</li>
          </ul>
        </div>
      </main>

      {/* Privacy Policy and Footer Section */}
      <PrivacyPolicy />

      {/* Subscription Popup Modal */}
      <LockReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownloadAgain={handleGenerateReport}
      />
    </div>
  );
}
