import React, { useState } from 'react';
import { Plus, Trash2, Check, Image, Video, FileText } from 'lucide-react';

export default function PropertyManagement({ properties, setProperties }) {
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  console.log(subdomain);
  const [newProp, setNewProp] = useState({
    title: '',
    price: '',
    location: '',
    category: 'Apartments',
    tag: '',
    beds: '',
    baths: '',
    sqft: '',
    status: 'completed',
    description: '',
    domain: subdomain
  });





  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const allowedAmenities = ['Lift', 'Generator', 'Parking', 'Intercom', '24/7 Security'];
  const categories = ['Apartments', 'Penthouses', 'Villas', 'Duplex'];

  const toggleAmenity = (item) => {
    setSelectedAmenities(prev => prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]);
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProp.title || !newProp.price) return;

    try {
      const formData = new FormData();

      // টেক্সট ডাটা অ্যাপেন্ড
      Object.keys(newProp).forEach(key => {
        formData.append(key, newProp[key]);
      });

      


      formData.append('amenities', JSON.stringify(selectedAmenities));

      // একাধিক ইমেজ ফাইল অ্যাপেন্ড
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });



      // ==================================================================
      // আপনার ব্যাকএন্ড API কল (এখানে ইউআরএল বসাবেন)
      // ==================================================================
      const response = await fetch('http://localhost:4000/projects', {
        method: 'POST',
        body: formData, // FormData পাঠালে Content-Type হেডার দেওয়া লাগে না
      });

      if (!response.ok) throw new Error('Failed to create property');

      // ব্যাকএন্ড (MongoDB) থেকে আসা রেসপন্স রিসিভ করা
      // যেখানে MongoDB-এর দেওয়া `_id` থাকবে
      const savedProperty = await response.json();

      // ডাটাবেজে সেভ হওয়া অবজেক্টটি সরাসরি স্টেটের শুরুতে যোগ করা
      setProperties([savedProperty, ...properties]);

      // ফর্ম রিসেট
      setNewProp({
        title: '', price: '', location: '', category: 'Apartments',
        tag: '', beds: '', baths: '', sqft: '', status: 'completed',
        description: '', videoLink: ''
      });
      setSelectedImages([]);
      setSelectedAmenities([]);
      alert("Property Added Successfully!");

    } catch (error) {
      console.error("Error creating property:", error);
      alert("Something went wrong!");
    }
  };

  const rotateStatus = async (id, current) => {
    const sequence = ['completed', 'under-construction', 'upcoming'];
    const next = sequence[(sequence.indexOf(current) + 1) % sequence.length];

    try {
      // ব্যাকএন্ডে স্ট্যাটাস আপডেটের জন্য API কল (MongoDB _id ব্যবহার করে)
      /*
      const response = await fetch(`YOUR_BACKEND_SERVER_URL/api/properties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next })
      });
      if (!response.ok) throw new Error('Status update failed');
      */

      // ফ্রন্টএন্ড স্টেট আপডেট (এখানে p._id ব্যবহার করা হয়েছে কারণ MongoDB তে আইডি _id হিসেবে থাকে)
      setProperties(properties.map(p => p._id === id ? { ...p, status: next } : p));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      // ব্যাকএন্ড থেকে ডিলিট করার API কল
      /*
      const response = await fetch(`YOUR_BACKEND_SERVER_URL/api/properties/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Delete failed');
      */

      // ফ্রন্টএন্ড স্টেট থেকে রিমুভ (MongoDB _id অনুযায়ী)
      setProperties(properties.filter(x => x._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-white">
      <div>
        <h2 className="text-xl font-black uppercase tracking-wider">Property Management Console</h2>
        <p className="text-xs text-slate-400">Configure core item assets, facilities flags, media nodes, and global states.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Property Title" value={newProp.title} onChange={e => setNewProp({ ...newProp, title: e.target.value })} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" required />
          <input type="text" placeholder="Price (e.g. $2,920,000)" value={newProp.price} onChange={e => setNewProp({ ...newProp, price: e.target.value })} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" required />
          <input type="text" placeholder="Location" value={newProp.location} onChange={e => setNewProp({ ...newProp, location: e.target.value })} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />

          <select value={newProp.category} onChange={e => setNewProp({ ...newProp, category: e.target.value })} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
            {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
          </select>

          <input type="text" placeholder="Tag" value={newProp.tag} onChange={e => setNewProp({ ...newProp, tag: e.target.value })} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />

          <select value={newProp.status} onChange={e => setNewProp({ ...newProp, status: e.target.value })} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
            <option value="completed">Completed</option>
            <option value="under-construction">Under Construction</option>
            <option value="upcoming">Upcoming</option>
          </select>

          <input type="number" placeholder="Beds" value={newProp.beds} onChange={e => setNewProp({ ...newProp, beds: e.target.value })} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
          <input type="number" placeholder="Baths" value={newProp.baths} onChange={e => setNewProp({ ...newProp, baths: e.target.value })} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
          <input type="text" placeholder="Sqft" value={newProp.sqft} onChange={e => setNewProp({ ...newProp, sqft: e.target.value })} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
        </div>

        <div className="w-full">
          <textarea placeholder="Detailed Description Structure..." value={newProp.description} onChange={e => setNewProp({ ...newProp, description: e.target.value })} className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" rows="2" />
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
          <p className="text-[10px] uppercase font-bold text-blue-400 flex items-center gap-1"><Image size={12} /> Media Configuration & Uploads</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1 uppercase">Upload Images</label>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
              {selectedImages.length > 0 && (
                <p className="text-[10px] text-emerald-400 mt-1">{selectedImages.length} images selected.</p>
              )}
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1 uppercase">Video Tour Link</label>
              <input type="text" placeholder="https://youtube.com/..." value={newProp.videoLink} onChange={e => setNewProp({ ...newProp, videoLink: e.target.value })} className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase font-bold text-slate-400">Amenities Matrix Checklist</p>
          <div className="flex flex-wrap gap-2">
            {allowedAmenities.map((amenity, idx) => (
              <button type="button" key={idx} onClick={() => toggleAmenity(amenity)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${selectedAmenities.includes(amenity) ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                {amenity} {selectedAmenities.includes(amenity) && <Check size={12} />}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"><Plus size={14} /> Add Property Listing</button>
      </form>

      {/* Table List View */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">Title / Valuation</th>
              <th className="p-4">Category / Tag</th>
              <th className="p-4">Location</th>
              <th className="p-4">Specs (B/B/Sqft)</th>
              <th className="p-4 text-center">Status (Click to Switch)</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {properties.map(p => (
              /* MongoDB এর আইডি সাধারণত `p._id` হিসেবে থাকে, তাই key তে `p._id` দেওয়া হয়েছে */
              <tr key={p._id} className="hover:bg-slate-950/30">
                <td className="p-4 font-bold text-white flex items-center gap-3">
                  {p.img && <img src={p.img} alt={p.title} className="w-10 h-10 object-cover rounded-lg border border-slate-800" />}
                  <div>
                    {p.title}
                    <div className="text-[10px] font-mono text-emerald-400 mt-0.5">{p.price}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300 mr-1">{p.category}</span>
                  {p.tag && <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-[10px]">{p.tag}</span>}
                </td>
                <td className="p-4 text-slate-400">{p.location}</td>
                <td className="p-4 text-slate-400 font-mono text-[11px]">
                  {p.beds}B / {p.baths}B / {p.sqft}
                </td>
                <td className="p-4 text-center">
                  {/* MongoDB এর আইডি পাস করা হচ্ছে */}
                  <button onClick={() => rotateStatus(p._id, p.status)} className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${p.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-amber-500/10 border-amber-500 text-amber-400'}`}>{p.status}</button>
                </td>
                <td className="p-4 text-center">
                  {/* MongoDB এর আইডি পাস করা হচ্ছে */}
                  <button onClick={() => deleteProperty(p._id)} className="text-rose-400 hover:bg-rose-500/20 p-2 rounded-lg"><Trash2 size={13} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}