import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Menu } from 'lucide-react';

/* 
  MainLayout:
  - Sidebar on Left (Fixed)
  - Navbar on Top (Sticky)
  - Content on Right (Scrollable)
*/
const MainLayout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-base-200 font-sans text-base-content">

            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Drawer Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div className="w-64 h-full bg-base-100 shadow-2xl animate-in slide-in-from-left duration-200">
                        <Sidebar />
                        {/* Note: In a real app, Sidebar accepts props to handle close/context, passing simple for demo */}
                    </div>
                    <div className="flex-1 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)}></div>
                </div>
            )}

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar toggleSidebar={() => setMobileOpen(true)} />

                <main className="flex-1 p-6 lg:p-8 animate-in fade-in zoom-in duration-300">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                <footer className="footer footer-center p-4 bg-base-100 text-base-content/50 border-t border-base-300">
                    <aside>
                        <p>Copyright © 2026 - AgriPrime Enterprise Solutions Pvt Ltd.</p>
                    </aside>
                </footer>
            </div>
        </div>
    );
};

export default MainLayout;
