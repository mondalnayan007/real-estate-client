import React, { useState } from 'react';
import { X, CheckCircle2, Building, User, Mail, Phone, MapPin, CreditCard, DollarSign, Users } from 'lucide-react';

export default function BookNowModal({ isOpen, onClose, propertyTitle,bookingPrice,sharePrice,_id}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State initialized with structure matching the document
  const [formData, setFormData] = useState({
    bookingDate: new Date().toISOString().split('T')[0],
    location: '',
    projectName: propertyTitle || '',
    applicantName: '',
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
    landSharePrice: '',
    bookingMoney: '',
    nomineeName: '',
    nomineeAddress: '',
    nomineeRelation: '',
    nomineeMobileNo: '',
    nomineeNationalId: ''
  });

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
      // Direct Fetch API Call to Backend Endpoint
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
          <div>
            <span className="text-[10px] font-black tracking-widest text-emerald-600 uppercase">Official Application Form</span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Property Booking Form</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900">Application Submitted!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your booking application for <span className="font-bold text-slate-900">{formData.projectName}</span> has been submitted successfully. Our executive will reach out to you shortly.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 px-8 py-3 bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-800 transition-all shadow-lg"
              >
                Close Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION 1: PROJECT & BASIC INFO */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700 pb-1 border-b border-slate-200 flex items-center gap-2">
                  <Building size={14} /> Project Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Date</label>
                    <input
                      type="date"
                      name="bookingDate"
                      value={formData.bookingDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Mohammadpur"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Project Name</label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: APPLICANT DETAILS */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700 pb-1 border-b border-slate-200 flex items-center gap-2">
                  <User size={14} /> Applicant Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Applicant's Name *</label>
                    <input
                      type="text"
                      name="applicantName"
                      required
                      value={formData.applicantName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Father's/Husband Name</label>
                    <input
                      type="text"
                      name="fatherHusbandName"
                      value={formData.fatherHusbandName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Mother's Name</label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Present Address</label>
                    <input
                      type="text"
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Permanent Address</label>
                    <input
                      type="text"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Profession</label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Date of Birth</label>
                    <input
                      type="text"
                      name="dateOfBirth"
                      placeholder="e.g. 21 Feb 1969"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Religion</label>
                    <input
                      type="text"
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Contact No *</label>
                    <input
                      type="tel"
                      name="contactNo"
                      required
                      value={formData.contactNo}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Alt. Contact No</label>
                    <input
                      type="tel"
                      name="altContactNo"
                      value={formData.altContactNo}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">National ID (NID)</label>
                    <input
                      type="text"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Passport No</label>
                    <input
                      type="text"
                      name="passportNo"
                      value={formData.passportNo}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: APARTMENT & FINANCIAL BREAKDOWN */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700 pb-1 border-b border-slate-200 flex items-center gap-2">
                  <DollarSign size={14} /> Apartment & Financial Terms
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Project Address</label>
                    <input
                      type="text"
                      name="projectAddress"
                      value={formData.projectAddress}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Type of Apartment</label>
                      <input
                        type="text"
                        name="apartmentType"
                        placeholder="e.g. 7(C)"
                        value={formData.apartmentType}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Land Share Price</label>
                    <input
                      type="text"
                      name="landSharePrice"
                      placeholder="e.g. 18.5 lac"
                      disabled
                      defaultValue={sharePrice}
                      value={sharePrice}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Booking Money</label>
                    <input
                      type="text"
                      name="bookingMoney"
                      placeholder="e.g. 5 lac"
                      disabled
                      defaultValue={bookingPrice}
                      value={bookingPrice}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                 
                
                </div>

               
              </div>

              {/* SECTION 4: NOMINEE DETAILS */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700 pb-1 border-b border-slate-200 flex items-center gap-2">
                  <Users size={14} /> Nominee Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Nominee Name</label>
                    <input
                      type="text"
                      name="nomineeName"
                      value={formData.nomineeName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Relation</label>
                    <input
                      type="text"
                      name="nomineeRelation"
                      placeholder="e.g. Wife"
                      value={formData.nomineeRelation}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Mobile No</label>
                    <input
                      type="tel"
                      name="nomineeMobileNo"
                      value={formData.nomineeMobileNo}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">Address</label>
                    <input
                      type="text"
                      name="nomineeAddress"
                      value={formData.nomineeAddress}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1">National ID</label>
                    <input
                      type="text"
                      name="nomineeNationalId"
                      value={formData.nomineeNationalId}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* DECLARATION DISCLAIMER */}
              <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/60">
                <p className="text-[10px] text-slate-500 leading-normal">
                  I hereby declare that the information furnished by me here is true to the best of my knowledge and belief. I agree to accept and abide by all rules, specifications and terms formulated by the company.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
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