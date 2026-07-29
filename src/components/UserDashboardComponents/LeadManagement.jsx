import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Building2, 
  User, 
  Calendar, 
  Clock, 
  Loader2,
  RefreshCw,
  CreditCard,
  ShieldCheck,
  AlertCircle
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

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  // ==========================================
  // ২. স্ট্যাটাস আপডেট (কার্ড সরানো হবে না, শুধু স্ট্যাটাস চেঞ্জ হবে)
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
        // 🔥 কার্ড রিমুভ না করে স্টেট আপডেট করে স্ট্যাটাস চেঞ্জ করা হলো
        setPendingPayments((prev) => 
          prev.map((item) => 
            item._id === txnId ? { ...item, status: status } : item
          )
        );
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

  // স্ট্যাটাসের ওপর ভিত্তি করে ব্যাজ কালার
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs">
            <CheckCircle2 size={13} className="text-emerald-600" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200/80 shadow-xs">
            <XCircle size={13} className="text-rose-600" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200/80 shadow-xs animate-pulse">
            <Clock size={13} className="text-amber-600" /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 bg-slate-50/50 min-h-screen text-slate-800 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#007b57]/10 rounded-xl text-[#007b57]">
              <ShieldCheck size={22} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Payment Verification Center</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Review buyer booking deposits, verify bank references, and manage approvals
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchPendingPayments}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-all duration-200 active:scale-95 shadow-xs"
            title="Refresh List"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          
          <div className="flex items-center gap-2.5 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xs">
            <Clock className="w-4 h-4 text-[#007b57]" />
            <span className="text-xs font-semibold">
              Total Requests: <span className="text-white font-black text-sm ml-1">{pendingPayments.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Stream Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <span>Transaction Logs</span>
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center flex flex-col items-center justify-center gap-3 shadow-xs">
            <Loader2 size={36} className="animate-spin text-[#007b57]" />
            <p className="text-xs font-bold text-slate-500">Fetching transactions details...</p>
          </div>
        ) : errorMsg ? (
          /* Error State */
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-3xl p-6 text-center text-xs font-bold shadow-xs flex items-center justify-center gap-2">
            <AlertCircle size={16} />
            {errorMsg}
          </div>
        ) : pendingPayments.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-16 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-50 text-[#007b57] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-base font-black text-slate-800">All Requests Cleared!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no payment requests pending in the database right now.
            </p>
          </div>
        ) : (
          /* Transaction Cards Stream */
          pendingPayments.map((item) => {
            const isProcessing = processingId === item._id;
            const isPending = !item.status || item.status === 'pending';

            return (
              <div 
                key={item._id} 
                className="group bg-white border border-slate-200/80 hover:border-[#007b57]/30 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 space-y-5 relative overflow-hidden"
              >
                {/* Visual Accent Top Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                  item.status === 'approved' ? 'bg-emerald-500' : 
                  item.status === 'rejected' ? 'bg-rose-500' : 'bg-amber-400'
                }`} />

                {/* Card Header: Buyer Info & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100/80">
                  {/* Buyer Profile */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-slate-900 group-hover:text-[#007b57] transition-colors">
                          {item.user?.name || 'Unknown Buyer'}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                        <span>{item.user?.email || 'N/A'}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-slate-600">{item.user?.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge & Property Tag */}
                  <div className="flex flex-wrap items-center gap-3">
                    {getStatusBadge(item.status)}

                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3.5 py-1.5 rounded-2xl">
                      <Building2 size={15} className="text-[#007b57]" />
                      <div className="text-left">
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Property</p>
                        <p className="text-xs font-bold text-slate-800 truncate max-w-[150px]">
                          {item.booking?.projectName || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body: Financial Overview Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Claimed Amount Box */}
                  <div className="bg-emerald-50/50 border border-emerald-200/60 p-4 rounded-2xl relative overflow-hidden">
                    <p className="text-[10px] font-black uppercase text-[#007b57] tracking-wider">Submitted Amount</p>
                    <p className="text-2xl font-black text-[#007b57] mt-1">
                      ৳{item.amount?.toLocaleString() || 0}
                    </p>
                  </div>

                  {/* Booking Total Financials */}
                  <div className="bg-slate-50/80 border border-slate-200/60 p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Booking Value</p>
                    <p className="text-sm font-bold text-slate-800 mt-2">
                      ৳{item.booking?.totalPaid?.toLocaleString() || 0} 
                      <span className="text-xs text-slate-400 font-normal"> / ৳{item.booking?.totalAmount?.toLocaleString() || 0}</span>
                    </p>
                  </div>

                  {/* Gateway Details */}
                  <div className="bg-slate-50/80 border border-slate-200/60 p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Payment Method</p>
                      <CreditCard size={14} className="text-slate-400" />
                    </div>
                    <p className="text-xs font-extrabold text-slate-800 mt-1 uppercase">
                      {item.paymentMethod} {item.bankName && item.bankName !== 'N/A' ? `(${item.bankName})` : ''}
                    </p>
                    <p className="text-[11px] font-mono font-medium text-slate-500 mt-0.5 truncate">
                      Txn: <span className="text-slate-700 select-all">{item.transactionId}</span>
                    </p>
                  </div>
                </div>

                {/* Card Footer: Timestamp & Action Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Calendar size={14} />
                    <span>
                      Submitted on {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                    </span>
                  </div>

                  {/* Actions (Only editable or re-editable as needed) */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleStatusUpdate(item._id, 'rejected')}
                      disabled={isProcessing || item.status === 'rejected'}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                        item.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/60'
                      }`}
                    >
                      <XCircle size={15} />
                      {item.status === 'rejected' ? 'Rejected' : 'Reject'}
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(item._id, 'approved')}
                      disabled={isProcessing || item.status === 'approved'}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                        item.status === 'approved'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-white bg-[#007b57] hover:bg-[#006346] shadow-sm hover:shadow-md'
                      }`}
                    >
                      {isProcessing ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 size={15} />
                          {item.status === 'approved' ? 'Approved' : 'Approve Payment'}
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