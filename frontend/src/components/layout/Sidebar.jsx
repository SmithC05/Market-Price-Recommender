import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sprout, CloudRain, Coins, LayoutDashboard, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-base-100 border-r border-base-300 h-screen flex-col hidden lg:flex sticky top-0">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3 border-b border-base-300 bg-base-100/50 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                    <Sprout className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="font-bold text-xl tracking-tight text-base-content">AgriPrime</h1>
                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">Enterprise</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <div className="text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2 px-2 mt-4">Core Modules</div>

                <NavLink to="/plan" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary text-primary-content shadow-md shadow-primary/20' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}>
                    <LayoutDashboard className="w-5 h-5" />
                    Plan Advisor
                </NavLink>

                <NavLink to="/grow" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary text-primary-content shadow-md shadow-primary/20' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}>
                    <CloudRain className="w-5 h-5" />
                    Growth Monitor
                </NavLink>

                <NavLink to="/sell" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary text-primary-content shadow-md shadow-primary/20' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}>
                    <Coins className="w-5 h-5" />
                    Price Intelligence
                </NavLink>

                <div className="divider my-4"></div>

                <div className="text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2 px-2">Settings</div>
                <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-base-content/70 hover:bg-base-200 transition-all font-medium">
                    <Settings className="w-5 h-5" />
                    Configuration
                </button>
            </nav>

            {/* User Profile (Footer of Sidebar) */}
            <div className="p-4 border-t border-base-300">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-base-200 hover:bg-base-300 cursor-pointer transition-colors">
                    <div className="avatar online">
                        <div className="w-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                            <span className="text-sm font-bold">FM</span>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">Farmer Michael</p>
                        <p className="text-xs text-base-content/60 truncate">Pro Account</p>
                    </div>
                    <LogOut className="w-4 h-4 text-base-content/50" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
