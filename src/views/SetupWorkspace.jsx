import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBuilding, FaWhatsapp, FaGlobe, FaArrowRight, FaSpinner } from 'react-icons/fa';

const SetupWorkspace = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const step1Data = location.state;

    // স্টেপ ১ এর ডাটা না থাকলে রেজিস্ট্রেশনে ফেরত পাঠানো
    useEffect(() => {
        if (!step1Data || !step1Data.agentId) {
            navigate('/register');
        }
    }, [step1Data, navigate]);

    // ব্র্যান্ড ও ডোমেন স্টেট
    const [agencyName, setAgencyName] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [domainType, setDomainType] = useState('subdomain');
    const [customUsername, setCustomUsername] = useState('');
    const [customDomain, setCustomDomain] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmitWorkspace = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // ডোমেন নাম ক্যালকুলেট করা
        let calculatedDomain = "";
        let cleanSubdomain = "";
        let cleanCustomDomain = "";

        if (domainType === 'subdomain') {
            cleanSubdomain = customUsername.trim().toLowerCase().replace(/\s+/g, '');
            if (!cleanSubdomain) {
                setLoading(false);
                return setError("Please enter a valid subdomain prefix.");
            }
            calculatedDomain = `http://${cleanSubdomain}.localhost:5173`;
        } else {
            cleanCustomDomain = customDomain.trim().toLowerCase().replace(/^(http?:\/\/)?(www\.)?/, '');
            if (!cleanCustomDomain) {
                setLoading(false);
                return setError("Please enter your custom domain.");
            }
            calculatedDomain = `http://${cleanCustomDomain}`;
        }

        try {
            // ১. আপনার আগের প্রোজেক্ট স্টাইলে FormData তৈরি করা
            const formData = new FormData();

            // ২. টেক্সট ডাটা অ্যাপেন্ড করা
            formData.append('agentId', step1Data.agentId);
            formData.append('firstName', step1Data.firstName);
            formData.append('lastName', step1Data.lastName);
            formData.append('email', step1Data.email);
            formData.append('authProvider', step1Data.authProvider);

            formData.append('agencyName', agencyName.trim());
            formData.append('whatsappNumber', whatsappNumber.trim());
            formData.append('domainType', domainType);
            formData.append('targetDomain', calculatedDomain);
            formData.append('paymentStatus', 'pending');

            if (domainType === 'subdomain') {
                formData.append('subdomain', cleanSubdomain);
            } else {
                formData.append('customDomain', cleanCustomDomain);
            }

            // ৩. আপনার সিঙ্গেল ফাইল বা অবতার হ্যান্ডলিং
            if (step1Data.rawFile) {
                // ইমেল সাইন-আপের ক্ষেত্রে আসল File অবজেক্ট যাচ্ছে, যা ব্যাকএন্ডে req.file হিসেবে ক্যাচ হবে
                formData.append('avatar', step1Data.rawFile);
            } else if (step1Data.avatar) {
                // গুগলের ক্ষেত্রে সরাসরি ইমেজের স্ট্রিং URL পাস করে দিচ্ছি (req.body.avatar)
                formData.append('avatar', step1Data.avatar);
            }

            // ৪. আপনার এক্সপ্রেস এপিআই-তে পোস্ট করা
            const response = await fetch('http://localhost:4000/api/agents/register', {
                method: 'POST',
                body: formData // ⚠️ কোনো 'Content-Type' হেডার দেবেন না। ব্রাউজার নিজে থেকেই Multipart boundary সেট করে নেবে।
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to register workspace.");
            }

            setLoading(false);
            alert(`🎉 Portal registration successful for ${agencyName}!`);

            // চেকআউট পেজে পাঠানো
            //   navigate('/checkout', { state: { agentId: step1Data.agentId } });
            navigate('/process-payment', {
                state: {
                    targetDomain: calculatedDomain, // যেমন: https://apex.primestate.com
                    agencyName: agencyName.trim()
                }
            });

        } catch (err) {
            setError(err.message || "Something went wrong while registering.");
            setLoading(false);
        }
    };

    if (!step1Data) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
            <div className="sm:mx-auto w-full max-w-md mb-8">
                <div className="flex justify-between items-center border-b border-slate-900 pb-5">
                    <span className="text-2xl font-black tracking-wider text-blue-500">
                        PRIME<span className="text-white">ESTATES</span>
                    </span>
                    <div className="flex items-center gap-2">
                        {step1Data.avatar && (
                            <img src={step1Data.avatar} alt="Avatar Preview" className="h-6 w-6 rounded-full border border-slate-700 object-cover" />
                        )}
                        <span className="text-xs text-slate-400 font-semibold">{step1Data.firstName}</span>
                    </div>
                </div>
            </div>

            <div className="sm:mx-auto w-full max-w-md">
                <div className="bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-extrabold text-white">Setup Workspace</h2>
                            <p className="text-xs text-slate-500 mt-1">Configure your real estate portal details</p>
                        </div>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700 uppercase tracking-widest font-mono">Step 2/2</span>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-950/40 border border-red-500/50 rounded-xl text-xs text-red-200 font-semibold">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmitWorkspace} className="space-y-5">

                        {/* এজেন্সি ব্র্যান্ড নেম */}
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Agency Brand Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-xs"><FaBuilding /></span>
                                <input
                                    required
                                    type="text"
                                    value={agencyName}
                                    onChange={(e) => setAgencyName(e.target.value)}
                                    placeholder="e.g. Apex Realtors"
                                    disabled={loading}
                                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* হোয়াটসঅ্যাপ কন্টাক্ট */}
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">WhatsApp Contact</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-xs"><FaWhatsapp /></span>
                                <input
                                    required
                                    type="tel"
                                    value={whatsappNumber}
                                    onChange={(e) => setWhatsappNumber(e.target.value)}
                                    placeholder="e.g. +8801700000000"
                                    disabled={loading}
                                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* ডোমেন সেটআপ টগল */}
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Domain Setup</span>
                            <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-850">
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setDomainType('subdomain')}
                                    className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${domainType === 'subdomain'
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    Subdomain
                                </button>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setDomainType('custom')}
                                    className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${domainType === 'custom'
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    Custom Domain
                                </button>
                            </div>
                        </div>

                        {/* ডোমেন ইনপুট */}
                        {domainType === 'subdomain' ? (
                            <div className="space-y-1">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Chosen Web URL Name</label>
                                <div className="relative flex items-center">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-xs"><FaGlobe /></span>
                                    <input
                                        required={domainType === 'subdomain'}
                                        type="text"
                                        value={customUsername}
                                        onChange={(e) => setCustomUsername(e.target.value)}
                                        placeholder="myagency"
                                        disabled={loading}
                                        className="w-full pl-9 pr-28 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <span className="absolute right-2 text-[8px] font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 pointer-events-none font-mono">
                                        .primestate.com
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Custom Live Domain</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-xs"><FaGlobe /></span>
                                    <input
                                        required={domainType === 'custom'}
                                        type="text"
                                        value={customDomain}
                                        onChange={(e) => setCustomDomain(e.target.value)}
                                        placeholder="www.myagency.com"
                                        disabled={loading}
                                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 mt-6"
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin text-sm" />
                                    <span>Configuring Workspace...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Portal & Launch</span>
                                    <FaArrowRight className="text-xs" />
                                </>
                            )}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default SetupWorkspace;