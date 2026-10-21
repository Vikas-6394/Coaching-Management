import React, { useRef } from 'react';
import { Modal } from './Modal';
import { Printer, Download, CheckCircle, GraduationCap } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ReceiptModal = ({ isOpen, onClose, feeRecord, student }) => {
  const toast = useToast();
  const receiptRef = useRef(null);

  if (!feeRecord) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Demo Receipt PDF generated and ready for your records!", "Receipt Exported");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Receipt & Tax Invoice"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 text-slate-800 dark:text-slate-100" ref={receiptRef}>
        {/* Printable Receipt Paper */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  EduManage Institute
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Excellence in Engineering & Medical Entrance
                </p>
                <p className="text-xs text-slate-400">Reg No: EDU-2024-ND-9921</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <CheckCircle className="w-3.5 h-3.5" /> Official Receipt
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                {feeRecord.receiptNumber || "EDM-REC-2026-0042"}
              </p>
              <p className="text-xs text-slate-400">
                Date: {feeRecord.paidDate || new Date().toISOString().split('T')[0]}
              </p>
            </div>
          </div>

          {/* Student & Payment Info Grid */}
          <div className="grid grid-cols-2 gap-4 py-5 border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
            <div>
              <p className="text-slate-400 font-medium">Billed To (Student):</p>
              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                {student?.name || feeRecord.studentName}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Roll No: {student?.rollNumber || "2026-JEE-042"}
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Batch: {student?.batch || "JEE Advanced 2026"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 font-medium">Payment Details:</p>
              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                Mode: {feeRecord.paymentMode || "UPI / Online"}
              </p>
              <p className="text-slate-500 dark:text-slate-400 font-mono">
                Txn ID: {feeRecord.transactionId || "TXN8892104"}
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Status: Verified & Cleared
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="py-5 border-b border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase text-xs">
                  <th className="pb-2">Description</th>
                  <th className="pb-2 text-center">Installment</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                <tr>
                  <td className="py-3 text-slate-800 dark:text-slate-200">
                    <p className="font-bold">{feeRecord.courseTitle || "Coaching Course Fee"}</p>
                    <p className="text-xs text-slate-400">Classroom sessions, study material & test series</p>
                  </td>
                  <td className="py-3 text-center text-slate-500 dark:text-slate-400">
                    #{feeRecord.installmentNo || 1}
                  </td>
                  <td className="py-3 text-right font-bold text-slate-900 dark:text-white">
                    ₹{Number(feeRecord.amount).toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="pt-4 flex flex-col items-end gap-1.5 text-xs sm:text-sm">
            <div className="flex justify-between w-48 text-slate-500 dark:text-slate-400">
              <span>Subtotal:</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                ₹{Number(feeRecord.amount).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between w-48 text-slate-500 dark:text-slate-400">
              <span>Taxes (Included):</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">₹0.00</span>
            </div>
            <div className="flex justify-between w-48 pt-2 border-t border-slate-200 dark:border-slate-800 font-bold text-base text-slate-900 dark:text-white">
              <span>Total Paid:</span>
              <span className="text-blue-600 dark:text-blue-400">
                ₹{Number(feeRecord.amount).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Stamp / Footer Note */}
          <div className="mt-8 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <p className="italic">
              * This is a computer-generated demonstration receipt generated by EduManage.
            </p>
            <div className="text-center sm:text-right">
              <div className="inline-block border-b border-slate-400 w-32 mb-1" />
              <p className="font-semibold text-slate-600 dark:text-slate-300">Authorized Signatory</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-colors"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>
    </Modal>
  );
};
