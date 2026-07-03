/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about-section" className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-6xl mx-auto mt-8">
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 shrink-0">
          <User className="h-5 w-5" />
        </div>
        <div className="space-y-3">
          <h2 id="about-heading" className="text-xs font-bold uppercase text-sky-400 tracking-widest flex items-center gap-2">
            About the Creator
          </h2>
          <p id="about-text" className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-4xl">
            ShiftNet Earnings was built by an independent professional who understands the daily grind of the gig economy.
            Traditional accounting apps are built for big corporations, filled with bloated features, and cost too much.
            This tool was created to give solo drivers a fast, stress-free, and honest look at their real take-home pay.
            No fluff, no hidden math—just the clear data you need to maximize your time on the road.
          </p>
        </div>
      </div>
    </section>
  );
}
