import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom' // বা আপনার ব্যবহৃত সঠিক রাউটার প্যাকেজ
import router from './routes/Routes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import SettingsProvider from './context/SettingsContext.jsx'
import { AgentProvider } from './context/AgentContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ১. আপনার তৈরি করা AuthProvider টি সঠিক পাথ থেকে ইম্পোর্ট করুন
 // পাথটি আপনার প্রজেক্ট অনুযায়ী চেক করে নিন


// 1. QueryClient এর একটি ইনস্ট্যান্স তৈরি করুন
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // প্রয়োজন অনুযায়ী কনফিগার করতে পারেন
      retry: 1,
    },
  },
});


createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AgentProvider>
    
    <SettingsProvider>
      
      <RouterProvider router={router} />
    
    </SettingsProvider>
    
    </AgentProvider>
    </AuthProvider>
    </QueryClientProvider>
  ,
)