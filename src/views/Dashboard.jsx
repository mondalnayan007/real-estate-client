import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// React Icons
import { 
  FiCreditCard, 
  FiCheckCircle, 
  FiClock, 
  FiXCircle, 
  FiChevronRight, 
  FiAlertCircle, 
  FiUser, 
  FiMapPin, 
  FiHome,
  FiArrowLeft,
  FiInfo,
  FiCalendar,
  FiGrid,
  FiLayers,
  FiTag,
  FiCheckSquare
} from 'react-icons/fi';

import { 
  HiOutlineBuildingOffice2, 
  HiOutlineShieldCheck,
  HiOutlineSparkles 
} from 'react-icons/hi2';

import { FaBuilding } from 'react-icons/fa6';
import { TbMoneybag } from 'react-icons/tb';

export default function Dashboard() {
  const { clientUser } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Payment Form States
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // 1. Fetch User Bookings
  useEffect(() => {
    if (clientUser?._id) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [clientUser]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/api/my-bookings?userId=${clientUser._id}`);
      const data = await res.json();
      
      if (data.success && Array.isArray(data.bookings)) {
        const fetchedBookings = data.bookings;
        setBookings(fetchedBookings);

        if (fetchedBookings.length > 0) {
          setSelectedBooking((prevSelected) => {
            if (prevSelected) {
              const matched = fetchedBookings.find(b => b._id === prevSelected._id);
              return matched || fetchedBookings[0];
            }
            return fetchedBookings[0];
          });
        } else {
          setSelectedBooking(null);
        }
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Payment Submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBooking) return;

    setSubmitting(true);
    setMessage(null);

    const paymentPayload = {
      bookingId: selectedBooking._id,
      userId:clientUser._id,
      paymentMethod,
      
      amount: Number(amount),
      bankName: paymentMethod === 'bank' ? bankName : 'N/A',
      transactionId
    };

    try {
      const res = await fetch('http://localhost:4000/api/submit-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentPayload)
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Payment details submitted successfully! Awaiting Admin verification.' });
        setAmount('');
        setTransactionId('');
        setBankName('');
        await fetchBookings();
      } else {
        setMessage({ type: 'error', text: data.message || 'Payment submission failed.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error. Could not connect to backend server.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to calculate approved paid amount
  const calculatePaidAmount = (transactions = []) => {
    if (!Array.isArray(transactions)) return 0;
    return transactions
      .filter(t => t.status === 'approved')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  };

  // Helper function for Project Status Badge Styling
  const getStatusBadge = (status) => {
    const s = (status || 'Under Construction').toLowerCase();
    if (s.includes('complete')) {
      return 'bg-emerald-500/10 text-emerald-700 border-emerald-300';
    } else if (s.includes('under') || s.includes('construction')) {
      return 'bg-amber-500/10 text-amber-700 border-amber-300';
    } else if (s.includes('upcoming')) {
      return 'bg-blue-500/10 text-blue-700 border-blue-300';
    } else if (s.includes('sale')) {
      return 'bg-[#007b57]/10 text-[#007b57] border-[#007b57]/30';
    }
    return 'bg-slate-100 text-slate-800 border-slate-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 pt-12 flex justify-center items-center">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#007b57]/20 border-t-[#007b57]"></div>
          <FaBuilding size={22} className="absolute text-[#007b57] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/30 text-slate-800 pt-10 pb-20 px-4 sm:px-6 lg:px-8 font-['Inter',sans-serif]">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Header Area */}
        <div className="mb-8 border-b border-slate-200/80 pb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#007b57] hover:text-white text-slate-700 text-xs font-bold transition-all duration-300 mb-4 border border-slate-200/80 shadow-sm hover:shadow-md active:scale-95 group"
          >
            <FiArrowLeft size={16} className="text-[#007b57] group-hover:text-white transition-colors duration-300" />
            <span>Back to Previous</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#007b57]/10 border border-[#007b57]/20 text-[#007b57] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                  <HiOutlineSparkles size={14} className="text-[#007b57]" /> Premium Client Portal
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Dashboard Overview
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Welcome back, <span className="text-[#007b57] font-bold">{clientUser?.name || clientUser?.displayName || 'Valued Client'}</span>! Manage your project bookings and financial details with ease.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Booked Projects List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <HiOutlineBuildingOffice2 size={18} className="text-[#007b57]" />
                Booked Projects ({bookings.length})
              </h2>
            </div>
            
            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center text-slate-500 text-xs font-medium shadow-sm">
                No active project bookings found.
              </div>
            ) : (
              bookings.map((booking) => {
                const totalPrice = booking.landSharePrice || booking.totalPrice || booking.price || 0;
                const paidAmount = calculatePaidAmount(booking.transactions);
                const dues = totalPrice - paidAmount;
                const isSelected = selectedBooking?._id === booking._id;
                
                const proj = booking.projectDetails || {};

                return (
                  <div 
                    key={booking._id}
                    onClick={() => setSelectedBooking(booking)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group transform hover:-translate-y-1 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-[#007b57]/10 to-transparent border-[#007b57] shadow-lg ring-1 ring-[#007b57]/40' 
                        : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex gap-3.5 items-center">
                      <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm shrink-0">
                        <img 
                          src={proj.img || proj.image || proj.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'} 
                          alt={proj.title || booking.projectName || "Project"} 
                          className="w-16 h-16 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="overflow-hidden flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#007b57] transition-colors duration-200">
                            {proj.title || booking.projectName || 'Booked Project'}
                          </h3>
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                            booking.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <p className="text-[11px] font-semibold text-slate-600 mt-1">Total: ৳{totalPrice.toLocaleString()}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            dues <= 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {dues <= 0 ? 'Fully Paid' : `Dues: ৳${dues.toLocaleString()}`}
                          </span>
                        </div>
                      </div>
                      <FiChevronRight size={18} className={`text-slate-400 transition-all duration-300 group-hover:translate-x-1.5 ${isSelected ? 'text-[#007b57] translate-x-1' : ''}`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT COLUMN: Detailed Project & Payment Portal */}
          <div className="lg:col-span-8">
            {selectedBooking ? (
              <div className="space-y-6">
                
                {/* 1. Main Project Overview Banner */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-6">
                  
                  {/* Property Main Image Banner with Zoom Effect */}
                  <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner group cursor-pointer">
                    <img 
                      src={selectedBooking.projectDetails?.img || selectedBooking.projectDetails?.image || selectedBooking.projectDetails?.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'} 
                      alt="Property Banner" 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    
                    {/* Top Badges overlay */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg border backdrop-blur-md shadow-lg ${getStatusBadge(selectedBooking.projectDetails?.status || selectedBooking.projectDetails?.projectStatus)}`}>
                        ● {selectedBooking.projectDetails?.status || selectedBooking.projectDetails?.projectStatus || 'Under Construction'}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-[10px] font-black text-emerald-200 uppercase tracking-widest bg-[#007b57]/80 backdrop-blur-md px-3 py-1 rounded-md w-fit mb-1 border border-emerald-400/30 shadow-md">
                        Booking ID: #{selectedBooking._id?.slice(-8)}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black drop-shadow-md text-white group-hover:text-emerald-100 transition-colors duration-300">
                        {selectedBooking.projectDetails?.title || selectedBooking.projectName}
                      </h2>
                      <p className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 mt-1">
                        <FiMapPin size={14} className="text-rose-400" />
                        {selectedBooking.projectAddress || selectedBooking.projectDetails?.location || 'Location Not Specified'}
                      </p>
                    </div>
                  </div>

                  {/* Financial Summary Cards with Hover Lift */}
                  {(() => {
                    const totalPrice = selectedBooking.landSharePrice || selectedBooking.totalPrice || selectedBooking.price || 0;
                    const paidAmount = calculatePaidAmount(selectedBooking.transactions);
                    const dues = totalPrice - paidAmount;

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-[#007b57]/5 to-slate-50 p-4 rounded-2xl border border-[#007b57]/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-[#007b57]/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-300"></div>
                          <p className="text-[10px] font-black text-[#007b57] uppercase tracking-wider">Total Project Price</p>
                          <p className="text-xl font-black text-slate-900 mt-1">৳{totalPrice.toLocaleString()}</p>
                        </div>

                        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100/60 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-300"></div>
                          <p className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">Approved Paid</p>
                          <p className="text-xl font-black text-emerald-700 mt-1">৳{paidAmount.toLocaleString()}</p>
                        </div>

                        <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-rose-100/60 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-300"></div>
                          <p className="text-[10px] font-black text-rose-700 uppercase tracking-wider">Remaining Dues</p>
                          <p className="text-xl font-black text-rose-700 mt-1">৳{(dues > 0 ? dues : 0).toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 2. Property Specifications Grid */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-5">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-[#007b57] font-black text-xs uppercase tracking-wider">
                    <FiInfo size={16} />
                    <h3>Property Specifications & Details</h3>
                  </div>

                  {/* Image Gallery */}
                  {selectedBooking.projectDetails?.images && selectedBooking.projectDetails.images.length > 1 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                        <FiGrid size={14} className="text-[#007b57]" /> Project Gallery:
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                        {selectedBooking.projectDetails.images.map((imgUrl, i) => (
                          <div key={i} className="overflow-hidden rounded-xl border border-slate-200/80 shadow-sm group">
                            <img 
                              src={imgUrl} 
                              alt={`Gallery ${i}`} 
                              className="h-20 w-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Spec Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {[
                      { icon: <FiLayers size={12} className="text-[#007b57]" />, label: 'Building Type', val: selectedBooking.projectDetails?.buildingType || 'Residential' },
                      { icon: <FiHome size={12} className="text-[#007b57]" />, label: 'Apartment Type', val: selectedBooking.apartmentType || 'N/A' },
                      { icon: <FiGrid size={12} className="text-[#007b57]" />, label: 'Total Floors', val: selectedBooking.projectDetails?.totalFloors || selectedBooking.projectDetails?.floors || 'G + 9' },
                      { icon: <FiCalendar size={12} className="text-[#007b57]" />, label: 'Est. Handover', val: selectedBooking.projectDetails?.handoverDate || 'December 2026' },
                      { icon: <FiTag size={12} className="text-[#007b57]" />, label: 'Land Share Price', val: `৳${selectedBooking.landSharePrice?.toLocaleString() || 'N/A'}` },
                      { icon: <FiCheckSquare size={12} className="text-emerald-600" />, label: 'Booking Money', val: `৳${selectedBooking.bookingMoney?.toLocaleString() || 'N/A'}`, color: 'text-emerald-700' },
                      { icon: <FiInfo size={12} className="text-[#007b57]" />, label: 'Facing', val: selectedBooking.projectDetails?.facing || 'South Facing' },
                      { icon: <FiGrid size={12} className="text-[#007b57]" />, label: 'Size / Share', val: selectedBooking.projectDetails?.flatSize || '1450 Sq Ft' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-50/60 p-3 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-[#007b57]/40 hover:bg-white transition-all duration-300 hover:-translate-y-0.5">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                          {item.icon} {item.label}
                        </span>
                        <span className={`font-bold mt-1 block ${item.color || 'text-slate-800'}`}>{item.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  {selectedBooking.projectDetails?.description && (
                    <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-200/60 text-xs text-slate-600 space-y-1 hover:border-[#007b57]/30 transition-all duration-200">
                      <span className="font-bold text-slate-800 block">Project Description:</span>
                      <p className="leading-relaxed">{selectedBooking.projectDetails.description}</p>
                    </div>
                  )}
                </div>

                {/* 3. Applicant & Nominee Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Applicant Details */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-4 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-[#007b57] font-black text-xs uppercase tracking-wider">
                      <FiUser size={16} />
                      <h3>Applicant Information</h3>
                    </div>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Name:</span> <span className="font-bold text-slate-900">{selectedBooking.applicantName}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Father/Husband:</span> <span className="text-slate-800 font-medium">{selectedBooking.fatherHusbandName}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Mother Name:</span> <span className="text-slate-800 font-medium">{selectedBooking.motherName}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Contact No:</span> <span className="text-slate-800 font-bold">{selectedBooking.contactNo}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Alt Contact:</span> <span className="text-slate-800">{selectedBooking.altContactNo}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Email:</span> <span className="text-slate-800 font-medium truncate max-w-[180px]">{selectedBooking.email}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Date of Birth:</span> <span className="text-slate-800 font-medium">{selectedBooking.dateOfBirth}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Profession:</span> <span className="text-slate-800 font-medium">{selectedBooking.profession}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">National ID:</span> <span className="text-slate-800 font-mono font-bold">{selectedBooking.nationalId}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Passport No:</span> <span className="text-slate-800 font-mono">{selectedBooking.passportNo || 'N/A'}</span></div>
                    </div>
                  </div>

                  {/* Nominee Details */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-4 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-[#007b57] font-black text-xs uppercase tracking-wider">
                      <HiOutlineShieldCheck size={18} />
                      <h3>Nominee Information</h3>
                    </div>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Nominee Name:</span> <span className="font-bold text-slate-900">{selectedBooking.nomineeName}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Relation:</span> <span className="text-slate-800 font-medium">{selectedBooking.nomineeRelation}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Mobile No:</span> <span className="text-slate-800 font-bold">{selectedBooking.nomineeMobileNo}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">National ID:</span> <span className="text-slate-800 font-mono font-bold">{selectedBooking.nomineeNationalId}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400 font-medium">Address:</span> <span className="text-slate-800 font-medium truncate max-w-[180px]">{selectedBooking.nomineeAddress}</span></div>
                    </div>
                  </div>

                </div>

                {/* 4. Payment Submission Form */}
                {((selectedBooking.landSharePrice || selectedBooking.totalPrice || selectedBooking.price || 0) - calculatePaidAmount(selectedBooking.transactions)) > 0 && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-6">
                    <div className="flex items-center gap-2 text-slate-900">
                      <FiCreditCard className="text-[#007b57]" size={20} />
                      <h3 className="text-xs font-black uppercase tracking-wider">Submit Payment Details</h3>
                    </div>

                    {message && (
                      <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 ${
                        message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        <FiAlertCircle size={16} />
                        <span>{message.text}</span>
                      </div>
                    )}

                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                          Select Payment Method
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('bank')}
                            className={`py-3.5 px-4 rounded-2xl text-xs font-bold border flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-md ${
                              paymentMethod === 'bank' 
                                ? 'bg-[#007b57] text-white border-[#007b57] shadow-lg shadow-[#007b57]/20' 
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <FaBuilding size={16} />
                            <span>Bank Transfer</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMethod('cash')}
                            className={`py-3.5 px-4 rounded-2xl text-xs font-bold border flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-md ${
                              paymentMethod === 'cash' 
                                ? 'bg-[#007b57] text-white border-[#007b57] shadow-lg shadow-[#007b57]/20' 
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <TbMoneybag size={18} />
                            <span>Cash Deposit</span>
                          </button>
                        </div>
                      </div>

                      {paymentMethod === 'bank' && (
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., Dutch-Bangla Bank, City Bank"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs text-slate-800 font-semibold focus:outline-none focus:bg-white focus:border-[#007b57] focus:ring-2 focus:ring-[#007b57]/20 transition-all duration-200"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                          Amount Paid (BDT)
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="Enter payment amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs text-slate-800 font-semibold focus:outline-none focus:bg-white focus:border-[#007b57] focus:ring-2 focus:ring-[#007b57]/20 transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                          Transaction ID / Deposit Receipt No.
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., TXN-89023471"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs text-slate-800 font-semibold focus:outline-none focus:bg-white focus:border-[#007b57] focus:ring-2 focus:ring-[#007b57]/20 transition-all duration-200"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-[#007b57] hover:bg-[#006346] text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-lg shadow-[#007b57]/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
                      >
                        {submitting ? 'Submitting...' : 'Submit Payment to Admin'}
                      </button>
                    </form>
                  </div>
                )}

                {/* 5. Payment History Section */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-4">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                    Payment History & Verification Status
                  </h3>

                  {(!selectedBooking.transactions || selectedBooking.transactions.length === 0) ? (
                    <p className="text-xs font-medium text-slate-400 py-2">No transaction records found for this project.</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedBooking.transactions.map((txn, index) => (
                        <div key={txn._id || index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50/60 rounded-2xl border border-slate-200/60 gap-3 shadow-sm hover:shadow-md hover:border-[#007b57]/30 hover:bg-white transition-all duration-200">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-slate-900">৳{txn.amount?.toLocaleString()}</span>
                              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200">
                                {txn.paymentMethod} {txn.bankName !== 'N/A' && `(${txn.bankName})`}
                              </span>
                            </div>
                            <p className="text-[11px] font-mono text-slate-500 mt-1">Txn ID: {txn.transactionId}</p>
                          </div>

                          <div>
                            {txn.status === 'pending' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                                <FiClock size={13} /> Pending Verification
                              </span>
                            )}
                            {txn.status === 'approved' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                                <FiCheckCircle size={13} /> Approved
                              </span>
                            )}
                            {txn.status === 'rejected' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                                <FiXCircle size={13} /> Rejected
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-16 border border-slate-200/80 text-center text-slate-400 shadow-xl shadow-slate-200/50">
                Select a project from the left panel to view detailed information.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}