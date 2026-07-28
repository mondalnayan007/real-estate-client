import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Building2, 
  User, 
  Calendar, 
  Clock, 
  Loader2,
  RefreshCw
} from 'lucide-react';

export default function LeadManagement() {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // ==========================================
  // ১. ডাইরেক্ট ব্যাকএন্ড থেকে ডাটা ফেচ করা
  // ==========================================
  const fetchPendingPayments = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('http://localhost:4000/api/admin/pending-payments');
      const data = await response.json();

      if (data.success) {
        setPendingPayments(data.data);
      } else {
        setErrorMsg('Failed to load pending payments.');
      }
    } catch (error) {
      console.error('API Error:', error);
      setErrorMsg('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  // পেজ লোড হওয়ার সাথে সাথে API কল হবে
  useEffect(() => {
    fetchPendingPayments();
  }, []);

  // ==========================================
  // ২. ডাইরেক্ট স্ট্যাটাস আপডেট (Approve / Reject)
  // ==========================================
  const handleStatusUpdate = async (txnId, status) => {
    setProcessingId(txnId);
    try {
      const response = await fetch(`http://localhost:4000/api/admin/update-payment-status/${txnId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.success) {
        // এপ্রুভ বা রিজেক্ট হওয়ার সাথে সাথে ইউজার লিস্ট থেকে সাথে সাথে সরাতে বা রিফ্রেশ করতে
        setPendingPayments((prev) => prev.filter((item) => item._id !== txnId));
      } else {
        alert(data.message || 'Operation failed.');
      }
    } catch (error) {
      console.error('Update Error:', error);
      alert('Network error while updating status.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-slate-50/60 min-h-screen text-slate-800 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#007b57] animate-pulse"></span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Payment Verification Box</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Review buyer booking requests and approve payment details
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchPendingPayments}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition active:scale-95"
            title="Refresh List"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200/60">
            <Clock className="w-4 h-4 text-[#007b57]" />
            <span className="text-xs font-bold text-slate-700">
              Pending: <span className="text-[#007b57] font-black text-sm">{pendingPayments.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Stream Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Incoming Approval Requests
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 shadow-sm">
            <Loader2 size={32} className="animate-spin text-[#007b57]" />
            <p className="text-xs font-bold text-slate-500">Fetching payment verification requests...</p>
          </div>
        ) : errorMsg ? (
          /* Error State */
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-6 text-center text-xs font-bold">
            {errorMsg}
          </div>
        ) : pendingPayments.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-50 text-[#007b57] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-800">All caught up!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no pending payment verification requests right now.
            </p>
          </div>
        ) : (
          /* Transaction Cards Stream */
          pendingPayments.map((item) => {
            const isProcessing = processingId === item._id;

            return (
              <div 
                key={item._id} 
                className="group bg-white border border-slate-200/80 hover:border-[#007b57]/40 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 space-y-5"
              >
                {/* Card Top: Buyer & Property Info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  {/* Buyer Details */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#007b57]/10 text-[#007b57] rounded-xl flex items-center justify-center font-bold shrink-0">
                      <User size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#007b57] transition-colors">
                        {item.user?.name || 'Unknown Buyer'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                        <span>{item.user?.email || 'N/A'}</span>
                        <span>•</span>
                        <span>{item.user?.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booked Property */}
                  <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/60 px-3.5 py-2 rounded-xl self-start lg:self-auto">
                    <Building2 size={16} className="text-[#007b57]" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Booked Property</p>
                      <p className="text-xs font-bold text-slate-800">
                        {item.booking?.projectName || 'Property Info Unavailable'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Middle: Financials & Gateway Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Claimed Amount */}
                  <div className="bg-[#007b57]/5 border border-[#007b57]/15 p-3.5 rounded-xl">
                    <p className="text-[10px] font-bold uppercase text-[#007b57]">Approval Request</p>
                    <p className="text-xl font-black text-[#007b57] mt-0.5">
                      ৳{item.amount?.toLocaleString() || 0}
                    </p>
                  </div>

                  {/* Total Booking Financials */}
                  <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Total Price / Paid</p>
                    <p className="text-sm font-bold text-slate-700 mt-1">
                      ৳{item.booking?.totalPaid?.toLocaleString() || 0} <span className="text-xs text-slate-400 font-normal">/ ৳{item.booking?.totalAmount?.toLocaleString() || 0}</span>
                    </p>
                  </div>

                  {/* Gateway Details */}
                  <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Payment Details</p>
                    <p className="text-xs font-bold text-slate-800 mt-1 uppercase">
                      {item.paymentMethod} {item.bankName && item.bankName !== 'N/A' ? `(${item.bankName})` : ''}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">
                      TxnID: {item.transactionId}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Metadata & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Calendar size={13} />
                    <span>
                      Submitted on {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusUpdate(item._id, 'rejected')}
                      disabled={isProcessing}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 transition-all duration-200 active:scale-95 disabled:opacity-50"
                    >
                      <XCircle size={15} />
                      Reject
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(item._id, 'approved')}
                      disabled={isProcessing}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#007b57] hover:bg-[#006346] shadow-md shadow-[#007b57]/20 hover:shadow-lg hover:shadow-[#007b57]/30 transition-all duration-200 active:scale-95 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 size={15} />
                          Approve Payment
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}