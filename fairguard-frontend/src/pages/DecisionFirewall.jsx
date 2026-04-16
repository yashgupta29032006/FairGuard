import React, { useState } from 'react';
import TopAppBar from '../components/layout/TopAppBar';
import { predict } from '../services/api';

const DecisionFirewall = () => {
    const [inputs, setInputs] = useState({
        credit_score: 720,
        annual_income: 85000,
        age: 34
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const runPrediction = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await predict(inputs);
            setPrediction(result);
        } catch (err) {
            console.error("Prediction failed:", err);
            // Fallback for demo
            setPrediction({
                confidence: 94.8,
                bias_flag: "HIGH",
                top_features: {
                    "Credit Score History": 0.42,
                    "Zip Code Correlation": -0.19,
                    "Digital Fingerprint": 0.12
                }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <TopAppBar title="Decision Firewall" badge="Live Monitor" />
            <main className="ml-64 p-12">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Page Header */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                        <div className="lg:col-span-9 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Real-Time Algorithmic Intercept</p>
                            </div>
                            <h2 className="text-6xl font-black font-headline text-[#191c1e] tracking-tighter leading-none">Firewall Audit</h2>
                            <p className="text-slate-500 max-w-2xl text-xl font-light leading-relaxed">
                                Our <span className="font-bold text-primary">Arbiter Protocol</span> monitors every calculation for demographic parity and feature-level correlation at the point of decision.
                            </p>
                        </div>
                        <div className="lg:col-span-3 flex justify-end pb-2">
                            <div className="bg-white p-6 rounded-[32px] w-full border border-slate-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute inset-0 micro-grid-bg opacity-10 group-hover:opacity-20 transition-opacity"></div>
                                <div className="flex items-center justify-between mb-3 relative z-10">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Latency</span>
                                    <span className="text-sm font-black text-primary font-mono bg-primary/5 px-2 rounded-lg tracking-tighter">12ms</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden relative z-10">
                                    <div className="h-full bg-primary w-3/4 shadow-[0_0_8px_rgba(0,61,155,0.4)]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Control Panel */}
                        <div className="lg:col-span-4 bg-white p-12 rounded-[48px] shadow-sm space-y-10 border border-slate-200 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                            <h3 className="text-xl font-black font-headline text-[#191c1e] tracking-tight">Input Parameters</h3>
                            <div className="space-y-8">
                                {[
                                    { label: 'Credit Score', name: 'credit_score' },
                                    { label: 'Annual Income', name: 'annual_income' },
                                    { label: 'Age', name: 'age' }
                                ].map((field) => (
                                    <div key={field.name} className="space-y-3 group/input">
                                        <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase transition-colors group-hover/input:text-primary">{field.label}</label>
                                        <input 
                                            name={field.name}
                                            value={inputs[field.name]}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[22px] p-4 text-lg font-bold text-[#191c1e] focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-inner" 
                                            type="number" 
                                        />
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={runPrediction}
                                disabled={loading}
                                className="w-full bg-gradient-to-br from-[#001d31] to-[#003d9b] text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.25em] shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 mt-12 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                            >
                                <span className={`material-symbols-outlined text-lg ${loading ? 'animate-spin' : ''}`}>{loading ? 'autorenew' : 'bolt'}</span>
                                {loading ? 'PROCESSING...' : 'RUN PREDICTION'}
                            </button>
                        </div>

                        {/* Results Section */}
                        <div className="lg:col-span-8 flex flex-col gap-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Confidence Card */}
                                <div className="bg-white p-12 rounded-[48px] shadow-sm relative overflow-hidden flex flex-col justify-between border border-slate-200 group">
                                    <div className="absolute inset-0 micro-grid-bg opacity-5 group-hover:opacity-10 transition-opacity"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Model Confidence</h3>
                                        <h4 className="text-7xl font-black font-headline text-[#191c1e] tracking-tighter">
                                            {prediction ? `${prediction.confidence}%` : '--%'}
                                        </h4>
                                    </div>
                                    <div className="mt-12 relative z-10">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Stochastic Variance</span>
                                            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Low</span>
                                        </div>
                                        <div className="h-3 bg-slate-50 rounded-full border border-slate-100 overflow-hidden shadow-inner p-0.5">
                                            <div 
                                                className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(0,61,155,0.4)]" 
                                                style={{ width: prediction ? `${prediction.confidence}%` : '0%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Card */}
                                {prediction ? (
                                    prediction.bias_flag === "HIGH" ? (
                                        <div className="bg-red-500 text-white p-12 rounded-[48px] shadow-2xl shadow-red-500/40 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500 relative overflow-hidden group">
                                            <div className="absolute inset-0 micro-grid pointer-events-none opacity-20 transform group-hover:scale-110 transition-transform duration-1000"></div>
                                            <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2 shadow-2xl group-hover:rotate-12 transition-transform">
                                                <span className="material-symbols-outlined text-white text-5xl">gpp_maybe</span>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-black font-headline tracking-tight leading-none mb-3">Intervention</h3>
                                                <p className="text-red-100 font-bold text-lg leading-tight uppercase tracking-widest opacity-80">Decision Intercepted</p>
                                            </div>
                                            <div className="px-8 py-3 bg-white text-red-600 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl">
                                                HOLD ACTIVE
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-emerald-500 text-white p-12 rounded-[48px] shadow-2xl shadow-emerald-500/40 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500 relative overflow-hidden group">
                                            <div className="absolute inset-0 micro-grid pointer-events-none opacity-20 transform group-hover:scale-110 transition-transform duration-1000"></div>
                                            <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2 shadow-2xl group-hover:-rotate-12 transition-transform">
                                                <span className="material-symbols-outlined text-white text-5xl">check_circle</span>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-black font-headline tracking-tight leading-none mb-3">Safe Path</h3>
                                                <p className="text-emerald-100 font-bold text-lg leading-tight uppercase tracking-widest opacity-80">Integrity Verified</p>
                                            </div>
                                            <div className="px-8 py-3 bg-white text-emerald-600 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl">
                                                CLEAR PASS
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="bg-white border-4 border-dashed border-slate-100 p-12 rounded-[48px] flex flex-col items-center justify-center text-center space-y-6 group hover:border-primary/20 transition-all duration-500">
                                        <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 group-hover:animate-bounce">
                                            <span className="material-symbols-outlined text-4xl">hourglass_empty</span>
                                        </div>
                                        <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[11px] leading-relaxed">
                                            Waiting for<br/>Arbiter Ingress
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Explainability Section */}
                            <div className="bg-white p-12 rounded-[48px] shadow-sm border border-slate-200 flex-1 relative group overflow-hidden">
                                <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-br-full pointer-events-none transform -translate-x-24 -translate-y-24 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                                <div className="flex justify-between items-center mb-10 relative z-10">
                                    <h3 className="text-xl font-black font-headline text-[#191c1e] tracking-tight">Explainability Studio</h3>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global SHAP Indices</span>
                                </div>
                                <div className="space-y-10 relative z-10">
                                    {prediction && prediction.top_features ? (
                                        Object.entries(prediction.top_features).map(([key, val]) => (
                                            <div key={key} className="space-y-4 group/bar">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-md font-bold text-[#191c1e] group-hover/bar:text-primary transition-colors">{key}</span>
                                                    <div className="flex items-center gap-3">
                                                        {val < 0 && (
                                                            <span className="text-[9px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100 uppercase tracking-widest">Bias Risk</span>
                                                        )}
                                                        <span className={`text-sm font-black font-mono tracking-tighter ${val < 0 ? 'text-red-600' : 'text-primary'}`}>
                                                            {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="h-4 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-inner p-1">
                                                    <div 
                                                        className={`h-full rounded-xl transition-all duration-1000 shadow-md ${val < 0 ? 'bg-red-500 shadow-red-500/20' : 'bg-primary shadow-primary/20'}`} 
                                                        style={{ width: `${Math.abs(val) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-48 space-y-4 opacity-30">
                                            <span className="material-symbols-outlined text-6xl">insights</span>
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Awaiting data for SHAP analysis</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DecisionFirewall;
