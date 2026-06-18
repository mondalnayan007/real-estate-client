import React from 'react';
import CompanyNavbar from '../components/companylandingpagecomponent/CompanyNavbar';
import CompanyHero from '../components/companylandingpagecomponent/CompanyHero';
import CompanyFeatures from '../components/companylandingpagecomponent/CompanyFeatures';
import CompanyPricing from '../components/companylandingpagecomponent/CompanyPricing';
import CompanyFooter from '../components/companylandingpagecomponent/CompanyFooter';
import CompanySlider from '../components/companylandingpagecomponent/CompanySlider';

const CompanyLandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500 selection:text-white">
      {/* ১. নেভিগেশন বার */}
      <CompanyNavbar />
      
      {/* ২. হিরো সেকশন */}
      
      <CompanySlider></CompanySlider>
      
      {/* ৩. ফিচার সেকশন */}
      <CompanyFeatures />
      
      {/* ৪. প্রাইসিং ও সাবস্ক্রিপশন প্ল্যান */}
      <CompanyPricing />
      
      {/* ৫. ফুটার */}
      <CompanyFooter />
    </div>
  );
};

export default CompanyLandingPage;