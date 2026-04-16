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
        <nav className="h-screen w-64 fixed left-0 top-0 bg-slate-50 dark:bg-slate-900 flex flex-col py-6 border-r border-slate-200 dark:border-slate-800 z-50">
            <div className="px-6 mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>shield</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-blue-900 dark:text-blue-100 font-headline">FairGuard AI</h1>
                        <p className="text-xs font-label uppercase tracking-widest text-slate-500">The Arbiter</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-1 px-4">
                {navItems.map((item) => (
                    <NavLink 
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `flex items-center px-4 py-3 rounded-xl transition-all duration-150 ease-in-out ${
                            isActive 
                            ? 'text-blue-800 dark:text-blue-300 font-bold border-r-4 border-blue-800 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10' 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        }`}
                    >
                        <span className="material-symbols-outlined mr-3">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </div>
            <div className="px-6 mt-auto">
                <div className="flex items-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                        <img alt="User Profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMCTXC963X38Q1pqCIMsDzBxD38qb6kvHA5aT3eKUxZkwuJUXHO49VotOWcnsUKXqYL59KN-jSwli6bT3mbK9isrYigFpLZ_T2-jAxntiFsCQx9rK78fHNoGQKP-gRUoU6TEyXEpvgfwV8gq5zhFPLGt18DFCBpRaKe5XPS56so7N-LB7EkEHmtIchknTNglrkN5hi7K_4zaOdsQ-HTUrFIduurHo8fhooxXmcH8lQ8SgUZTNwp1hVLUkrLb33HnpSE77I2ex34mo"/>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-on-surface truncate">Alex Rivera</p>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider truncate">Administrator</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SideNavBar;
