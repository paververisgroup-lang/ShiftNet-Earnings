/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="mt-16 border-t border-slate-800 bg-slate-950 py-12 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-6 text-center">
        {/* Reassuring privacy badge */}
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-slate-300 text-xs font-medium">
          <ShieldCheck className="h-4 w-4 text-sky-400" />
          <span>Privacy Guaranteed &mdash; Local Storage Only</span>
        </div>

        {/* User-requested privacy text */}
        <div className="max-w-3xl mx-auto space-y-2">
          <p id="privacy-text" className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-200 uppercase tracking-wider block sm:inline mr-1">Privacy Policy:</span>
            Your data belongs to you. ShiftNet Earnings is a localized utility tool. All calculations are performed directly within your web browser. We do not track, collect, store, or sell any of your personal financial data, earnings, or mileage logs. Your information remains entirely private on your own device.
          </p>
        </div>

        {/* copyright and attribution */}
        <div className="text-[11px] text-slate-500 font-mono space-y-1">
          <p>&copy; {currentYear} ShiftNet Earnings. Built for independent contractors and gig economy drivers.</p>
          <p>Calculations based on standard IRS mileage and expense deduction concepts.</p>
        </div>
      </div>

      {/* Decorative watermark from the Sophisticated Dark design */}
      <div className="absolute right-6 bottom-4 opacity-[0.03] select-none pointer-events-none hidden sm:block">
        <h2 className="text-7xl font-black italic tracking-tighter text-slate-100">SHIFTNET EARNINGS</h2>
      </div>
    </footer>
  );
}
