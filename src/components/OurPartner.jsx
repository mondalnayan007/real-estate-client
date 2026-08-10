import React from 'react';
import MarqueeComponent from 'react-fast-marquee';
const Marquee = MarqueeComponent.default || MarqueeComponent;

const OurPartner = () => {


const partners = [
  {
    id: 1,
    name: "Partner 1",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBnX9MgMI2cJuvGXc5M7-fDkRjDPH9dpjr3RS9C15QTNmZAkpJzc_8RyI&s",
  },
  {
    id: 2,
    name: "Partner 2",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9qZHu5i-6MiwPtZtxKXWsaFAlvotGhJOKND6BV5vxTj2yEJezgJalyU&s=10",
  },
  {
    id: 3,
    name: "Bashundhara Cement",
    logo: "https://images.seeklogo.com/logo-png/51/2/bashundhara-cement-ltd-logo-png_seeklogo-515521.png",
  },
  {
    id: 4,
    name: "Partner 4",
    logo: "https://media.licdn.com/dms/image/v2/D5622AQHZ2Ul987rTbw/feedshare-shrink_800/feedshare-shrink_800/0/1698045754109?e=2147483647&v=beta&t=EjGB6QCcQ8F0rUumlrf73xxiNMXVg6RLtoTDFLPqmJ4",
  },
  {
    id: 5,
    name: "Crown Cement",
    logo: "https://images.seeklogo.com/logo-png/28/1/crown-cement-logo-png_seeklogo-282523.png",
  },
];





    return (
        <div>
                  <section className="py-16 bg-[#f4f7f6] relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Header Section */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#007b57] uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              Trusted Alliances
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">
              Our Partners
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              We collaborate with industry leaders to deliver construction excellence.
            </p>
          </div>

          {/* Marquee with Side Blurs & Card Layout */}
          <div className="relative w-full overflow-hidden">
            {/* Left Blur Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#f4f7f6] to-transparent z-10 pointer-events-none" />

            {/* Right Blur Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#f4f7f6] to-transparent z-10 pointer-events-none" />

            <Marquee pauseOnHover={true} speed={40} gradient={false}>
              <div className="flex items-center gap-6 py-4 pr-6">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="w-44 h-24 sm:w-52 sm:h-28 bg-white rounded-2xl p-4 flex items-center justify-center 
                shadow-sm hover:shadow-md border border-gray-200/60 hover:border-[#007b57]/40 
                transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                  >
                    <img
                      className="max-h-16 w-auto max-w-[85%] object-contain filter  opacity-80 group-hover:opacity-100 transition-all duration-300"
                      src={partner.logo}
                      alt={partner.name}
                    />
                  </div>
                ))}
              </div>
            </Marquee>
          </div>

        </div>
      </section>
        </div>
    );
};

export default OurPartner;