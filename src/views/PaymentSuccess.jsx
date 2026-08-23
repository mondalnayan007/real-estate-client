import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // URL Parameter পড়ার জন্য

const PaymentSuccess = ({
  paymentData = {
    transactionId: "TXN-884920193",
    planName: "Agency Pro Plan",
    amount: "$49.00",
    agencyName: "Prime Estates Ltd",
    domain: "mark", // Default Subdomain
    customerEmail: "user@example.com",
    customerPhone: "+880 1700-000000",
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [searchParams] = useSearchParams();

  // 🟢 ১. URL Param থেকে domain/subdomain নেওয়া (যেমন: ?domain=mark)
  const subdomain = searchParams.get('domain') || paymentData.domain;

  // 🟢 ২. Localhost & Production এর জন্য ডাইনামিক URL তৈরি
  const handleWebsite = () => {
    const isLocalhost = window.location.hostname.includes('localhost');
    let finalTargetUrl = '';

    if (isLocalhost) {
      // Localhost এর ক্ষেত্রে (e.g., http://mark.localhost:3000)
      const port = window.location.port ? `:${window.location.port}` : '';
      const cleanSubdomain = subdomain.replace('.primeestates.com', ''); // শুধুই 'mark' রাখা
      finalTargetUrl = `http://${cleanSubdomain}.localhost${port}`;
    } else {
      // Production এর ক্ষেত্রে (e.g., https://mark.primeestates.com)
      const fullDomain = subdomain.includes('.') ? subdomain : `${subdomain}.primeestates.com`;
      finalTargetUrl = `https://${fullDomain}`;
    }

    // রিডায়রেক্ট
    window.location.href = finalTargetUrl;
  };

  const handleNativePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* 🔴 PRINT ENGINE CSS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible !important;
          }
          #printable-invoice {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>

      {/* 🟢 TOP HEADER SECTION */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <span className="font-bold text-slate-800 text-lg">PrimeEstates</span>
        </div>

        <button
          onClick={() => setShowInvoiceModal(true)}
          className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-medium text-sm transition-all border border-slate-300 shadow-sm"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Payment Receipt</span>
        </button>
      </header>

      {/* 🟢 MAIN BODY SECTION */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center space-y-6">
          
          <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center relative">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900">Payment Successful!</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your domain <span className="font-semibold text-emerald-600">{subdomain}.primeestates.com</span> and subscription have been configured successfully.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction Ref:</span>
              <span className="font-mono font-bold text-slate-700">{paymentData.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Paid:</span>
              <span className="font-bold text-emerald-600 text-sm">{paymentData.amount}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleWebsite}
              className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all text-base"
            >
              <span>Go to Your Website</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>

        </div>
      </main>

      {/* 🟢 MODAL PREVIEW */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Payment Receipt Preview</h3>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-800 text-base">Receipt Ready for Download</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click below to save your official invoice for <span className="font-bold text-slate-700">{paymentData.agencyName}</span> as a PDF file.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={handleNativePrint}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Save / Download PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 📄 OFFICIAL PROFESSIONAL INVOICE TEMPLATE */}
      <div id="printable-invoice" className="hidden">
        <div style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          maxWidth: "750px",
          margin: "0 auto",
          padding: "40px",
          backgroundColor: "#ffffff",
          color: "#1e293b",
          boxSizing: "border-box"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "25px", borderBottom: "2px solid #059669" }}>
            <div>
              <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#059669" }}>PRIMEESTATES</h1>
              <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748b" }}>Software & Agency Solutions</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>INVOICE</h2>
              <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748b" }}><strong>Invoice Ref:</strong> #{paymentData.transactionId}</p>
              <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}><strong>Date:</strong> {paymentData.date}</p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", margin: "30px 0" }}>
            <div>
              <p style={{ margin: "0 0 6px 0", fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase" }}>BILLED TO</p>
              <p style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>{paymentData.agencyName}</p>
              <p style={{ margin: "3px 0 0 0", fontSize: "13px", color: "#475569" }}>{paymentData.customerEmail}</p>
              <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#475569" }}>{paymentData.customerPhone}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "0 0 6px 0", fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase" }}>PAYMENT STATUS</p>
              <span style={{ display: "inline-block", backgroundColor: "#d1fae5", color: "#065f46", fontSize: "12px", fontWeight: "700", padding: "4px 12px", borderRadius: "20px" }}>
                PAID IN FULL
              </span>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", marginBottom: "30px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #cbd5e1", textTransform: "uppercase", fontSize: "11px", color: "#475569" }}>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>Description</th>
                <th style={{ padding: "12px 16px", textAlign: "center" }}>Domain Reference</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #e2e8f0", fontSize: "13px" }}>
                <td style={{ padding: "16px" }}>
                  <p style={{ margin: 0, fontWeight: "700", color: "#0f172a" }}>{paymentData.planName}</p>
                  <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#64748b" }}>Subscription License</p>
                </td>
                <td style={{ padding: "16px", textAlign: "center", color: "#059669", fontWeight: "600" }}>
                  {subdomain}.primeestates.com
                </td>
                <td style={{ padding: "16px", textAlign: "right", fontWeight: "700", color: "#0f172a" }}>
                  {paymentData.amount}
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc", padding: "16px 20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#334155" }}>
              Total Amount Paid
            </div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "#059669", textAlign: "right" }}>
              {paymentData.amount}
            </div>
          </div>

          <div style={{ marginTop: "50px", paddingTop: "20px", borderTop: "1px solid #e2e8f0", textAlign: "center", fontSize: "11px", color: "#94a3b8" }}>
            <p style={{ margin: 0 }}>Thank you for doing business with PrimeEstates.</p>
            <p style={{ margin: "4px 0 0 0" }}>If you have any questions about this invoice, please contact support@primeestates.com</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PaymentSuccess;