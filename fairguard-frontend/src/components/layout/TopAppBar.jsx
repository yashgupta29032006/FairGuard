import React from 'react';

const TopAppBar = ({ title, showSearch = true, badge = null }) => {
    return (
        <header className="flex justify-between items-center h-16 ml-64 px-8 w-[calc(100%-16rem)] sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-40 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-4">
                {title ? (
                    <h2 className="font-headline text-lg font-bold text-on-surface">{title}</h2>
                ) : (
                    <span className="text-slate-400 font-label uppercase tracking-widest text-[10px]">System Node: Primary</span>
                )}
                {badge && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">{badge}</span>
                )}
                {showSearch && (
                    <div className="relative ml-4">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input className="pl-10 pr-4 py-1.5 bg-surface-container-high border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-primary outline-none" placeholder="Search parameters..." type="text"/>
                    </div>
                )}
            </div>
            <div className="flex items-center space-x-6">
                <button className="text-slate-600 hover:text-blue-700 transition-transform scale-95 active:scale-90">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="text-slate-600 hover:text-blue-700 transition-transform scale-95 active:scale-90">
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <button className="text-slate-600 hover:text-blue-700 transition-transform scale-95 active:scale-90">
                    <span className="material-symbols-outlined">shield</span>
                </button>
            </div>
        </header>
    );
};

export default TopAppBar;
