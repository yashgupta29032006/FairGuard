import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavBar = () => {
    const navItems = [
        { path: '/', label: 'Dashboard', icon: 'dashboard' },
        { path: '/upload', label: 'Data Upload', icon: 'cloud_upload' },
        { path: '/analysis', label: 'Bias Analysis', icon: 'analytics' },
        { path: '/firewall', label: 'Decision Firewall', icon: 'gpp_maybe' },
        { path: '/training', label: 'Model Training', icon: 'model_training' },
        { path: '/explainability', label: 'Explainability', icon: 'psychology' }
    ];

    return (
        <nav className="h-screen w-64 fixed left-0 top-0 bg-[#001d31] flex flex-col py-6 border-r border-white/5 z-50">
            <div className="px-6 mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>shield</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white font-headline">FairGuard AI</h1>
                        <p className="text-[10px] font-label uppercase tracking-[0.2em] text-blue-300 opacity-60">The Arbiter</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-1 px-4">
                {navItems.map((item) => (
                    <NavLink 
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ease-in-out group ${
                            isActive 
                            ? 'text-white font-bold bg-white/10 shadow-sm' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`material-symbols-outlined mr-3 transition-colors ${isActive ? 'text-blue-400' : 'group-hover:text-blue-300'}`}>{item.icon}</span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
            <div className="px-6 mt-auto">
                <div className="flex items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3 border-2 border-primary/30">
                        <img alt="User Profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMCTXC963X38Q1pqCIMsDzBxD38qb6kvHA5aT3eKUxZkwuJUXHO49VotOWcnsUKXqYL59KN-jSwli6bT3mbK9isrYigFpLZ_T2-jAxntiFsCQx9rK78fHNoGQKP-gRUoU6TEyXEpvgfwV8gq5zhFPLGt18DFCBpRaKe5XPS56so7N-LB7EkEHmtIchknTNglrkN5hi7K_4zaOdsQ-HTUrFIduurHo8fhooxXmcH8lQ8SgUZTNwp1hVLUkrLb33HnpSE77I2ex34mo"/>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">Alex Rivera</p>
                        <p className="text-[10px] text-blue-300 opacity-60 uppercase tracking-widest truncate">Administrator</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SideNavBar;
