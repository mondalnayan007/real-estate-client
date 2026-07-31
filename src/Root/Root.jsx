import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import ContactFab from '../components/ContactFab';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
           <ContactFab></ContactFab>
        </div>
    );
};

export default Root;