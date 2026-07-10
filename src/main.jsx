import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom' // বা আপনার ব্যবহৃত সঠিক রাউটার প্যাকেজ
import router from './routes/Routes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import SettingsProvider from './context/SettingsContext.jsx'

// ১. আপনার তৈরি করা AuthProvider টি সঠিক পাথ থেকে ইম্পোর্ট করুন
 // পাথটি আপনার প্রজেক্ট অনুযায়ী চেক করে নিন

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </SettingsProvider>
    
  </StrictMode>,
)