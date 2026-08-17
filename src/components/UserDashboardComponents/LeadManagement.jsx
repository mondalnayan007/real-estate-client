import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  AlertCircle,
  Tag,
  Send
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:4000';

const fetchPendingPayments = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin/pending-payments`);
  if (!response.ok) throw new Error('Could not connect to the backend server.');
  const data = await response.json();

  if (!data.success) throw new Error(data.message || 'Failed to load pending payments.');
  return data.data || [];
};


const updatePaymentStatus = async ({ txnId, status }) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/update-payment-status/${txnId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Operation failed.');
  return { txnId, status, data };
};

export default function LeadManagement() {
  const queryClient = useQueryClient();

  const { data: pendingPayments = [], isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: ['adminPendingPayments'],
    queryFn: fetchPendingPayments,
    refetchInterval: 10000,
  });

  const statusMutation = useMutation({
    mutationFn: updatePaymentStatus,
    onSuccess: ({ txnId, status }) => {
      queryClient.setQueryData(['adminPendingPayments'], (oldData) => {
        if (!Array.isArray(oldData)) return [];
        return oldData.map((item) => item._id === txnId ? { ...item, status } : item);
      });
      queryClient.invalidateQueries({ queryKey: ['adminPendingPayments'] });
    },
    onError: (err) => alert(err.message || 'Network error updating status.'),
  });

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={13} /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle size={13} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
            <Clock size={13} /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#007b57]/10 text-[#007b57] rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Payment Verification Center</h1>
              <p className="text-xs text-slate-500 mt-0.5">Verify and manage buyer transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => refetch()}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all"
            >
              <RefreshCw size={16} className={isLoading || isRefetching ? 'animate-spin' : ''} />
            </button>
            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold">
              Pending Requests: <span className="text-[#007b57] font-bold text-sm ml-1">{pendingPayments.length}</span>
            </div>
          </div>
        </div>

        {/* List Stream */}
        {isLoading ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Loader2 size={32} className="animate-spin mx-auto text-[#007b57]" />
            <p className="text-xs text-slate-500 mt-2 font-medium">Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-xs font-bold border border-rose-200 text-center">
            {error.message}
          </div>
        ) : pendingPayments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <CheckCircle2 size={36} className="mx-auto text-emerald-500 mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No Pending Payments</h3>
            <p className="text-xs text-slate-400 mt-0.5">Everything is up to date.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingPayments.map((item) => {
              const isProcessing = statusMutation.isPending && statusMutation.variables?.txnId === item._id;
              const isBookingMoney = item.paymentType === 'booking_money';
             

              return (
                <div 
                  key={item._id} 
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl shadow-sm transition-all overflow-hidden"
                >
                  {/* Top Header: Buyer & Property Info */}
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Buyer Identity */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-sm">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">{item.user?.name || item.senderName || 'Unknown Buyer'}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            isBookingMoney ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {isBookingMoney ? 'Booking Money' : 'Share / Installment'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.user?.email} • {item.user?.phone || 'No Phone'}
                        </p>
                      </div>
                    </div>

                    {/* Property & Status */}
                    <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                        <Building2 size={14} className="text-[#007b57]" />
                        <span className="font-semibold">{item.booking?.projectName || 'N/A'}</span>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>

                  {/* Body: Clean Data Grid */}
                  <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white text-xs">
                    
                    {/* Depositor / Sender Name */}
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">Depositor Name</span>
                      <span className="font-bold text-slate-800 mt-1 block truncate">
                        {item.senderName || item.user?.name || 'N/A'}
                      </span>
                    </div>

                    {/* Paid Amount */}
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">Submitted Amount</span>
                      <span className="font-extrabold text-[#007b57] text-base mt-0.5 block">
                        ৳{item.amount?.toLocaleString() || 0}
                      </span>
                    </div>

                    {/* Payment Method & Bank */}
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">Payment Gateway</span>
                      <span className="font-bold text-slate-800 mt-1 uppercase block">
                        {item.paymentMethod} {item.bankName && item.bankName !== 'N/A' ? `(${item.bankName})` : ''}
                      </span>
                    </div>

                    {/* Transaction Reference ID */}
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">Transaction ID</span>
                      <span className="font-mono font-bold text-slate-700 mt-1 block select-all truncate">
                        {item.transactionId || 'N/A'}
                      </span>
                    </div>

                  </div>

                  {/* Footer: Date & Actions */}
                  <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar size={13} />
                      <span>Date: {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB') : 'N/A'}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => statusMutation.mutate({ txnId: item._id, status: 'rejected' })}
                        disabled={isProcessing || item.status === 'rejected'}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl font-bold border border-rose-200 text-rose-600 hover:bg-rose-50 transition-all disabled:opacity-40"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => statusMutation.mutate({ txnId: item._id, status: 'approved' })}
                        disabled={isProcessing || item.status === 'approved'}
                        className="flex-1 sm:flex-none px-5 py-2 rounded-xl font-bold bg-[#007b57] hover:bg-[#006346] text-white transition-all disabled:opacity-40 flex items-center justify-center gap-1.5"
                      >
                        {isProcessing ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                        Approve Payment
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}