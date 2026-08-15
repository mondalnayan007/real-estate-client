import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import {
  FiArrowLeft,
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiCheckSquare,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiGrid,
  FiHome,
  FiInfo,
  FiLayers,
  FiMapPin,
  FiTag,
  FiUser,
  FiXCircle,
  FiShield,
  FiRefreshCw,
  FiSend,
} from 'react-icons/fi';
import { HiOutlineBuildingOffice2, HiOutlineShieldCheck } from 'react-icons/hi2';
import { FaBuilding } from 'react-icons/fa6';
import { TbMoneybag } from 'react-icons/tb';

const API_BASE_URL = 'http://localhost:4000';

const money = (value = 0) =>
  `৳${Number(value || 0).toLocaleString('en-BD', {
    maximumFractionDigits: 0,
  })}`;

const getBookingId = (booking) => booking?._id || booking?.id;

const getTotalPrice = (booking) =>
  Number(booking?.landSharePrice ?? booking?.totalPrice ?? booking?.price ?? 0);

const getBookingMoney = (booking) => Number(booking?.bookingMoney ?? 0);

const getSharePrice = (booking) => {
  const total = getTotalPrice(booking);
  const bookingMoney = getBookingMoney(booking);
  return Math.max(total - bookingMoney, 0);
};

const getApprovedAmount = (transactions = []) =>
  Array.isArray(transactions)
    ? transactions
        .filter((txn) => String(txn?.status || '').toLowerCase() === 'approved')
        .reduce((sum, txn) => sum + Number(txn?.amount || 0), 0)
    : 0;

const getApprovedByType = (transactions = [], type) =>
  Array.isArray(transactions)
    ? transactions
        .filter(
          (txn) =>
            String(txn?.status || '').toLowerCase() === 'approved' &&
            String(txn?.paymentType || '').toLowerCase() === type
        )
        .reduce((sum, txn) => sum + Number(txn?.amount || 0), 0)
    : 0;

const getPaymentTypeLabel = (type) =>
  type === 'booking_money' ? 'Booking Money' : 'Share Installment';

const statusClass = (status) => {
  const value = String(status || 'pending').toLowerCase();

  if (value === 'approved') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }

  if (value === 'rejected') {
    return 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return 'bg-amber-50 text-amber-700 border-amber-200';
};

const projectStatusClass = (status) => {
  const value = String(status || '').toLowerCase();

  if (value.includes('complete')) {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }

  if (value.includes('upcoming')) {
    return 'bg-blue-50 text-blue-700 border-blue-200';
  }

  if (value.includes('sale')) {
    return 'bg-[#007b57]/10 text-[#007b57] border-[#007b57]/20';
  }

  return 'bg-amber-50 text-amber-700 border-amber-200';
};

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#007b57] focus:bg-white focus:ring-4 focus:ring-[#007b57]/10 disabled:cursor-not-allowed disabled:opacity-60';

const labelClass =
  'mb-1.5 block text-[10px] font-black uppercase tracking-wider text-slate-400';

// API Fetchers for TanStack Query
const fetchUserBookings = async (userId) => {
  if (!userId) return [];
  const res = await fetch(
    `${API_BASE_URL}/api/my-bookings?userId=${encodeURIComponent(userId)}`
  );
  if (!res.ok) throw new Error(`Bookings request failed: ${res.status}`);
  const data = await res.json();
  return data?.success && Array.isArray(data.bookings) ? data.bookings : [];
};

const fetchBookingTransactions = async (bookingId) => {
  if (!bookingId) return [];
  const res = await fetch(
    `${API_BASE_URL}/admin/transactions?bookingId=${encodeURIComponent(bookingId)}`
  );
  if (!res.ok) throw new Error(`Transactions request failed: ${res.status}`);
  const data = await res.json();
  if (data?.success && Array.isArray(data.transactions)) {
    return data.transactions;
  }
  return Array.isArray(data) ? data : [];
};

