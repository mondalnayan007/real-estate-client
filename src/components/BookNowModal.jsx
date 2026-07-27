import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Building2, User, Mail, DollarSign, Users, ShieldCheck, Sparkles } from 'lucide-react';

export default function BookNowModal({ isOpen, onClose, propertyTitle, bookingPrice, sharePrice, _id }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State initialized with structure matching the document
  const [formData, setFormData] = useState({
    bookingDate: new Date().toISOString().split('T')[0],
    location: '',
    projectName: propertyTitle || '',
    applicantName: '',
    email: '', // 👈 New Email Field
    fatherHusbandName: '',
    motherName: '',
    presentAddress: '',
    permanentAddress: '',
    profession: '',
    nationality: 'Bangladeshi',
    dateOfBirth: '',
    contactNo: '',
    altContactNo: '',
    nationalId: '',
    passportNo: '',
    religion: '',
    projectAddress: '',
    apartmentType: '',
    landSharePrice: sharePrice || '',
    bookingMoney: bookingPrice || '',
    nomineeName: '',
    nomineeAddress: '',
    nomineeRelation: '',
    nomineeMobileNo: '',
    nomineeNationalId: ''
  });

  // Keep props in sync with formData if props change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      projectName: propertyTitle || prev.projectName,
      landSharePrice: sharePrice || prev.landSharePrice,
      bookingMoney: bookingPrice || prev.bookingMoney
    }));
  }, [propertyTitle, sharePrice, bookingPrice]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && (data.success || data.acknowledged)) {
        setIsSubmitted(true);
      } else {
        alert(data.message || "Booking submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking application:", error);
      alert("Server connection failed! Please check if your API server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white border border-slate-100 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100/80">
              <Sparkles size={20} />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-emerald-600 uppercase block">Official Application</span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Property Booking Form</h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all duration-200 focus:outline-none"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-inner">
                <CheckCircle2 size={44} />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-slate-900">Application Submitted!</h4>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  Your booking application for <span className="font-semibold text-slate-800">{formData.projectName}</span> has been received. Our team will contact you shortly.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="mt-4 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Close Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION 1: PROJECT INFO */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Building2 size={16} className="text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Project Information
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Booking Date</label>
                    <input
                      type="date"
                      name="bookingDate"
                      value={formData.bookingDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Mohammadpur"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Project Name</label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: APPLICANT DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <User size={16} className="text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Applicant Details
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Applicant's Name *</label>
                    <input
                      type="text"
                      name="applicantName"
                      required
                      placeholder="Full Name"
                      value={formData.applicantName}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1 flex items-center gap-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Father's / Husband's Name</label>
                    <input
                      type="text"
                      name="fatherHusbandName"
                      value={formData.fatherHusbandName}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Mother's Name</label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Present Address</label>
                    <input
                      type="text"
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Permanent Address</label>
                    <input
                      type="text"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Profession</label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Date of Birth</label>
                    <input
                      type="text"
                      name="dateOfBirth"
                      placeholder="e.g. 21 Feb 1990"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Religion</label>
                    <input
                      type="text"
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Contact No *</label>
                    <input
                      type="tel"
                      name="contactNo"
                      required
                      placeholder="+8801..."
                      value={formData.contactNo}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Alt. Contact No</label>
                    <input
                      type="tel"
                      name="altContactNo"
                      value={formData.altContactNo}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">National ID (NID)</label>
                    <input
                      type="text"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Passport No</label>
                    <input
                      type="text"
                      name="passportNo"
                      value={formData.passportNo}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: APARTMENT & FINANCIAL BREAKDOWN */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <DollarSign size={16} className="text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Apartment & Financial Terms
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Project Address</label>
                    <input
                      type="text"
                      name="projectAddress"
                      value={formData.projectAddress}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Type of Apartment</label>
                    <input
                      type="text"
                      name="apartmentType"
                      placeholder="e.g. 7(C)"
                      value={formData.apartmentType}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Land Share Price</label>
                    <input
                      type="text"
                      name="landSharePrice"
                      readOnly
                      value={formData.landSharePrice}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-semibold cursor-not-allowed select-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Booking Money</label>
                    <input
                      type="text"
                      name="bookingMoney"
                      readOnly
                      value={formData.bookingMoney}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-semibold cursor-not-allowed select-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: NOMINEE DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Users size={16} className="text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Nominee Information
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Nominee Name</label>
                    <input
                      type="text"
                      name="nomineeName"
                      value={formData.nomineeName}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Relation</label>
                    <input
                      type="text"
                      name="nomineeRelation"
                      placeholder="e.g. Spouse / Brother"
                      value={formData.nomineeRelation}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Mobile No</label>
                    <input
                      type="tel"
                      name="nomineeMobileNo"
                      value={formData.nomineeMobileNo}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Address</label>
                    <input
                      type="text"
                      name="nomineeAddress"
                      value={formData.nomineeAddress}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">National ID</label>
                    <input
                      type="text"
                      name="nomineeNationalId"
                      value={formData.nomineeNationalId}
                      onChange={handleChange}
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* DECLARATION DISCLAIMER */}
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  I hereby declare that the information furnished by me here is true to the best of my knowledge and belief. I agree to accept and abide by all rules, specifications and terms formulated by the company.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting Application..." : "Submit Booking Application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}