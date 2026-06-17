import React, { useState } from 'react';
import { Plus, Trash2, Check, Image, Video, FileText } from 'lucide-react';

export default function PropertyManagement({ properties, setProperties }) {
  const [newProp, setNewProp] = useState({ title: '', price: '', location: '', description: '', image: '', floorPlan: '', videoLink: '', status: 'Available' });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const allowedAmenities = ['Lift', 'Generator', 'Parking', 'Intercom', '24/7 Security'];

  const toggleAmenity = (item) => {
    setSelectedAmenities(prev => prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProp.title || !newProp.price) return;
    setProperties([{ id: Date.now(), ...newProp, amenities: selectedAmenities, views: 0 }, ...properties]);
    setNewProp({ title: '', price: '', location: '', description: '', image: '', floorPlan: '', videoLink: '', status: 'Available' });
    setSelectedAmenities([]);
  };

  const rotateStatus = (id, current) => {
    const sequence = ['Available', 'Booked/Pending', 'Sold Out', 'For Rent'];
    const next = sequence[(sequence.indexOf(current) + 1) % sequence.length];
    setProperties(properties.map(p => p.id === id ? { ...p, status: next } : p));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-black text-white uppercase">Property Management Console</h2>
        <p className="text-xs text-slate-400">Configure core item assets, facilities flags, media nodes, and global states.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Property Title" value={newProp.title} onChange={e => setNewProp({...newProp, title: e.target.value})} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" required />
          <input type="text" placeholder="Price (e.g. $450,000)" value={newProp.price} onChange={e => setNewProp({...newProp, price: e.target.value})} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" required />
          <input type="text" placeholder="Location City / Area" value={newProp.location} onChange={e => setNewProp({...newProp, location: e.target.value})} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
          <select value={newProp.status} onChange={e => setNewProp({...newProp, status: e.target.value})} className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
            <option value="Available">Available</option>
            <option value="Booked/Pending">Booked/Pending</option>
            <option value="Sold Out">Sold Out</option>
            <option value="For Rent">For Rent</option>
          </select>
          <div className="md:col-span-2">
            <textarea placeholder="Detailed Description Structure..." value={newProp.description} onChange={e => setNewProp({...newProp, description: e.target.value})} className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" rows="2" />
          </div>
        </div>

        {/* Media Block Links */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
          <p className="text-[10px] uppercase font-bold text-blue-400 flex items-center gap-1"><Image size={12} /> Media Configuration Links</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input type="text" placeholder="Property Image URL Link" value={newProp.image} onChange={e => setNewProp({...newProp, image: e.target.value})} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs" />
            <input type="text" placeholder="Floor Plan Image URL" value={newProp.floorPlan} onChange={e => setNewProp({...newProp, floorPlan: e.target.value})} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs" />
            <input type="text" placeholder="YouTube/Vimeo Tour Link" value={newProp.videoLink} onChange={e => setNewProp({...newProp, videoLink: e.target.value})} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs" />
          </div>
        </div>

        {/* Amenities Checklist */}
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

        <button type="submit" className="w-full bg-blue-600 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"><Plus size={14} /> Add Property Listing</button>
      </form>

      {/* Table List View */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">Title / Valuation</th>
              <th className="p-4">Location</th>
              <th className="p-4">Amenities Provided</th>
              <th className="p-4 text-center">Status (Click to Switch)</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {properties.map(p => (
              <tr key={p.id} className="hover:bg-slate-950/30">
                <td className="p-4 font-bold text-white">{p.title}<div className="text-[10px] font-mono text-emerald-400 mt-0.5">{p.price}</div></td>
                <td className="p-4 text-slate-400">{p.location}</td>
                <td className="p-4 flex flex-wrap gap-1 max-w-[150px]">{p.amenities?.map((a, i) => <span key={i} className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{a}</span>)}</td>
                <td className="p-4 text-center">
                  <button onClick={() => rotateStatus(p.id, p.status)} className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${p.status === 'Available' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : p.status === 'Sold Out' ? 'bg-rose-500/10 border-rose-500 text-rose-400' : 'bg-amber-500/10 border-amber-500 text-amber-400'}`}>{p.status}</button>
                </td>
                <td className="p-4 text-center"><button onClick={() => setProperties(properties.filter(x => x.id !== p.id))} className="text-rose-400 hover:bg-rose-500/20 p-2 rounded-lg"><Trash2 size={13} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}