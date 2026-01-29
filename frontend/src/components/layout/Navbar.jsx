import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
    return (
        <header className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-40 px-6">
            <div className="flex-none lg:hidden">
                <button className="btn btn-square btn-ghost" onClick={toggleSidebar}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1">
                {/* Search Bar */}
                <div className="form-control w-full max-w-md hidden md:block">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors" />
                        <input type="text" placeholder="Search markets, crops, or reports..." className="input input-bordered w-full pl-10 h-10 bg-base-200/50 focus:bg-base-100 focus:w-full transition-all" />
                    </div>
                </div>
            </div>

            <div className="flex-none gap-4">
                {/* Notifications */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <Bell className="w-5 h-5" />
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                            <h3 className="font-bold text-lg">Notifications</h3>
                            <div className="text-xs text-base-content/60">No new alerts for Chennai Mandi.</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
