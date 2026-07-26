import React, { use, useEffect, useState } from 'react';
import { Plus, Trash2, Image, Layers, Building2, FileText, Sparkles, MapPin, DollarSign } from 'lucide-react';
import AgentContext from '../../context/AgentContext';

export default function PropertyManagement() {
  const [properties, setProperties] = useState([]);

  const { user } = use(AgentContext);
  const agentId = user?.agentId;

  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];

  const initialPropState = {
    title: '',
    price: '',
    location: '',
    category: 'Apartments',
    tag: '',
    status: 'completed',
    description: '',
    brochureLink: '',
    totalShares: '',
    sharePrice: '',
    buildingType: 'Residential',
    frontRoad: '',
    unitPerFloor: '',
    passengerLift: '',
    cargoLift: '',
    electricityBackup: false,
    rooftopGardening: false,
    carParking: false,
    conventionHall: false,
    domain: subdomain,
    agentId: agentId || ''
  };

  const [newProp, setNewProp] = useState(initialPropState);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [units, setUnits] = useState([
    { unitName: 'Unit A', sqft: '', beds: '', baths: '', balconies: '', isAvailable: true }
  ]);

  const allowedAmenities = ['Lift', 'Generator', 'Parking', 'Intercom', '24/7 Security'];
  const categories = ['Apartments', 'Penthouses', 'Villas', 'Duplex', 'Commercial'];

  useEffect(() => {
    if (agentId) {
      fetch(`http://localhost:4000/projects?agentId=${agentId}`)
        .then(res => res.json())
        .then(data => setProperties(data))
        .catch(err => console.error("Fetch error:", err));
    }
  }, [agentId]);

  const handleUnitChange = (index, field, value) => {
    const updatedUnits = [...units];
    updatedUnits[index][field] = value;
    setUnits(updatedUnits);
  };

  const addUnitField = () => {
    setUnits([...units, { unitName: `Unit ${String.fromCharCode(65 + units.length)}`, sqft: '', beds: '', baths: '', balconies: '', isAvailable: true }]);
  };

  const removeUnitField = (index) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProp.title || !newProp.price || !newProp.totalShares) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const formData = new FormData();

      Object.keys(newProp).forEach(key => {
        formData.append(key, newProp[key]);
      });

      formData.append('availableShares', newProp.totalShares || 0);
      formData.append('agentId', agentId);
      formData.append('amenities', JSON.stringify(selectedAmenities));
      formData.append('availableUnits', JSON.stringify(units));

      selectedImages.forEach((image) => {
        formData.append('images', image);
      });

      const response = await fetch('http://localhost:4000/projects', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create property');

      const savedProperty = await response.json();
      setProperties([savedProperty, ...properties]);

      setNewProp(initialPropState);
      setSelectedImages([]);
      setSelectedAmenities([]);
      setUnits([{ unitName: 'Unit A', sqft: '', beds: '', baths: '', balconies: '', isAvailable: true }]);
      alert("Property Published Successfully!");

    } catch (error) {
      console.error("Error creating property:", error);
      alert("Something went wrong!");
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property listing?")) return;

    try {
      const response = await fetch(`http://localhost:4000/projects/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Delete failed');

      setProperties(properties.filter(x => x._id !== id));
      alert("Property deleted!");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Could not delete property!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 space-y-8 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
            <Sparkles size={14} className="text-indigo-600" /> Real Estate Portfolio Console
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            Property Management
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">Configure asset specifications, share structures, and unit configurations.</p>
        </div>
      </div>

      {/* Main Creation Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-8">
        
        {/* 1. Basic Info & Pricing */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Building2 size={18} className="text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">1. Basic Info & Valuation</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Property Title <span className="text-indigo-600">*</span></label>
              <input type="text" placeholder="e.g. Grand Vista Skyline" value={newProp.title} onChange={e => setNewProp({ ...newProp, title: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all" required />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Valuation Price <span className="text-indigo-600">*</span></label>
              <input type="text" placeholder="e.g. ৳2,50,00,000" value={newProp.price} onChange={e => setNewProp({ ...newProp, price: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all" required />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Location Address</label>
              <input type="text" placeholder="e.g. Gulshan 2, Dhaka" value={newProp.location} onChange={e => setNewProp({ ...newProp, location: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
              <select value={newProp.category} onChange={e => setNewProp({ ...newProp, category: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all">
                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Marketing Tag</label>
              <input type="text" placeholder="e.g. Premium Deal / Luxury" value={newProp.tag} onChange={e => setNewProp({ ...newProp, tag: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Status</label>
              <select value={newProp.status} onChange={e => setNewProp({ ...newProp, status: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all">
                <option value="completed">Completed</option>
                <option value="under-construction">Under Construction</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Fractional Share Structure */}
        <div className="bg-gradient-to-r from-indigo-50/80 via-purple-50/40 to-slate-50/60 p-5 rounded-2xl border border-indigo-100 space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900">2. Fractional Ownership Structure</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Total Share Count <span className="text-indigo-600">*</span></label>
              <input type="number" placeholder="e.g. 10" value={newProp.totalShares} onChange={e => setNewProp({ ...newProp, totalShares: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-indigo-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all" required />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Price Per Share (৳) <span className="text-indigo-600">*</span></label>
              <input type="number" placeholder="e.g. 2500000" value={newProp.sharePrice} onChange={e => setNewProp({ ...newProp, sharePrice: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-indigo-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all" required />
            </div>
          </div>
        </div>

        {/* 3. Building Specifications & Features */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">3. Building Specifications & Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Building Type</label>
              <input type="text" placeholder="e.g. Residential / Commercial" value={newProp.buildingType} onChange={e => setNewProp({ ...newProp, buildingType: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Front Road Access</label>
              <input type="text" placeholder="e.g. 40 Feet Wide Road" value={newProp.frontRoad} onChange={e => setNewProp({ ...newProp, frontRoad: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Units Per Floor</label>
              <input type="number" placeholder="e.g. 4" value={newProp.unitPerFloor} onChange={e => setNewProp({ ...newProp, unitPerFloor: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Passenger Lift Count</label>
              <input type="number" placeholder="e.g. 2" value={newProp.passengerLift} onChange={e => setNewProp({ ...newProp, passengerLift: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Cargo Lift Count</label>
              <input type="number" placeholder="e.g. 1" value={newProp.cargoLift} onChange={e => setNewProp({ ...newProp, cargoLift: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all" />
            </div>
          </div>

          {/* Feature Checkboxes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
            {[
              { id: 'electricityBackup', label: 'Electricity Backup' },
              { id: 'rooftopGardening', label: 'Rooftop Gardening' },
              { id: 'carParking', label: 'Dedicated Parking' },
              { id: 'conventionHall', label: 'Community Hall' },
            ].map(item => (
              <label key={item.id} className="flex items-center gap-3 p-3 bg-slate-50/80 border border-slate-200 rounded-xl cursor-pointer select-none hover:bg-white hover:border-indigo-300 transition-all">
                <input
                  type="checkbox"
                  checked={newProp[item.id]}
                  onChange={e => setNewProp({ ...newProp, [item.id]: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-white"
                />
                <span className="text-xs text-slate-700 font-semibold">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 4. Available Units Breakdown */}
        <div className="space-y-4 bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
              <Layers size={16} className="text-emerald-600" /> Available Floor Units
            </h3>
            <button type="button" onClick={addUnitField} className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-1 font-semibold shadow-sm">
              <Plus size={14} /> Add Unit
            </button>
          </div>

          {units.map((unit, index) => (
            <div key={index} className="grid grid-cols-2 md:grid-cols-6 gap-3 p-3 bg-white border border-slate-200 rounded-xl items-center shadow-sm">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Unit Name</label>
                <input type="text" placeholder="Unit Name" value={unit.unitName} onChange={e => handleUnitChange(index, 'unitName', e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900" required />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Area (Sqft)</label>
                <input type="number" placeholder="e.g. 1450" value={unit.sqft} onChange={e => handleUnitChange(index, 'sqft', e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900" required />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Bedrooms</label>
                <input type="number" placeholder="Beds" value={unit.beds} onChange={e => handleUnitChange(index, 'beds', e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Bathrooms</label>
                <input type="number" placeholder="Baths" value={unit.baths} onChange={e => handleUnitChange(index, 'baths', e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Balconies</label>
                <input type="number" placeholder="Balconies" value={unit.balconies} onChange={e => handleUnitChange(index, 'balconies', e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900" />
              </div>

              <div className="flex items-center justify-between pt-4 md:pt-0">
                <label className="flex items-center gap-1.5 text-xs text-slate-700 font-medium cursor-pointer">
                  <input type="checkbox" checked={unit.isAvailable} onChange={e => handleUnitChange(index, 'isAvailable', e.target.checked)} className="rounded text-emerald-600 bg-white" />
                  Available
                </label>
                {units.length > 1 && (
                  <button type="button" onClick={() => removeUnitField(index)} className="text-rose-500 hover:text-rose-700 p-1">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 5. Media & Brochure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Image size={14} className="text-indigo-600" /> Property Images
            </label>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer" />
            {selectedImages.length > 0 && <p className="text-xs text-emerald-600 font-bold">{selectedImages.length} file(s) selected.</p>}
          </div>

          <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileText size={14} className="text-indigo-600" /> PDF Brochure Link
            </label>
            <input type="text" placeholder="https://drive.google.com/your-brochure.pdf" value={newProp.brochureLink} onChange={e => setNewProp({ ...newProp, brochureLink: e.target.value })} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Detailed Description</label>
          <textarea placeholder="Write full specifications and project highlights..." value={newProp.description} onChange={e => setNewProp({ ...newProp, description: e.target.value })} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all" rows="3" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20 cursor-pointer">
          <Plus size={18} /> Save & Publish Property
        </button>
      </form>

      {/* Properties Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">Listed Properties ({properties.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Property</th>
                <th className="p-4">Share Breakdown</th>
                <th className="p-4">Available Units</th>
                <th className="p-4">Facilities</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400 font-medium">No properties listed yet.</td>
                </tr>
              ) : (
                properties.map(p => (
                  <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-slate-900 flex items-center gap-3">
                      {p.images && p.images[0] ? (
                        <img src={p.images[0]} alt={p.title} className="w-12 h-12 object-cover rounded-xl border border-slate-200" />
                      ) : (
                        <div className="w-12 h-12 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400"><Building2 size={20} /></div>
                      )}
                      <div>
                        <div className="font-bold text-slate-900">{p.title}</div>
                        <div className="text-[11px] text-emerald-600 font-mono font-bold mt-0.5">{p.price}</div>
                        {p.location && <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5"><MapPin size={10} />{p.location}</div>}
                      </div>
                    </td>
                    <td className="p-4 font-mono">
                      <span className="text-indigo-600 font-bold">{p.availableShares ?? p.totalShares}</span> / {p.totalShares} Shares
                      <div className="text-[10px] text-slate-500 font-sans mt-0.5">৳{p.sharePrice}/share</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {p.availableUnits?.map((u, i) => (
                          <span key={i} className="bg-slate-100 text-[10px] px-2 py-0.5 rounded-md text-slate-700 border border-slate-200 font-medium">
                            {u.unitName}: {u.sqft} sqft
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-[10px]">
                      <div className="flex flex-wrap gap-1">
                        {p.passengerLift > 0 && <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-md font-semibold">{p.passengerLift} Pass Lift</span>}
                        {p.cargoLift > 0 && <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-md font-semibold">{p.cargoLift} Cargo Lift</span>}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => deleteProperty(p._id)} className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all cursor-pointer">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}