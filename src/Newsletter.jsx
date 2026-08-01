import React from 'react';

export default function NewsletterSection() {

  return (
    <section className="relative bg-[url('https://readymadeui.com/images/real-estate-img.webp')] bg-no-repeat bg-center bg-cover z-50 before:absolute before:inset-0 before:bg-black/70">
      <div className="min-h-[400px] relative z-50 h-full flex flex-col justify-center items-center text-center px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-50 mb-6 md:text-4xl">Subscribe to Our Newsletter</h2>
          <p className="text-slate-300 text-base leading-relaxed">Subscribe to our newsletter and stay up to date with the
            latest news,
            updates, and exclusive offers. Get valuable insights. Join our community today!</p>

          <div className="max-w-lg mx-auto mt-12 flex justify-center">


            <button type="submit"
              className="bg-white text-[#1ba554] text-center font-bold  rounded-lg p-2 outline-1 -outline-offset-1  w-[70%]">
              Schedule A Consultation</button>

          </div>
        </div>
      </div>
    </section>
  );
}