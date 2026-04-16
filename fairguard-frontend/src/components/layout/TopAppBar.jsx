import React from 'react';

const TopAppBar = ({ title, showSearch = true, badge = null }) => {
    return (
        <header className="flex justify-between items-center h-20 ml-64 px-10 w-[calc(100%-16rem)] sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-40 border-b border-slate-100">
            <div className="flex items-center gap-4">
                {title ? (
                    <h2 className="font-headline text-xl font-extrabold text-[#191c1e] tracking-tight">{title}</h2>
                ) : (
                    <div className="flex flex-col">
                        <span className="text-slate-400 font-label uppercase tracking-widest text-[9px] font-bold">System Status</span>
                        <span className="text-emerald-500 text-[11px] font-bold flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            All Nodes Operational
                        </span>
                    </div>
                )}
                {badge && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ml-2">{badge}</span>
                )}
                {showSearch && (
                    <div className="relative ml-8">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                        <input className="pl-12 pr-6 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm w-80 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none transition-all" placeholder="Search parameters..." type="text"/>
                    </div>
                )}
            </div>
            <div className="flex items-center space-x-3">
                <button className="h-10 w-10 flex items-center justify-center rounded-xl text-slate-700 hover:text-primary hover:bg-slate-50 transition-all active:scale-90">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="h-10 w-10 flex items-center justify-center rounded-xl text-slate-700 hover:text-primary hover:bg-slate-50 transition-all active:scale-90">
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
                <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-all active:scale-90 shadow-sm border border-primary/10">
                    <span className="material-symbols-outlined">shield</span>
                </button>
            </div>
        </header>
    );
};

export default TopAppBar;
