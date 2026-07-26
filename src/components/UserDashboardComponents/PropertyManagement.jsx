import React, { use, useEffect, useState } from 'react';
import { Plus, Trash2, Check, Image, Layers, Building2, FileText } from 'lucide-react';
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
      alert("Property Added Successfully!");

    } catch (error) {
      console.error("Error creating property:", error);
      alert("Something went wrong!");
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

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
    <div className="space-y-6 bg-slate-50 p-6 min-h-screen text-slate-800">
      <div>
        <h2 className="text-xl font-black uppercase tracking-wider flex items-center gap-2 text-slate-900">
          <Building2 className="text-blue-600" /> Property Management Console
        </h2>
        <p className="text-xs text-slate-500">Configure building specifications, share ownership structure, and floor units.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6" encType="multipart/form-data">
        
        {/* 1. Basic Info */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase text-blue-600 tracking-wide">1. Basic Info & Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Property Title *" value={newProp.title} onChange={e => setNewProp({ ...newProp, title: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" required />
            <input type="text" placeholder="Total Valuation Price (e.g. ৳2,50,00,000) *" value={newProp.price} onChange={e => setNewProp({ ...newProp, price: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" required />
            <input type="text" placeholder="Location" value={newProp.location} onChange={e => setNewProp({ ...newProp, location: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" />

            <select value={newProp.category} onChange={e => setNewProp({ ...newProp, category: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500">
              {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
            <input type="text" placeholder="Tag (e.g. Luxury, Hot Deal)" value={newProp.tag} onChange={e => setNewProp({ ...newProp, tag: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" />
            
            <select value={newProp.status} onChange={e => setNewProp({ ...newProp, status: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500">
              <option value="completed">Completed</option>
              <option value="under-construction">Under Construction</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        {/* 2. Fractional Share Structure */}
        <div className="space-y-2 bg-blue-50/50 p-4 border border-blue-100 rounded-xl">
          <h3 className="text-xs font-bold uppercase text-blue-700 tracking-wide">2. Fractional Share Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" placeholder="Total Share Count (e.g. 10) *" value={newProp.totalShares} onChange={e => setNewProp({ ...newProp, totalShares: e.target.value })} className="px-3 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" required />
            <input type="number" placeholder="Price Per Share (৳) *" value={newProp.sharePrice} onChange={e => setNewProp({ ...newProp, sharePrice: e.target.value })} className="px-3 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" required />
          </div>
        </div>

        {/* 3. Building Specifications & Features */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase text-blue-600 tracking-wide">3. Building Specifications & Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Building Type (e.g. Residential / Commercial)" value={newProp.buildingType} onChange={e => setNewProp({ ...newProp, buildingType: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Front Road (e.g. 40 Feet Road)" value={newProp.frontRoad} onChange={e => setNewProp({ ...newProp, frontRoad: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" />
            <input type="number" placeholder="Unit Per Floor (e.g. 4)" value={newProp.unitPerFloor} onChange={e => setNewProp({ ...newProp, unitPerFloor: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" />
          </div>

          {/* Lifts (Number Inputs) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <input type="number" placeholder="Passenger Lift Count (e.g. 2)" value={newProp.passengerLift} onChange={e => setNewProp({ ...newProp, passengerLift: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" />
            <input type="number" placeholder="Cargo Lift Count (e.g. 1)" value={newProp.cargoLift} onChange={e => setNewProp({ ...newProp, cargoLift: e.target.value })} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" />
          </div>

          {/* Features Checkboxes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { id: 'electricityBackup', label: 'Electricity Backup' },
              { id: 'rooftopGardening', label: 'Rooftop Gardening' },
              { id: 'carParking', label: 'Car Parking' },
              { id: 'conventionHall', label: 'Convention Hall' },
            ].map(item => (
              <label key={item.id} className="flex items-center gap-2 bg-slate-50 p-2.5 border border-slate-200 rounded-xl cursor-pointer text-xs text-slate-700 select-none hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={newProp[item.id]}
                  onChange={e => setNewProp({ ...newProp, [item.id]: e.target.checked })}
                  className="rounded bg-white border-slate-300 text-blue-600 focus:ring-0"
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        {/* 4. Available Units Dynamic Breakdown */}
        <div className="space-y-3 bg-slate-50 p-4 border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase text-emerald-700 tracking-wide flex items-center gap-1.5">
              <Layers size={14} /> Available Units Breakdown
            </h3>
            <button type="button" onClick={addUnitField} className="text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-lg hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1 font-semibold">
              <Plus size={12} /> Add Unit
            </button>
          </div>

          {units.map((unit, index) => (
            <div key={index} className="grid grid-cols-2 md:grid-cols-6 gap-3 p-3 bg-white border border-slate-200 rounded-xl items-center shadow-sm">
              <input type="text" placeholder="Unit Name" value={unit.unitName} onChange={e => handleUnitChange(index, 'unitName', e.target.value)} className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
              <input type="number" placeholder="Sqft (e.g. 1450)" value={unit.sqft} onChange={e => handleUnitChange(index, 'sqft', e.target.value)} className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
              <input type="number" placeholder="Beds" value={unit.beds} onChange={e => handleUnitChange(index, 'beds', e.target.value)} className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              <input type="number" placeholder="Baths" value={unit.baths} onChange={e => handleUnitChange(index, 'baths', e.target.value)} className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              <input type="number" placeholder="Balconies" value={unit.balconies} onChange={e => handleUnitChange(index, 'balconies', e.target.value)} className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                  <input type="checkbox" checked={unit.isAvailable} onChange={e => handleUnitChange(index, 'isAvailable', e.target.checked)} />
                  Available
                </label>
                {units.length > 1 && (
                  <button type="button" onClick={() => removeUnitField(index)} className="text-rose-500 hover:text-rose-700 p-1">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 5. Media & Brochure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <label className="block text-[10px] text-slate-600 uppercase font-bold flex items-center gap-1"><Image size={12} /> Upload Property Images</label>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full text-xs text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
            {selectedImages.length > 0 && <p className="text-[10px] text-emerald-600 font-semibold">{selectedImages.length} image(s) attached.</p>}
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <label className="block text-[10px] text-slate-600 uppercase font-bold flex items-center gap-1"><FileText size={12} /> PDF Brochure Link</label>
            <input type="text" placeholder="https://drive.google.com/your-brochure.pdf" value={newProp.brochureLink} onChange={e => setNewProp({ ...newProp, brochureLink: e.target.value })} className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <textarea placeholder="Detailed Project Description Structure..." value={newProp.description} onChange={e => setNewProp({ ...newProp, description: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500" rows="2" />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
          <Plus size={16} /> Save & Publish Listing
        </button>
      </form>

      {/* Properties Table (Light Mode) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-100 text-[10px] font-bold text-slate-600 uppercase border-b border-slate-200">
            <tr>
              <th className="p-4">Title / Price</th>
              <th className="p-4">Shares Breakdown</th>
              <th className="p-4">Units Config</th>
              <th className="p-4">Lifts & Facilities</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {properties.map(p => (
              <tr key={p._id} className="hover:bg-slate-50/80">
                <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                  {p.images && p.images[0] && <img src={p.images[0]} alt={p.title} className="w-10 h-10 object-cover rounded-lg border border-slate-200" />}
                  <div>
                    {p.title}
                    <div className="text-[10px] font-mono text-emerald-600 font-semibold mt-0.5">{p.price}</div>
                  </div>
                </td>
                <td className="p-4 font-mono text-[11px]">
                  <span className="text-blue-600 font-bold">{p.availableShares ?? p.totalShares}</span> / {p.totalShares} Shares
                  <div className="text-[10px] text-slate-400">৳{p.sharePrice}/share</div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {p.availableUnits?.map((u, i) => (
                      <span key={i} className="bg-slate-100 text-[10px] px-2 py-0.5 rounded text-slate-600 border border-slate-200 font-medium">
                        {u.unitName}: {u.sqft} sqft
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-[10px]">
                  {p.passengerLift > 0 && <span className="bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded mr-1 font-semibold">{p.passengerLift} Passenger Lift</span>}
                  {p.cargoLift > 0 && <span className="bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded mr-1 font-semibold">{p.cargoLift} Cargo Lift</span>}
                </td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => deleteProperty(p._id)} className="bg-slate-100 p-2 rounded-lg text-rose-600 hover:bg-rose-600 hover:text-white transition-colors">
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}