const submitPaymentApi = async (paymentPayload) => {
  const res = await fetch(`${API_BASE_URL}/api/submit-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentPayload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || 'Payment submission failed.');
  }
  return data;
};

export default function Dashboard() {
  const { clientUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [message, setMessage] = useState(null);

  // One payment form handles both payment categories.
  const [paymentType, setPaymentType] = useState('booking_money');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderAccountNumber, setSenderAccountNumber] = useState('');

  // 1. TanStack Query: Fetch Bookings
  const {
    data: bookings = [],
    isLoading: loadingBookings,
  } = useQuery({
    queryKey: ['myBookings', clientUser?._id],
    queryFn: () => fetchUserBookings(clientUser?._id),
    enabled: !!clientUser?._id,
    refetchInterval: 10000, // 10s auto refetch
  });

  // Derived active selected booking
  const selectedBooking = useMemo(() => {
    if (!bookings.length) return null;
    if (!selectedBookingId) return bookings[0];
    return (
      bookings.find((b) => getBookingId(b) === selectedBookingId) || bookings[0]
    );
  }, [bookings, selectedBookingId]);

  const activeBookingId = getBookingId(selectedBooking);

  // 2. TanStack Query: Fetch Transactions for selected booking
  const {
    data: transactions = [],
    isLoading: loadingTxns,
  } = useQuery({
    queryKey: ['transactions', activeBookingId],
    queryFn: () => fetchBookingTransactions(activeBookingId),
    enabled: !!activeBookingId,
    refetchInterval: 5000, // 5s auto refetch for fast updates
  });

  // 3. TanStack Mutation: Submit Payment
  const paymentMutation = useMutation({
    mutationFn: submitPaymentApi,
    onSuccess: () => {
      setMessage({
        type: 'success',
        text: `${getPaymentTypeLabel(
          paymentType
        )} payment submitted successfully. It is now awaiting verification.`,
      });
      resetPaymentForm();

      // Refresh cache automatically without full page refresh
      queryClient.invalidateQueries({ queryKey: ['transactions', activeBookingId] });
      queryClient.invalidateQueries({ queryKey: ['myBookings', clientUser?._id] });
    },
    onError: (error) => {
      console.error('Payment submission error:', error);
      setMessage({
        type: 'error',
        text:
          error?.message ||
          'Network error. Could not connect to the backend server.',
      });
    },
  });

  const submitting = paymentMutation.isPending;

  const summary = useMemo(() => {
    const totalPrice = getTotalPrice(selectedBooking);
    const bookingMoney = getBookingMoney(selectedBooking);
    const sharePrice = getSharePrice(selectedBooking);

    const paidTotal = getApprovedAmount(transactions);
    const paidBookingMoney = getApprovedByType(
      transactions,
      'booking_money'
    );
    const paidShare = getApprovedByType(transactions, 'share_price');

    // Backward compatibility: old transactions may not contain paymentType.
    const typedTransactionsExist = transactions.some((txn) => txn?.paymentType);

    const fallbackPaidBooking =
      typedTransactionsExist || !selectedBooking
        ? paidBookingMoney
        : Math.min(paidTotal, bookingMoney);

    const fallbackPaidShare =
      typedTransactionsExist || !selectedBooking
        ? paidShare
        : Math.max(paidTotal - fallbackPaidBooking, 0);

    return {
      totalPrice,
      bookingMoney,
      sharePrice,
      paidTotal,
      paidBookingMoney: fallbackPaidBooking,
      paidShare: fallbackPaidShare,
      bookingDue: Math.max(bookingMoney - fallbackPaidBooking, 0),
      shareDue: Math.max(sharePrice - fallbackPaidShare, 0),
      totalDue: Math.max(totalPrice - paidTotal, 0),
    };
  }, [selectedBooking, transactions]);

  const resetPaymentForm = () => {
    setAmount('');
    setBankName('');
    setTransactionId('');
    setSenderName('');
    setSenderAccountNumber('');
    setPaymentMethod('bank');
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    if (!selectedBooking || !clientUser?._id) return;

    const numericAmount = Number(amount);
    const bookingId = getBookingId(selectedBooking);

    const maxPayable =
      paymentType === 'booking_money'
        ? summary.bookingDue
        : summary.shareDue;

    if (!numericAmount || numericAmount <= 0) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid payment amount.',
      });
      return;
    }

    if (maxPayable > 0 && numericAmount > maxPayable) {
      setMessage({
        type: 'error',
        text: `Maximum payable amount for this installment is ${money(
          maxPayable
        )}.`,
      });
      return;
    }

    if (!transactionId.trim()) {
      setMessage({
        type: 'error',
        text: 'Transaction ID / UTR Number is required.',
      });
      return;
    }

    if (!senderName.trim()) {
      setMessage({
        type: 'error',
        text: 'Sender name is required.',
      });
      return;
    }

    if (paymentMethod === 'bank' && !senderAccountNumber.trim()) {
      setMessage({
        type: 'error',
        text: 'Sender account number is required for bank transfer.',
      });
      return;
    }

    if (paymentMethod === 'bank' && !bankName.trim()) {
      setMessage({
        type: 'error',
        text: 'Please select/enter the sending bank name.',
      });
      return;
    }

    setMessage(null);

    const paymentPayload = {
      bookingId,
      userId: clientUser._id,
      paymentType,
      paymentMethod,
      amount: numericAmount,
      bankName: paymentMethod === 'bank' ? bankName.trim() : 'N/A',
      transactionId: transactionId.trim(),
      utrNumber: transactionId.trim(),
      senderName: senderName.trim(),
      senderAccountNumber:
        paymentMethod === 'bank' ? senderAccountNumber.trim() : 'N/A',
    };

    // Execute mutation
    paymentMutation.mutate(paymentPayload);
  };

  if (loadingBookings) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#007b57]/15 border-t-[#007b57]" />
            <FaBuilding className="absolute inset-0 m-auto text-[#007b57]" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Loading dashboard
          </p>
        </div>
      </div>
    );
  }

  const selectedProject = selectedBooking?.projectDetails || {};
  const projectImage =
    selectedProject.img ||
    selectedProject.image ||
    selectedProject.images?.[0] ||
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa';

  return (
    <div className="min-h-screen bg-[#f5f7f9] text-slate-800">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-[#007b57]"
              >
                <FiArrowLeft size={15} />
                Back to Home
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#007b57] text-white shadow-lg shadow-[#007b57]/20">
                  <HiOutlineBuildingOffice2 size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#007b57]">
                    Client Portal
                  </p>
                  <h1 className="text-2xl font-black tracking-tight text-slate-950">
                    Investment Dashboard
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#007b57]/10 text-[#007b57]">
                <FiUser size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Welcome
                </p>
                <p className="text-sm font-extrabold text-slate-900">
                  {clientUser?.name ||
                    clientUser?.displayName ||
                    'Valued Client'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {!bookings.length ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">
            <HiOutlineBuildingOffice2 className="mx-auto mb-4 text-slate-300" size={44} />
            <h2 className="text-lg font-black text-slate-800">
              No bookings found
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Your booked projects will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[330px_minmax(0,1fr)]">
            {/* BOOKING SIDEBAR */}
            <aside className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Portfolio
                  </p>
                  <h2 className="text-lg font-black text-slate-950">
                    My Projects
                  </h2>
                </div>
                <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-black text-white">
                  {bookings.length}
                </span>
              </div>

              <div className="space-y-3">
                {bookings.map((booking) => {
                  const project = booking.projectDetails || {};
                  const image =
                    project.img ||
                    project.image ||
                    project.images?.[0] ||
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa';
                  const isSelected =
                    getBookingId(selectedBooking) === getBookingId(booking);

                  return (
                    <button
                      key={getBookingId(booking)}
                      type="button"
                      onClick={() => {
                        setSelectedBookingId(getBookingId(booking));
                        setMessage(null);
                      }}
                      className={`group w-full rounded-2xl border p-3 text-left transition ${
                        isSelected
                          ? 'border-[#007b57] bg-white shadow-lg shadow-[#007b57]/10 ring-1 ring-[#007b57]/10'
                          : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={image}
                          alt={project.title || booking.projectName || 'Project'}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-xs font-black text-slate-900">
                              {project.title ||
                                booking.projectName ||
                                'Booked Project'}
                            </p>
                            <FiChevronRight
                              className={`shrink-0 ${
                                isSelected
                                  ? 'text-[#007b57]'
                                  : 'text-slate-300'
                              }`}
                            />
                          </div>

                          <p className="mt-1 text-[10px] font-semibold text-slate-400">
                            {booking.status || 'Pending'}
                          </p>

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-700">
                              {money(getTotalPrice(booking))}
                            </span>
                            <span
                              className={`rounded-md border px-1.5 py-0.5 text-[8px] font-black uppercase ${statusClass(
                                booking.status
                              )}`}
                            >
                              {booking.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <section className="min-w-0 space-y-6">
              {/* HERO */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-[280px] sm:h-[340px]">
                  <img
                    src={projectImage}
                    alt={selectedProject.title || 'Project'}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-wider backdrop-blur-md ${projectStatusClass(
                        selectedProject.status ||
                          selectedProject.projectStatus
                      )}`}
                    >
                      {selectedProject.status ||
                        selectedProject.projectStatus ||
                        'Under Construction'}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                      ID #{getBookingId(selectedBooking)?.slice?.(-8)}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="mb-1 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-200">
                      Active Investment
                    </p>
                    <h2 className="text-2xl font-black sm:text-3xl">
                      {selectedProject.title ||
                        selectedBooking.projectName ||
                        'Booked Project'}
                    </h2>
                    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-200">
                      <FiMapPin className="text-rose-300" size={14} />
                      {selectedBooking.projectAddress ||
                        selectedProject.location ||
                        'Location not specified'}
                    </p>
                  </div>
                </div>

                {/* FINANCIAL KPI BAR */}
                <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
                  {[
                    {
                      label: 'Total Price',
                      value: summary.totalPrice,
                      icon: FiTag,
                      cls: 'text-slate-900',
                    },
                    {
                      label: 'Booking Money',
                      value: summary.bookingMoney,
                      icon: FiCheckSquare,
                      cls: 'text-[#007b57]',
                    },
                    {
                      label: 'Share Paid',
                      value: summary.paidShare,
                      icon: TbMoneybag,
                      cls: 'text-blue-600',
                    },
                    {
                      label: 'Total Due',
                      value: summary.totalDue,
                      icon: FiClock,
                      cls: summary.totalDue > 0 ? 'text-rose-600' : 'text-emerald-600',
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="p-5">
                        <div className="flex items-center gap-2">
                          <Icon className={item.cls} size={15} />
                          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                            {item.label}
                          </p>
                        </div>
                        <p className={`mt-1 text-lg font-black ${item.cls}`}>
                          {money(item.value)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PAYMENT BREAKDOWN */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-wider text-emerald-700">
                        Booking Money
                      </p>
                      <p className="mt-1 text-xl font-black text-emerald-900">
                        {money(summary.paidBookingMoney)}
                        <span className="text-xs font-bold text-emerald-600">
                          {' '}
                          / {money(summary.bookingMoney)}
                        </span>
                      </p>
                    </div>
                    <FiCheckSquare className="text-emerald-600" size={24} />
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{
                        width: `${
                          summary.bookingMoney
                            ? Math.min(
                                (summary.paidBookingMoney /
                                  summary.bookingMoney) *
                                  100,
                                100
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] font-bold text-emerald-700">
                    Due: {money(summary.bookingDue)}
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-wider text-blue-700">
                        Share / Installment
                      </p>
                      <p className="mt-1 text-xl font-black text-blue-900">
                        {money(summary.paidShare)}
                        <span className="text-xs font-bold text-blue-600">
                          {' '}
                          / {money(summary.sharePrice)}
                        </span>
                      </p>
                    </div>
                    <TbMoneybag className="text-blue-600" size={26} />
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-100">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{
                        width: `${
                          summary.sharePrice
                            ? Math.min(
                                (summary.paidShare / summary.sharePrice) * 100,
                                100
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] font-bold text-blue-700">
                    Due: {money(summary.shareDue)}
                  </p>
                </div>
              </div>

              {/* PROJECT DETAILS */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
                  <FiInfo className="text-[#007b57]" size={17} />
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Project Information
                  </h3>
                </div>

                {selectedProject.images?.length > 1 && (
                  <div className="mb-5 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {selectedProject.images.slice(0, 5).map((img, index) => (
                      <img
                        key={`${img}-${index}`}
                        src={img}
                        alt={`Project ${index + 1}`}
                        className="h-20 w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ['Building Type', selectedProject.buildingType || 'Residential', FiLayers],
                    ['Apartment Type', selectedBooking.apartmentType || 'N/A', FiHome],
                    ['Total Floors', selectedProject.totalFloors || selectedProject.floors || 'N/A', FiGrid],
                    ['Handover', selectedProject.handoverDate || 'N/A', FiCalendar],
                    ['Land Share', money(selectedBooking.landSharePrice), FiTag],
                    ['Booking Money', money(selectedBooking.bookingMoney), FiCheckSquare],
                    ['Facing', selectedProject.facing || 'N/A', FiInfo],
                    ['Size / Share', selectedProject.flatSize || 'N/A', FiGrid],
                  ].map(([label, value, Icon]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                    >
                      <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-slate-400">
                        <Icon className="text-[#007b57]" size={11} />
                        {label}
                      </div>
                      <p className="mt-1 text-xs font-black text-slate-800">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {selectedProject.description && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    <p className="mb-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Description
                    </p>
                    <p className="text-xs leading-6 text-slate-600">
                      {selectedProject.description}
                    </p>
                  </div>
                )}
              </div>

              {/* PERSONAL INFORMATION */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <InfoCard
                  title="Applicant Information"
                  icon={<FiUser size={16} />}
                  rows={[
                    ['Name', selectedBooking.applicantName],
                    ['Father / Husband', selectedBooking.fatherHusbandName],
                    ['Mother', selectedBooking.motherName],
                    ['Contact', selectedBooking.contactNo],
                    ['Alternative Contact', selectedBooking.altContactNo],
                    ['Email', selectedBooking.email],
                    ['Date of Birth', selectedBooking.dateOfBirth],
                    ['Profession', selectedBooking.profession],
                    ['National ID', selectedBooking.nationalId],
                    ['Passport', selectedBooking.passportNo || 'N/A'],
                  ]}
                />

                <InfoCard
                  title="Nominee Information"
                  icon={<HiOutlineShieldCheck size={18} />}
                  rows={[
                    ['Name', selectedBooking.nomineeName],
                    ['Relation', selectedBooking.nomineeRelation],
                    ['Mobile', selectedBooking.nomineeMobileNo],
                    ['National ID', selectedBooking.nomineeNationalId],
                    ['Address', selectedBooking.nomineeAddress],
                  ]}
                />
              </div>

              {/* PAYMENT SUBMISSION */}
              {(summary.bookingDue > 0 || summary.shareDue > 0) && (
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 bg-slate-950 px-5 py-5 text-white sm:px-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-300">
                          Secure Payment Submission
                        </p>
                        <h3 className="mt-1 text-lg font-black">
                          Submit an Installment
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          You can pay Booking Money or Share Money in multiple installments.
                        </p>
                      </div>
                      <div className="rounded-xl bg-white/10 px-3 py-2 text-right">
                        <p className="text-[9px] font-bold uppercase text-slate-400">
                          Total Outstanding
                        </p>
                        <p className="text-sm font-black text-white">
                          {money(summary.totalDue)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    {message && (
                      <div
                        className={`mb-5 flex items-start gap-3 rounded-xl border p-4 text-xs font-bold ${
                          message.type === 'success'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                            : 'border-rose-200 bg-rose-50 text-rose-800'
                        }`}
                      >
                        {message.type === 'success' ? (
                          <FiCheckCircle size={17} className="mt-0.5 shrink-0" />
                        ) : (
                          <FiAlertCircle size={17} className="mt-0.5 shrink-0" />
                        )}
                        <span>{message.text}</span>
                      </div>
                    )}

                    {/* Payment type selector */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <PaymentTypeCard
                        active={paymentType === 'booking_money'}
                        disabled={summary.bookingDue <= 0}
                        title="Booking Money"
                        subtitle={`Remaining ${money(summary.bookingDue)}`}
                        icon={<FiCheckSquare size={19} />}
                        onClick={() => {
                          setPaymentType('booking_money');
                          setAmount('');
                          setMessage(null);
                        }}
                      />

                      <PaymentTypeCard
                        active={paymentType === 'share_price'}
                        disabled={summary.shareDue <= 0}
                        title="Share Money / Installment"
                        subtitle={`Remaining ${money(summary.shareDue)}`}
                        icon={<TbMoneybag size={21} />}
                        onClick={() => {
                          setPaymentType('share_price');
                          setAmount('');
                          setMessage(null);
                        }}
                      />
                    </div>

                    <form
                      onSubmit={handlePaymentSubmit}
                      className="mt-6 space-y-5"
                    >
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className={labelClass}>
                            Payment Amount (BDT)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max={
                              paymentType === 'booking_money'
                                ? summary.bookingDue
                                : summary.shareDue
                            }
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={
                              paymentType === 'booking_money'
                                ? `Up to ${money(summary.bookingDue)}`
                                : `Up to ${money(summary.shareDue)}`
                            }
                            className={inputClass}
                            disabled={submitting}
                          />
                          <p className="mt-1.5 text-[10px] font-semibold text-slate-400">
                            You may submit this amount as a partial installment.
                          </p>
                        </div>

                        <div>
                          <label className={labelClass}>
                            Payment Method
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              ['bank', 'Bank Transfer', FaBuilding],
                              ['cash', 'Cash Deposit', TbMoneybag],
                            ].map(([value, label, Icon]) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => setPaymentMethod(value)}
                                disabled={submitting}
                                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-black transition ${
                                  paymentMethod === value
                                    ? 'border-[#007b57] bg-[#007b57] text-white shadow-md shadow-[#007b57]/20'
                                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                                }`}
                              >
                                <Icon size={15} />
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {paymentMethod === 'bank' && (
                        <div>
                          <label className={labelClass}>Bank Name</label>
                          <input
                            type="text"
                            required
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            placeholder="e.g. Dutch-Bangla Bank, City Bank"
                            className={inputClass}
                            disabled={submitting}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className={labelClass}>
                            Transaction ID / UTR Number
                          </label>
                          <input
                            type="text"
                            required
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter transaction ID / UTR"
                            className={`${inputClass} font-mono`}
                            disabled={submitting}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>Sender Name</label>
                          <input
                            type="text"
                            required
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            placeholder="Name used to send the payment"
                            className={inputClass}
                            disabled={submitting}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>
                          Sender's Account Number
                        </label>
                        <input
                          type="text"
                          required={paymentMethod === 'bank'}
                          value={senderAccountNumber}
                          onChange={(e) =>
                            setSenderAccountNumber(e.target.value)
                          }
                          placeholder={
                            paymentMethod === 'bank'
                              ? 'Enter sender account number'
                              : 'N/A for cash deposit'
                          }
                          className={`${inputClass} font-mono`}
                          disabled={submitting}
                        />
                      </div>

                      <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                        <div className="flex items-start gap-3">
                          <FiShield className="mt-0.5 shrink-0 text-blue-600" size={17} />
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-blue-800">
                              Submission summary
                            </p>
                            <p className="mt-1 text-xs leading-5 text-blue-700">
                              {getPaymentTypeLabel(paymentType)} ·{' '}
                              {money(amount || 0)} · {paymentMethod}
                              {bankName ? ` · ${bankName}` : ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#007b57] px-5 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-[#007b57]/20 transition hover:bg-[#006346] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <FiRefreshCw className="animate-spin" size={15} />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <FiSend size={15} />
                            Submit {getPaymentTypeLabel(paymentType)}
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* PAYMENT HISTORY */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-[#007b57]" size={17} />
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Payment History
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black text-slate-500">
                    {transactions.length} Records
                  </span>
                </div>

                {loadingTxns ? (
                  <div className="flex items-center justify-center gap-2 py-10 text-xs font-bold text-slate-400">
                    <FiRefreshCw className="animate-spin" />
                    Loading payment history...
                  </div>
                ) : !transactions.length ? (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-10 text-center text-xs font-semibold text-slate-400">
                    No payment submissions recorded for this booking yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-[9px] font-black uppercase tracking-wider text-slate-400">
                          <th className="px-3 py-3">Date</th>
                          <th className="px-3 py-3">Payment Type</th>
                          <th className="px-3 py-3">Method / Bank</th>
                          <th className="px-3 py-3">Transaction / UTR</th>
                          <th className="px-3 py-3">Sender</th>
                          <th className="px-3 py-3">Amount</th>
                          <th className="px-3 py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {transactions.map((txn) => {
                          const txnType =
                            txn.paymentType ||
                            txn.type ||
                            (txn.paymentCategory === 'booking'
                              ? 'booking_money'
                              : 'share_price');

                          const txnStatus = String(
                            txn.status || 'pending'
                          ).toLowerCase();

                          return (
                            <tr
                              key={txn._id || txn.transactionId}
                              className="transition hover:bg-slate-50/70"
                            >
                              <td className="whitespace-nowrap px-3 py-3.5 text-slate-500">
                                {txn.createdAt
                                  ? new Date(txn.createdAt).toLocaleDateString(
                                      'en-GB'
                                    )
                                  : 'N/A'}
                              </td>

                              <td className="px-3 py-3.5">
                                <span className="font-black text-slate-800">
                                  {getPaymentTypeLabel(txnType)}
                                </span>
                              </td>

                              <td className="px-3 py-3.5">
                                <span className="block font-bold capitalize text-slate-800">
                                  {txn.paymentMethod || 'N/A'}
                                </span>
                                {txn.bankName && txn.bankName !== 'N/A' && (
                                  <span className="block text-[10px] text-slate-400">
                                    {txn.bankName}
                                  </span>
                                )}
                              </td>

                              <td className="px-3 py-3.5 font-mono font-bold text-slate-700">
                                {txn.transactionId || txn.utrNumber || 'N/A'}
                              </td>

                              <td className="px-3 py-3.5">
                                <span className="block font-bold text-slate-800">
                                  {txn.senderName || 'N/A'}
                                </span>
                                {txn.senderAccountNumber &&
                                  txn.senderAccountNumber !== 'N/A' && (
                                    <span className="block font-mono text-[10px] text-slate-400">
                                      {txn.senderAccountNumber}
                                    </span>
                                  )}
                              </td>

                              <td className="px-3 py-3.5 font-black text-slate-900">
                                {money(txn.amount)}
                              </td>

                              <td className="px-3 py-3.5 text-right">
                                <span
                                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-black capitalize ${statusClass(
                                    txnStatus
                                  )}`}
                                >
                                  {txnStatus === 'approved' && (
                                    <FiCheckCircle size={11} />
                                  )}
                                  {txnStatus === 'pending' && (
                                    <FiClock size={11} />
                                  )}
                                  {txnStatus === 'rejected' && (
                                    <FiXCircle size={11} />
                                  )}
                                  {txnStatus}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function PaymentTypeCard({
  active,
  disabled,
  title,
  subtitle,
  icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
        disabled
          ? 'cursor-not-allowed border-slate-100 bg-slate-50 opacity-45'
          : active
          ? 'border-[#007b57] bg-[#007b57]/5 ring-2 ring-[#007b57]/10'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            active
              ? 'bg-[#007b57] text-white'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs font-black text-slate-900">{title}</p>
          <p className="mt-0.5 text-[10px] font-semibold text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      {active && !disabled && (
        <FiCheckCircle className="text-[#007b57]" size={18} />
      )}
    </button>
  );
}

function InfoCard({ title, icon, rows }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4 text-[#007b57]">
        {icon}
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-start justify-between gap-4 text-xs"
          >
            <span className="shrink-0 font-semibold text-slate-400">
              {label}
            </span>
            <span className="max-w-[65%] break-words text-right font-bold text-slate-800">
              {value || 'N/A'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}