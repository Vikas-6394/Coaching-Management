import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { StatCard } from '../../components/StatCard';
import { FeeCard } from '../../components/FeeCard';
import { ReceiptModal } from '../../components/ReceiptModal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { CreditCard, CheckCircle2, AlertCircle, Receipt, Clock } from 'lucide-react';

export const StudentFees = () => {
  const { fees, recordFeePayment } = useData();
  const { user } = useAuth();
  const toast = useToast();

  const [selectedFeeForReceipt, setSelectedFeeForReceipt] = useState(null);
  const [feeToPay, setFeeToPay] = useState(null);

  // Filter fees for STU-001
  const studentFees = fees.filter(f => f.studentId === "STU-001");

  const totalFees = 85000;
  const paidFees = studentFees
    .filter(f => f.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const balance = Math.max(0, totalFees - paidFees);

  const handleConfirmPayment = () => {
    if (!feeToPay) return;
    recordFeePayment(feeToPay.id, { paymentMode: "UPI / Net Banking (Demo)" });
    toast.success(
      `Payment of ₹${Number(feeToPay.amount).toLocaleString('en-IN')} recorded successfully! Receipt generated.`,
      "Payment Successful"
    );
    setFeeToPay(null);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Fees & Tuition Management
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review your tuition payment schedule, verify paid installments, and download official receipts.
        </p>
      </div>

      {/* Simulated Fee Disclaimer */}
      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 flex items-start gap-3 text-xs text-blue-800 dark:text-blue-200">
        <CreditCard className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block">Simulated Payment Demonstration:</strong>
          This interface demonstrates fee installment tracking and receipt generation for educational portfolios. No real payment gateways or credit cards are processed.
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Program Fee"
          value={`₹${totalFees.toLocaleString('en-IN')}`}
          subtitle="JEE Advanced 2-Year"
          icon={CreditCard}
          color="blue"
        />
        <StatCard
          title="Total Paid"
          value={`₹${paidFees.toLocaleString('en-IN')}`}
          subtitle="Cleared & Verified"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Pending Balance"
          value={balance === 0 ? "₹0 (Fully Paid)" : `₹${balance.toLocaleString('en-IN')}`}
          subtitle={balance === 0 ? "Zero outstanding dues" : "Due in upcoming installment"}
          icon={Clock}
          color={balance === 0 ? "purple" : "amber"}
        />
      </div>

      {/* Installment Schedule Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Installment Schedule & Invoices
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studentFees.map((fee) => (
            <FeeCard
              key={fee.id}
              fee={fee}
              onPay={(item) => setFeeToPay(item)}
              onViewReceipt={(item) => setSelectedFeeForReceipt(item)}
            />
          ))}
        </div>
      </div>

      {/* Payment Confirmation Dialog */}
      {feeToPay && (
        <ConfirmDialog
          isOpen={!!feeToPay}
          onClose={() => setFeeToPay(null)}
          onConfirm={handleConfirmPayment}
          title="Simulate Fee Payment"
          message={`Are you sure you want to mark Installment #${feeToPay.installmentNo} (₹${Number(feeToPay.amount).toLocaleString('en-IN')}) as Paid? An official demo receipt will be generated.`}
          confirmText="Mark as Paid"
          confirmVariant="primary"
        />
      )}

      {/* Official Receipt Modal */}
      {selectedFeeForReceipt && (
        <ReceiptModal
          isOpen={!!selectedFeeForReceipt}
          onClose={() => setSelectedFeeForReceipt(null)}
          feeRecord={selectedFeeForReceipt}
          student={user}
        />
      )}
    </div>
  );
};
