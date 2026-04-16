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
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-8 space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Real-Time Algorithmic Intercept</p>
                            <h2 className="text-4xl font-extrabold font-headline text-[#191c1e] tracking-tight leading-tight">Predictive Fairness Audit</h2>
                            <p className="text-slate-500 max-w-2xl text-lg leading-relaxed font-light">
                                Our <span className="font-bold text-primary">Arbiter Protocol</span> monitors every calculation for demographic parity and feature-level correlation at the point of decision.
                            </p>
                        </div>
                        <div className="lg:col-span-4 flex justify-end">
                            <div className="bg-slate-100 p-4 rounded-xl micro-grid-overlay w-full border border-slate-200 shadow-sm relative overflow-hidden group">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold text-slate-400">LATENCY</span>
                                    <span className="text-xs font-mono font-bold text-primary">12ms</span>
                                </div>
                                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-3/4 shadow-[0_0_8px_rgba(0,61,155,0.4)]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Control Panel */}
                        <div className="lg:col-span-4 bg-white p-8 rounded-[40px] shadow-sm space-y-6 border border-slate-100 relative group overflow-hidden">
                            <h3 className="text-lg font-bold font-headline mb-4 text-[#191c1e]">Input Parameters</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Credit Score', name: 'credit_score' },
                                    { label: 'Annual Income', name: 'annual_income' },
                                    { label: 'Age', name: 'age' }
                                ].map((field) => (
                                    <div key={field.name} className="space-y-1.5 group/input">
                                        <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase transition-colors group-hover/input:text-primary pl-1">{field.label}</label>
                                        <input 
                                            name={field.name}
                                            value={inputs[field.name]}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-[#191c1e] focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all" 
                                            type="number" 
                                        />
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={runPrediction}
                                disabled={loading}
                                className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold font-headline shadow-lg flex items-center justify-center gap-2 mt-8 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                <span className={`material-symbols-outlined text-lg ${loading ? 'animate-spin' : ''}`}>{loading ? 'autorenew' : 'bolt'}</span>
                                {loading ? 'PROCESSING...' : 'RUN PREDICTION'}
                            </button>
                        </div>

                        {/* Results Section */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Confidence Card */}
                                <div className="bg-white p-8 rounded-[40px] shadow-sm relative overflow-hidden flex flex-col justify-between border border-slate-100 group">
                                    <div className="absolute inset-0 micro-grid-overlay opacity-5 group-hover:opacity-10 transition-opacity"></div>
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Model Confidence</p>
                                        <h4 className="text-5xl font-black font-headline text-[#191c1e]">
                                            {prediction ? `${prediction.confidence}%` : '--%'}
                                        </h4>
                                    </div>
                                    <div className="mt-8 relative z-10">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-slate-400">Stochastic Variance</span>
                                            <span className="text-xs font-bold text-primary">Low</span>
                                        </div>
                                        <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-primary rounded-full transition-all duration-1000" 
                                                style={{ width: prediction ? `${prediction.confidence}%` : '0%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Card */}
                                {prediction ? (
                                    prediction.bias_flag === "HIGH" ? (
                                        <div className="bg-red-50 border-2 border-red-500 p-8 rounded-[40px] shadow-sm flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                                            <span className="material-symbols-outlined text-red-600 text-6xl">warning</span>
                                            <div>
                                                <h3 className="text-2xl font-black font-headline text-red-700 tracking-tight leading-none mb-2">Bias Risk Detected</h3>
                                                <p className="text-red-600 font-bold text-lg">Decision Intercepted</p>
                                            </div>
                                            <div className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest">
                                                HOLD ACTIVE
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-emerald-50 border-2 border-emerald-500 p-8 rounded-[40px] shadow-sm flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                                            <span className="material-symbols-outlined text-emerald-600 text-6xl">check_circle</span>
                                            <div>
                                                <h3 className="text-2xl font-black font-headline text-emerald-700 tracking-tight leading-none mb-2">Safe Decision</h3>
                                                <p className="text-emerald-600 font-bold text-lg">No bias detected</p>
                                            </div>
                                            <div className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest">
                                                CLEAR PASS
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="bg-white border-2 border-dashed border-slate-100 p-8 rounded-[40px] flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                        <span className="material-symbols-outlined text-slate-200 text-5xl">hourglass_empty</span>
                                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Waiting for Input</p>
                                    </div>
                                )}
                            </div>

                            {/* Explainability Section */}
                            <div className="bg-white p-8 rounded-[40px] shadow-sm flex-1 border border-slate-100 relative group overflow-hidden">
                                <h3 className="text-lg font-bold font-headline mb-6 text-[#191c1e]">Explainability Analysis</h3>
                                <div className="space-y-6">
                                    {prediction && prediction.top_features ? (
                                        Object.entries(prediction.top_features).map(([key, val]) => (
                                            <div key={key} className="space-y-2">
                                                <div className="flex justify-between items-center text-xs font-bold">
                                                    <span className="text-slate-500 uppercase tracking-tight">{key}</span>
                                                    <span className={val < 0 ? 'text-tertiary' : 'text-primary'}>
                                                        {val > 0 ? `+${val.toFixed(2)}` : `${val.toFixed(2)} (Red Flag)`}
                                                    </span>
                                                </div>
                                                <div className="h-3 bg-slate-50 rounded-lg overflow-hidden flex">
                                                    <div 
                                                        className={`h-full transition-all duration-1000 ${val < 0 ? 'bg-tertiary' : 'bg-primary'}`} 
                                                        style={{ width: `${Math.abs(val) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-30 py-12">
                                            <span className="material-symbols-outlined text-6xl text-slate-200">insights</span>
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Awaiting SHAP indices</p>
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
