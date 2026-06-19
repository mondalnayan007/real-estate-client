// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';

// // Public User View Route Imports
// import LandingPage from './views/LandingPage';
// import UserLogin from './views/UserLogin';
// import UserSignup from './views/UserSignup';

// // Admin System View Route Imports
// import AdminLogin from './views/AdminLogin';
// import Dashboard from './views/Dashboard';

// // Guard Layer Route Interceptors
// import AdminRoute from './routes/AdminRoute';

// export default function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Frontend Interfaces */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<UserLogin />} />
//           <Route path="/signup" element={<UserSignup />} />

//           {/* Secure Administrative Backoffice Terminal Routes */}
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route 
//             path="/admin/dashboard" 
//             element={
//               <AdminRoute>
//                 <Dashboard />
//               </AdminRoute>
//             } 
//           />

//           {/* Fallback Catch-All Route Optimization */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }