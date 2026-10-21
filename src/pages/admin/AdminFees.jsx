import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { StatCard } from '../../components/StatCard';
import { ReceiptModal } from '../../components/ReceiptModal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { CreditCard, CheckCircle2, Clock, Receipt, AlertCircle } from 'lucide-react';

export const AdminFees = () => {
  const { fees, recordFeePayment, students } = useData();
  const toast = useToast();

  const [selectedFeeForReceipt, setSelectedFeeForReceipt] = useState(null);
  const [feeToMarkPaid, setFeeToMarkPaid] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const totalCollected = fees
    .filter(f => f.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPending = fees
    .filter(f => f.status !== "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const filteredFees = useMemo(() => {
    if (statusFilter === "All") return fees;
    return fees.filter(f => f.status === statusFilter);
  }, [fees, statusFilter]);

  const handleConfirmPaid = () => {
    if (!feeToMarkPaid) return;
    recordFeePayment(feeToMarkPaid.id, { paymentMode: "Bank Transfer / Cash (Admin Verified)" });
    toast.success(
      `Marked fee of ₹${Number(feeToMarkPaid.amount).toLocaleString('en-IN')} as Paid for ${feeToMarkPaid.studentName}!`,
      "Payment Verified"
    );
    setFeeToMarkPaid(null);
  };

  const columns = [
    {
      key: "receiptNumber",
      label: "Invoice / Receipt #",
      render: (val) => <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">{val || "Pending"}</span>
    },
    {
      key: "studentName",
      label: "Student Name",
      render: (val, row) => (
        <div>
          <strong className="text-slate-900 dark:text-white block font-bold">{val}</strong>
          <span className="text-[11px] text-slate-400">{row.studentId}</span>
        </div>
      )
    },
    {
      key: "courseTitle",
      label: "Course",
      render: (val) => <span className="text-xs font-medium">{val}</span>
    },
    {
      key: "amount",
      label: "Amount (₹)",
      render: (val) => (
        <strong className="text-slate-900 dark:text-white font-mono">
          ₹{Number(val).toLocaleString('en-IN')}
        </strong>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (val) => <StatusBadge status={val} size="sm" />
    },
    {
      key: "dueDate",
      label: "Due / Paid Date",
      render: (val, row) => (
        <span className="text-xs font-mono text-slate-500">
          {row.status === "Paid" ? (row.paidDate || val) : val}
        </span>
      )
    },
    {
      key: "actions",
      label: "Receipt / Action",
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.status === "Paid" ? (
            <button
              type="button"
              onClick={() => setSelectedFeeForReceipt(row)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Receipt className="w-3.5 h-3.5 text-blue-500" /> Receipt
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setFeeToMarkPaid(row)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" /> Mark Paid
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tuition Fees & Financial Invoicing
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor tuition commitments, verify cleared transactions, and generate official student receipts.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Realized Revenue"
          value={`₹${totalCollected.toLocaleString('en-IN')}`}
          subtitle="Cleared through bank & online"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Outstanding Installments"
          value={`₹${totalPending.toLocaleString('en-IN')}`}
          subtitle="Pending student balances"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Total Invoiced Records"
          value={fees.length}
          subtitle="Installment milestones"
          icon={CreditCard}
          color="blue"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold w-fit">
        {["All", "Paid", "Pending", "Overdue"].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-2 rounded-xl transition-all ${
              statusFilter === st
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {st} ({st === "All" ? fees.length : fees.filter(f => f.status === st).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredFees}
        searchPlaceholder="Search by receipt no, student name, course..."
        itemsPerPage={8}
      />

      {/* Mark Paid Confirmation */}
      {feeToMarkPaid && (
        <ConfirmDialog
          isOpen={!!feeToMarkPaid}
          onClose={() => setFeeToMarkPaid(null)}
          onConfirm={handleConfirmPaid}
          title="Admin Payment Verification"
          message={`Verify and record payment of ₹${Number(feeToMarkPaid.amount).toLocaleString('en-IN')} for ${feeToMarkPaid.studentName}? A cleared receipt will be issued.`}
          confirmText="Verify & Issue Receipt"
          confirmVariant="primary"
        />
      )}

      {/* Receipt Modal */}
      {selectedFeeForReceipt && (
        <ReceiptModal
          isOpen={!!selectedFeeForReceipt}
          onClose={() => setSelectedFeeForReceipt(null)}
          feeRecord={selectedFeeForReceipt}
          student={students.find(s => s.id === selectedFeeForReceipt.studentId)}
        />
      )}
    </div>
  );
};
