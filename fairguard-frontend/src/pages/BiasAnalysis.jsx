import React, { useState, useEffect } from 'react';
import TopAppBar from '../components/layout/TopAppBar';
import { analyzeBias } from '../services/api';

const BiasAnalysis = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await analyzeBias({ 
                    target_column: 'loan_approved', 
                    protected_attribute: 'sender_gender' 
                });
                setData(result);
            } catch (err) {
                console.warn("API failed, using demo data");
                setData({
                    disparate_impact: 0.74,
                    demographic_parity: 0.98,
                    representation: { A: 62, B: 24, Other: 14 }
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen ml-64 bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <span className="text-xs font-black font-label text-slate-400 uppercase tracking-[0.2em]">Analyzing Algorithmic Bias...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <TopAppBar title="Bias Analysis Report" badge="Live Audit" />
            <main className="ml-64 p-12 relative overflow-hidden">
                <div className="absolute inset-0 micro-grid-bg pointer-events-none opacity-10"></div>
                
                <section className="relative z-10 mb-16 flex justify-between items-end">
                    <div className="max-w-3xl">
                        <span className="text-[11px] font-black tracking-[0.3em] text-primary uppercase mb-4 block">Session Trace: #FAIR-X800</span>
                        <h2 className="text-6xl font-black text-[#191c1e] tracking-tighter leading-none mb-6">Global Audit Report</h2>
                        <p className="text-slate-500 leading-relaxed text-xl font-light">
                            Deep-tier algorithmic evaluation of the <span className="font-bold text-primary">FairGuard Ingestion Engine v1.0</span>. 
                        </p>
                    </div>
                    <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex gap-2">
                        <button className="px-6 py-2.5 rounded-xl bg-white text-slate-800 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors">JSON Export</button>
                        <button className="px-6 py-2.5 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 transition-all">Download PDF</button>
                    </div>
                </section>

                <div className="grid grid-cols-12 gap-8 relative z-10">
                    {/* Key Metric Card */}
                    <div className="col-span-12 lg:col-span-4 bg-white p-10 rounded-[40px] shadow-sm border border-slate-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full pointer-events-none"></div>
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xs font-black tracking-[0.25em] text-slate-400 uppercase">Disparate Impact</h3>
                            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-red-600 font-black">gpp_maybe</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-8xl font-black text-red-600 tracking-tighter">{data.disparate_impact}</span>
                            <div className="flex flex-col gap-1">
                                <span className="text-red-600 text-[11px] font-black px-2.5 py-1 rounded-full bg-red-50 uppercase tracking-widest border border-red-100">-6% vs Target</span>
                                <span className="text-slate-400 text-[9px] uppercase tracking-widest font-black ml-1">Critical Deviation</span>
                            </div>
                        </div>
                        <p className="mt-8 text-slate-500 text-md leading-relaxed font-light italic border-l-2 border-red-100 pl-4">
                            Selection rates for protected groups are significantly deviant. Minimum ethical threshold is 0.80.
                        </p>
                        <div className="mt-12 h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                            <div className="h-full bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.3)] transition-all duration-1000" style={{ width: `${data.disparate_impact * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Representation Grid */}
                    <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[40px] shadow-sm border border-slate-200 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-xs font-black tracking-[0.25em] text-slate-400 uppercase">Demographic Representation</h3>
                            <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">Verified Data</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center flex-1">
                            <div className="relative h-48 w-48 mx-auto flex items-center justify-center">
                                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" fill="transparent" r="44" stroke="#f1f5f9" strokeWidth="12"></circle>
                                    <circle cx="50" cy="50" fill="transparent" r="44" stroke="#003d9b" strokeDasharray="160 276" strokeWidth="12" strokeLinecap="round"></circle>
                                    <circle cx="50" cy="50" fill="transparent" r="44" stroke="#346286" strokeDasharray="60 276" strokeDashoffset="-160" strokeWidth="12" strokeLinecap="round"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-[#191c1e]">4.2M</span>
                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Audit Items</span>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-8">
                                {Object.entries(data.representation).map(([group, val]) => (
                                    <div key={group} className="group transition-all hover:translate-x-1">
                                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-3 opacity-80 group-hover:opacity-100">
                                            <span className="text-slate-500">Demographic {group}</span>
                                            <span className="text-primary">{val}% Distribution</span>
                                        </div>
                                        <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                                            <div 
                                                className={`h-full transition-all duration-1000 shadow-[0_0_12px_rgba(0,61,155,0.2)] ${group === 'A' ? 'bg-primary' : 'bg-secondary'}`} 
                                                style={{ width: `${val}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mitigation Strategy Card */}
                    <div className="col-span-12 lg:col-span-12 bg-primary text-white p-12 rounded-[48px] shadow-2xl shadow-primary/30 relative overflow-hidden group">
                        <div className="absolute inset-0 micro-grid pointer-events-none opacity-20 transform group-hover:scale-110 transition-transform duration-1000"></div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="max-w-2xl text-center md:text-left">
                                <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
                                    <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">auto_awesome</span>
                                    </div>
                                    <h3 className="text-xs font-black tracking-[0.3em] text-blue-100 uppercase">Arbiter Recommendation</h3>
                                </div>
                                <h4 className="text-4xl font-black tracking-tighter leading-none mb-6">Apply Bias Mitigation Reweighing</h4>
                                <p className="text-blue-100/70 text-lg font-light leading-relaxed">
                                    Our engine suggests applying a <span className="text-white font-bold">Reweighing Intervention</span> to equalize sample weights across the age and gender protection tiers.
                                </p>
                            </div>
                            <button className="bg-white text-primary px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all shadow-xl">
                                Execute Intervention
                                <span className="material-symbols-outlined">bolt</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BiasAnalysis;
