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
                
                <section className="relative z-10 mb-12 flex justify-between items-end">
                    <div className="max-w-2xl">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-blue-800 uppercase mb-2 block">Audit Session: #FAIR-2904</span>
                        <h2 className="text-5xl font-extrabold text-[#191c1e] tracking-tight leading-tight">Bias Analysis Report</h2>
                        <p className="mt-4 text-slate-500 leading-relaxed text-lg font-light">
                            Deep-tier algorithmic evaluation of the <span className="font-semibold text-primary">Global Credit Scoring Engine v4.2</span>. 
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-surface-container-high text-slate-800 px-6 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-slate-200 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                            Export PDF
                        </button>
                        <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all">
                            <span className="material-symbols-outlined text-[20px]">refresh</span>
                            Rerun Analysis
                        </button>
                    </div>
                </section>

                <div className="grid grid-cols-12 gap-8 relative z-10">
                    {/* Key Metric Card */}
                    <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-xl shadow-sm border border-outline-variant/10 group">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase">Metric: Disparate Impact</h3>
                            <span className="material-symbols-outlined text-tertiary">warning</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-7xl font-extrabold text-tertiary tracking-tighter">{data.disparate_impact}</span>
                            <span className="text-tertiary text-sm font-semibold px-2 py-0.5 rounded bg-tertiary/10">-6% vs Target</span>
                        </div>
                        <p className="mt-6 text-slate-500 text-sm leading-relaxed">
                            Selection rates for protected groups are significantly deviant. Threshold is 0.80.
                        </p>
                        <div className="mt-10 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-tertiary rounded-full transition-all duration-1000" style={{ width: `${data.disparate_impact * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Representation Grid */}
                    <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col justify-between">
                        <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-6">Demographic Representation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center flex-1">
                            <div className="relative h-40 w-40 mx-auto flex items-center justify-center">
                                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#f2f4f6" strokeWidth="12"></circle>
                                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#003d9b" strokeDasharray="160 251" strokeWidth="12" strokeLinecap="round"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-[#191c1e]">4.2M</span>
                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Total Data</span>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                {Object.entries(data.representation).map(([group, val]) => (
                                    <div key={group}>
                                        <div className="flex justify-between text-xs font-bold mb-2">
                                            <span className="text-slate-500 uppercase tracking-widest">Demographic {group}</span>
                                            <span className="text-primary">{val}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-1000 ${group === 'A' ? 'bg-primary' : 'bg-secondary'}`} 
                                                style={{ width: `${val}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mitigation Strategy Card */}
                    <div className="col-span-12 lg:col-span-12 bg-tertiary text-white p-8 rounded-xl shadow-2xl shadow-tertiary/30 relative overflow-hidden group">
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="max-w-xl">
                                <h3 className="text-xs font-bold tracking-widest text-white/70 uppercase mb-4">Urgent Action Required</h3>
                                <p className="text-3xl font-bold leading-tight mb-4">Bias Mitigation Strategy Suggested</p>
                                <p className="text-white/80 font-light leading-relaxed">
                                    Apply a <span className="text-white font-bold underline decoration-white/30 underline-offset-4">Reweighing Intervention</span> to equalize sample weights across the age and gender protection tiers.
                                </p>
                            </div>
                            <button className="bg-white text-tertiary px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-white/90 active:scale-95 transition-all shadow-xl">
                                Apply Mitigation Strategy
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BiasAnalysis;
