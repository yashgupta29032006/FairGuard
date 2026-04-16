import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';

const Dashboard = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen">
            <TopAppBar />
            <main className="ml-64 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-extrabold font-headline tracking-tight text-primary">FairGuard – AI Bias Detection & Prevention</h2>
                            <p className="text-on-surface-variant mt-2 text-lg">Central command for algorithmic integrity and model auditing.</p>
                        </div>
                        <div className="flex space-x-4">
                            <button className="bg-surface-container-high text-on-secondary-container px-6 py-3 rounded-md font-semibold font-label hover:bg-surface-container-highest transition-colors">
                                System Report
                            </button>
                            <button onClick={() => navigate('/upload')} className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-md font-semibold font-label shadow-lg hover:brightness-110 transition-all">
                                New Audit
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest p-8 rounded-xl micro-grid relative overflow-hidden group border border-slate-200">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant">AI Fairness Status</h3>
                                    <span className="bg-emerald-100 text-[#00875A] px-3 py-1 rounded-full text-xs font-bold">COMPLIANT</span>
                                </div>
                                <div className="flex items-center space-x-12 flex-1">
                                    <div className="relative h-48 w-48 flex items-center justify-center">
                                        <svg className="transform -rotate-90 w-44 h-44">
                                            <circle className="text-surface-container-high" cx="88" cy="88" fill="transparent" r="80" stroke="currentColor" strokeWidth="12"></circle>
                                            <circle className="text-primary" cx="88" cy="88" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502.6" strokeDashoffset="40" strokeWidth="12"></circle>
                                        </svg>
                                        <div className="absolute text-center">
                                            <span className="block text-5xl font-extrabold font-headline text-on-surface">92<span className="text-2xl font-normal">%</span></span>
                                            <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Integrity Score</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="p-4 bg-surface-container-low rounded-lg">
                                            <div className="flex justify-between text-xs font-label text-on-surface-variant mb-1">
                                                <span>Demographic Parity</span>
                                                <span className="text-primary font-bold">0.98</span>
                                            </div>
                                            <div className="w-full bg-surface-container-highest h-1.5 rounded-full">
                                                <div className="bg-primary h-full w-[98%] rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-surface-container-low rounded-lg">
                                            <div className="flex justify-between text-xs font-label text-on-surface-variant mb-1">
                                                <span>Equal Opportunity</span>
                                                <span className="text-primary font-bold">0.89</span>
                                            </div>
                                            <div className="w-full bg-surface-container-highest h-1.5 rounded-full">
                                                <div className="bg-primary h-full w-[89%] rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-5 bg-surface-container-low p-8 rounded-xl flex flex-col justify-between border border-slate-200">
                            <div>
                                <h3 className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant mb-6">System Health</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="h-2 w-2 rounded-full bg-[#00875A] mr-3"></span>
                                            <span className="text-sm font-semibold">Active Firewall</span>
                                        </div>
                                        <span className="text-xs font-label text-on-surface-variant">Uptime: 99.9%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="h-2 w-2 rounded-full bg-[#00875A] mr-3"></span>
                                            <span className="text-sm font-semibold">Bias Monitor</span>
                                        </div>
                                        <span className="text-xs font-label text-on-surface-variant">Sync: 2ms ago</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="h-2 w-2 rounded-full bg-amber-400 mr-3"></span>
                                            <span className="text-sm font-semibold">Neural Processing</span>
                                        </div>
                                        <span className="text-xs font-label text-on-surface-variant">Load: 72%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-outline-variant/20">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-label text-on-surface-variant">Database integrity verified</span>
                                    <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Link to="/upload" className="group flex flex-col items-center justify-center p-8 bg-surface-container-lowest rounded-xl hover:bg-surface-bright transition-all border border-slate-200 hover:border-primary">
                                <span className="material-symbols-outlined text-4xl text-primary mb-3 group-hover:scale-110 transition-transform">cloud_upload</span>
                                <span className="font-bold font-headline text-primary">Upload Dataset</span>
                                <span className="text-[10px] font-label uppercase tracking-wider text-slate-400 mt-1">Ingest CSV/JSON</span>
                            </Link>
                            <Link to="/analysis" className="group flex flex-col items-center justify-center p-8 bg-surface-container-lowest rounded-xl hover:bg-surface-bright transition-all border border-slate-200 hover:border-primary">
                                <span className="material-symbols-outlined text-4xl text-primary mb-3 group-hover:scale-110 transition-transform">analytics</span>
                                <span className="font-bold font-headline text-primary">Analyze Bias</span>
                                <span className="text-[10px] font-label uppercase tracking-wider text-slate-400 mt-1">Run Fairness Audit</span>
                            </Link>
                            <Link to="/firewall" className="group flex flex-col items-center justify-center p-8 bg-surface-container-lowest rounded-xl hover:bg-surface-bright transition-all border border-slate-200 hover:border-primary">
                                <span className="material-symbols-outlined text-4xl text-primary mb-3 group-hover:scale-110 transition-transform">rocket_launch</span>
                                <span className="font-bold font-headline text-primary">Run Prediction</span>
                                <span className="text-[10px] font-label uppercase tracking-wider text-slate-400 mt-1">Live Inference</span>
                            </Link>
                            <Link to="/explainability" className="group flex flex-col items-center justify-center p-8 bg-surface-container-lowest rounded-xl hover:bg-surface-bright transition-all border border-slate-200 hover:border-primary">
                                <span className="material-symbols-outlined text-4xl text-primary mb-3 group-hover:scale-110 transition-transform">psychology</span>
                                <span className="font-bold font-headline text-primary">Explainability</span>
                                <span className="text-[10px] font-label uppercase tracking-wider text-slate-400 mt-1">Shapley Values</span>
                            </Link>
                        </div>

                        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-0 overflow-hidden border border-slate-200 shadow-sm">
                            <div className="p-6 border-b border-surface-container">
                                <h3 className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant">Recent Activity</h3>
                            </div>
                            <div className="divide-y divide-surface-container">
                                <div className="p-6 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-blue-50 p-2 rounded-lg">
                                            <span className="material-symbols-outlined text-blue-800">history_edu</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">Bias Audit Completed: 'Loan_Approval_V4'</p>
                                            <p className="text-xs text-on-surface-variant">Model sensitivity adjusted for age-protected attributes.</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-label text-on-surface-variant">14m ago</span>
                                </div>
                                <div className="p-6 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-red-50 p-2 rounded-lg">
                                            <span className="material-symbols-outlined text-tertiary">warning</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">Intervention: Decision Firewall triggered</p>
                                            <p className="text-xs text-on-surface-variant">Flagged 23 outlier predictions in 'Hiring_Pipeline'.</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-label text-on-surface-variant">2h ago</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-4 bg-primary text-white p-8 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 micro-grid"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <span className="material-symbols-outlined text-4xl mb-4">lightbulb</span>
                                    <h4 className="text-2xl font-bold font-headline mb-4">Arbiter Intelligence</h4>
                                    <p className="text-blue-100 text-sm leading-relaxed">
                                        Our analysis suggests that the "Loan_Approval_V4" model shows a 3.4% variance in approval rates for rural demographics. 
                                        <br/><br/>
                                        Applying a <strong>Synthetic Minority Over-sampling</strong> technique (SMOTE) is recommended.
                                    </p>
                                </div>
                                <button className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 py-3 rounded-md font-bold text-sm hover:bg-white/20 transition-colors">
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
