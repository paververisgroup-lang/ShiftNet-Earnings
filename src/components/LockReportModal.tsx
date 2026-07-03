/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { X, Sparkles, ShieldCheck, CheckCircle2, FileDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LockReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadAgain: () => void;
}

export default function LockReportModal({ isOpen, onClose, onDownloadAgain }: LockReportModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            id="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl z-10"
          >
            {/* Header Close button */}
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors p-1.5 bg-slate-950/50 hover:bg-slate-950 rounded-full"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Icon Banner */}
            <div className="flex flex-col items-center text-center mt-3">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mb-4 ring-8 ring-emerald-500/5">
                <Sparkles className="h-7 w-7 animate-pulse" />
              </div>
              <h3 id="modal-title" className="text-xl font-bold text-white tracking-tight">
                Report Generated successfully!
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xs">
                Your professional PDF download has been initiated. Premium features are 100% unlocked and free.
              </p>
            </div>

            {/* Status Announcement */}
            <div className="my-5 bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-4 text-center ring-1 ring-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                ShiftNet Earnings Free Premium Active
              </span>
              <div className="flex items-baseline justify-center gap-1 mt-1">
                <span className="text-4xl font-extrabold text-white font-mono">$0.00</span>
                <span className="text-slate-400 text-sm line-through font-mono">$4.99/mo</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">No subscriptions, no accounts, no server tracking.</p>
            </div>

            {/* Included Features List */}
            <div className="space-y-3 mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Unlocked Tool Suite:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Instant PDF Shift Summaries</strong> - Full calculation breakdown format ready to attach to tax or income verification documents.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Device-Only Privacy</strong> - Local browser calculations ensure your financial details remain completely on your device.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Standard Maintenance Standard</strong> - Real-time calculation including standard gas cost + $0.30/mile vehicle wear-and-tear.
                  </span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <button
                id="btn-modal-redownload"
                type="button"
                onClick={onDownloadAgain}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold rounded-xl shadow-lg shadow-sky-950/20 hover:scale-[1.01] transition-all duration-150 cursor-pointer text-sm uppercase tracking-wider"
              >
                <FileDown className="h-4 w-4" />
                Download Copy Again
              </button>

              <button
                id="btn-close-modal-dashboard"
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-slate-950/45 hover:bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 font-medium rounded-xl text-xs transition-colors cursor-pointer"
              >
                Return to Calculator
              </button>
            </div>

            {/* Footer Trust seals */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex justify-center items-center gap-4 text-[9px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-400" /> Secure Browser Download
              </span>
              <span className="flex items-center gap-1">
                <X className="h-3.5 w-3.5 text-rose-500" /> No Card Required
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
