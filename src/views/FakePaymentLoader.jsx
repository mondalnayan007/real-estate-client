import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSpinner, FaCheckCircle, FaLock, FaCreditCard } from 'react-icons/fa';

const FakePaymentLoader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // স্টেপ ২ থেকে পাঠানো ডাটা রিসিভ করা (যেখানে targetDomain আছে)
  const { targetDomain, agencyName } = location.state || {};

  const [status, setStatus] = useState('processing'); // processing -> success -> redirecting
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // ডাটা না থাকলে সিকিউরিটির জন্য রেজিস্ট্রেশন পেজে ফেরত পাঠানো
    if (!targetDomain) {
      navigate('/register');
      return;
    }

    // ১. ফেক লোডিং বার অ্যানিমেশন (০ থেকে ১০০%)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5; // প্রতি ৫০ মিলি-সেকেন্ডে ৫% করে বাড়বে
      });
    }, 100);

    // ২. ২.৫ সেকেন্ড পর স্ট্যাটাস 'success' করা
    const successTimeout = setTimeout(() => {
      setStatus('success');
    }, 2500);

    // ৩. ৪.৫ সেকেন্ড পর ফাইনাল রিডাইরেকশন
    const redirectTimeout = setTimeout(() => {
      setStatus('redirecting');
      
      // সরাসরি ইউজারের প্রোভাইড করা সাবডোমেন বা ডোমেনে উইন্ডো রিডাইরেক্ট
      window.location.href = targetDomain; 
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(successTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [targetDomain, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 font-sans antialiased">
      <div className="w-full max-w-md bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-center">
        
        {/* সিকিউরড ব্যাজ */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase font-mono">
            <FaLock className="text-[8px]" /> Secure Sandbox Gateway
          </div>
        </div>

        {/* ডাইনামিক আইকন অ্যানিমেশন */}
        <div className="flex justify-center mb-6">
          {status === 'processing' && (
            <div className="relative flex items-center justify-center">
              <FaSpinner className="animate-spin text-5xl text-blue-500" />
              <FaCreditCard className="absolute text-lg text-slate-300" />
            </div>
          )}
          {(status === 'success' || status === 'redirecting') && (
            <div className="scale-110 transition-all duration-300">
              <FaCheckCircle className="text-5xl text-emerald-500 animate-bounce" />
            </div>
          )}
        </div>

        {/* টাইটেল এবং সাবটাইটেল */}
        <div className="space-y-2 mb-6">
          <h2 className="text-xl font-extrabold text-white">
            {status === 'processing' && "Initiating Sandbox Payment"}
            {status === 'success' && "Payment Authorized!"}
            {status === 'redirecting' && "Launching Your Portal"}
          </h2>
          <p className="text-xs text-slate-400 px-4 leading-relaxed">
            {status === 'processing' && `Setting up secure sandbox environment for ${agencyName}...`}
            {status === 'success' && "Sandbox environment provisioned. Domain linked successfully."}
            {status === 'redirecting' && `Redirecting you to: ${targetDomain}`}
          </p>
        </div>

        {/* প্রোগ্রেস বার */}
        <div className="space-y-2 mb-4">
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-900">
            <div 
              className={`h-full transition-all duration-100 rounded-full ${
                status === 'processing' ? 'bg-blue-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-500 font-mono">
            <span>STATUS: {status.toUpperCase()}</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* ফুটার */}
        <div className="border-t border-slate-900 pt-4 mt-6">
          <p className="text-[10px] text-slate-600 font-medium">
            Powered by <span className="text-slate-400 font-bold">PRIME</span>ESTATES Sandbox Engine
          </p>
        </div>

      </div>
    </div>
  );
};

export default FakePaymentLoader;