import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';

const Dashboard = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen">
            <TopAppBar />
            <main className="ml-64 p-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Header Section */}
                    <div className="flex justify-between items-end mb-16">
                        <div className="space-y-3">
                            <h2 className="text-5xl font-extrabold font-headline tracking-tight text-primary leading-tight">
                                FairGuard Dashboard
                            </h2>
                            <p className="text-on-surface-variant text-xl font-light max-w-2xl">
                                Central command for <span className="text-primary font-semibold">algorithmic integrity</span> and model auditing.
                            </p>
                        </div>
                        <div className="flex space-x-4 mb-2">
                            <button className="bg-white text-slate-800 px-8 py-3.5 rounded-xl font-bold font-label hover:bg-slate-50 transition-all active:scale-95 shadow-sm border border-slate-200">
                                System Report
                            </button>
                            <button 
                                onClick={() => navigate('/upload')} 
                                className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-3.5 rounded-xl font-bold font-label shadow-xl shadow-primary/30 hover:brightness-110 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">add</span>
                                New Audit
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                        {/* Fairness status card */}
                        <div className="col-span-12 lg:col-span-7 bg-white p-10 rounded-[32px] micro-grid relative overflow-hidden group border border-slate-200 shadow-sm">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-10">
                                    <h3 className="text-xs font-black font-label uppercase tracking-[0.25em] text-slate-400">AI Fairness Status</h3>
                                    <span className="bg-emerald-50 text-[#00875A] px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest border border-emerald-100 uppercase">Compliant</span>
                                </div>
                                <div className="flex items-center space-x-16 flex-1">
                                    <div className="relative h-56 w-56 flex items-center justify-center">
                                        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 200 200">
                                            <circle className="text-slate-100" cx="100" cy="100" fill="transparent" r="88" stroke="currentColor" strokeWidth="14"></circle>
                                            <circle className="text-primary" cx="100" cy="100" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="44.23" strokeWidth="14" strokeLinecap="round"></circle>
                                        </svg>
                                        <div className="absolute text-center">
                                            <span className="block text-6xl font-black font-headline text-[#191c1e]">92<span className="text-3xl font-bold text-slate-300 ml-1">%</span></span>
                                            <span className="text-[11px] font-black font-label uppercase tracking-[0.2em] text-slate-400 mt-1 block">Integrity</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-6">
                                        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                            <div className="flex justify-between text-[11px] font-black font-label text-slate-400 uppercase tracking-widest mb-3">
                                                <span>Demographic Parity</span>
                                                <span className="text-primary font-black">0.98</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full w-[98%] rounded-full shadow-[0_0_12px_rgba(0,61,155,0.3)]"></div>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                            <div className="flex justify-between text-[11px] font-black font-label text-slate-400 uppercase tracking-widest mb-3">
                                                <span>Equal Opportunity</span>
                                                <span className="text-primary font-black">0.89</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full w-[89%] rounded-full shadow-[0_0_12px_rgba(0,61,155,0.3)]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* System Health Card */}
                        <div className="col-span-12 lg:col-span-5 bg-slate-50/50 p-10 rounded-[32px] flex flex-col justify-between border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full -mr-24 -mt-24 pointer-events-none"></div>
                            <div>
                                <h3 className="text-xs font-black font-label uppercase tracking-[0.25em] text-slate-400 mb-8">System Health</h3>
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center">
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 mr-4 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                            <span className="text-md font-bold text-[#191c1e]">Active Firewall</span>
                                        </div>
                                        <span className="text-[11px] font-black font-label text-slate-400 uppercase tracking-widest">Uptime: 99.9%</span>
                                    </div>
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center">
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 mr-4 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                            <span className="text-md font-bold text-[#191c1e]">Bias Monitor</span>
                                        </div>
                                        <span className="text-[11px] font-black font-label text-slate-400 uppercase tracking-widest">Sync: 2ms ago</span>
                                    </div>
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center">
                                            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 mr-4 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span>
                                            <span className="text-md font-bold text-[#191c1e]">Neural Processing</span>
                                        </div>
                                        <span className="text-[11px] font-black font-label text-slate-400 uppercase tracking-widest">Load: 72%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 pt-8 border-t border-slate-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Database integrity verified</span>
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick links grid */}
                        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { to: '/upload', icon: 'cloud_upload', label: 'Upload Dataset', sub: 'Ingest CSV/JSON' },
                                { to: '/analysis', icon: 'analytics', label: 'Analyze Bias', sub: 'Run Fairness Audit' },
                                { to: '/firewall', icon: 'rocket_launch', label: 'Run Prediction', sub: 'Live Inference' },
                                { to: '/explainability', icon: 'psychology', label: 'Explainability', sub: 'Shapley Values' }
                            ].map((item) => (
                                <Link key={item.to} to={item.to} className="group flex flex-col items-center justify-center p-10 bg-white rounded-3xl hover:bg-slate-50 transition-all border border-slate-200 hover:border-primary shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                                        <span className="material-symbols-outlined text-3xl transition-transform">{item.icon}</span>
                                    </div>
                                    <span className="font-extrabold font-headline text-slate-800 text-lg">{item.label}</span>
                                    <span className="text-[10px] font-black font-label uppercase tracking-[0.2em] text-slate-400 mt-2">{item.sub}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Activity & AI card grid */}
                        <div className="col-span-12 lg:col-span-8 bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm flex flex-col">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xs font-black font-label uppercase tracking-[0.25em] text-slate-400">Recent Activity</h3>
                                <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors">View All</button>
                            </div>
                            <div className="divide-y divide-slate-50 flex-1">
                                <div className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center space-x-6">
                                        <div className="bg-blue-50 h-14 w-14 flex items-center justify-center rounded-2xl">
                                            <span className="material-symbols-outlined text-blue-800 text-2xl">history_edu</span>
                                        </div>
                                        <div>
                                            <p className="text-md font-extrabold text-[#191c1e]">Bias Audit Completed: 'Loan_Approval_V4'</p>
                                            <p className="text-sm text-slate-500 font-light mt-1">Model sensitivity adjusted for age-protected attributes.</p>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-black font-label text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">14m ago</span>
                                </div>
                                <div className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center space-x-6">
                                        <div className="bg-red-50 h-14 w-14 flex items-center justify-center rounded-2xl">
                                            <span className="material-symbols-outlined text-tertiary text-2xl">warning</span>
                                        </div>
                                        <div>
                                            <p className="text-md font-extrabold text-[#191c1e]">Intervention: Decision Firewall triggered</p>
                                            <p className="text-sm text-slate-500 font-light mt-1">Flagged 23 outlier predictions in 'Hiring_Pipeline'.</p>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-black font-label text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">2h ago</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-4 bg-primary text-white p-10 rounded-[32px] relative overflow-hidden shadow-2xl shadow-primary/20">
                            <div className="absolute inset-0 opacity-10 micro-grid pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="bg-white/10 h-16 w-16 flex items-center justify-center rounded-2xl mb-8 backdrop-blur-md border border-white/20">
                                        <span className="material-symbols-outlined text-4xl">lightbulb</span>
                                    </div>
                                    <h4 className="text-3xl font-black font-headline mb-6 tracking-tight leading-none">Arbiter Intelligence</h4>
                                    <p className="text-blue-100/80 text-lg leading-relaxed font-light">
                                        Our analysis suggests that the <span className="text-white font-bold">Loan_Approval_V4</span> model shows a <span className="text-amber-300 font-bold">3.4% variance</span> in approval rates for rural demographics. 
                                        <br/><br/>
                                        Applying a <strong>Synthetic Minority Over-sampling</strong> technique (SMOTE) is recommended.
                                    </p>
                                </div>
                                <button className="mt-12 bg-white text-primary py-4 rounded-2xl font-black text-[13px] uppercase tracking-[0.2em] shadow-xl hover:bg-blue-50 transition-all active:scale-95">
                                    Apply Strategy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
