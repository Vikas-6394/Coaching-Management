import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Calendar, Receipt, CreditCard, CheckCircle } from 'lucide-react';

export const FeeCard = ({
  fee,
  onPay,
  onViewReceipt
}) => {
  const isPaid = fee.status === 'Paid';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Installment #{fee.installmentNo || 1}
          </span>
          <StatusBadge status={fee.status} />
        </div>

        <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
          {fee.courseTitle || "Course Tuition"}
        </h4>

        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Amount Due</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              ₹{Number(fee.amount).toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isPaid ? "Paid On" : "Due Date"}
            </p>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1 justify-end">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {isPaid ? (fee.paidDate || "Verified") : fee.dueDate}
            </p>
          </div>
        </div>

        {isPaid && fee.receiptNumber && (
          <div className="mt-3 py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="font-mono">{fee.receiptNumber}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Paid
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
        {isPaid ? (
          <button
            type="button"
            onClick={() => onViewReceipt(fee)}
            className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            <Receipt className="w-4 h-4 text-blue-500" /> Download Receipt
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onPay(fee)}
            className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-101"
          >
            <CreditCard className="w-4 h-4" /> Mark as Paid (Demo)
          </button>
        )}
      </div>
    </div>
  );
};
