import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <div className="fab fab-flower">

                <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-primary relative bottom-10 right-10">F</div>

                {/* buttons that show up when FAB is open */}
                <button className="btn btn-lg btn-circle">A</button>
                <button className="btn btn-lg btn-circle">B</button>
                <button className="btn btn-lg btn-circle">C</button>
                <button className="btn btn-lg btn-circle">D</button>
            </div>
        </div>
    );
};

export default Root;