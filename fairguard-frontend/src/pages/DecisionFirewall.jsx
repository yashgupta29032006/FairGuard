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
                    "Zip Code Correlation": -0.19
                }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <TopAppBar title="Decision Firewall" badge="Live Monitor" />
            <main className="ml-64 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-8 space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Real-Time Algorithmic Intercept</p>
                            <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight leading-tight">Predictive Fairness Audit</h2>
                            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
                                Our Arbiter Protocol monitors every calculation for demographic parity.
                            </p>
                        </div>
                        <div className="lg:col-span-4 flex justify-end">
                            <div className="bg-surface-container-low p-4 rounded-xl micro-grid-overlay w-full border border-slate-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold text-outline">LATENCY</span>
                                    <span className="text-xs font-mono font-bold text-primary">12ms</span>
                                </div>
                                <div className="h-1 bg-outline-variant rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-3/4"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-4 bg-surface-container-lowest p-8 rounded-[40px] shadow-sm space-y-6 border border-slate-100">
                            <h3 className="text-lg font-bold font-headline mb-4">Input Parameters</h3>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-outline tracking-wider uppercase">Credit Score</label>
                                    <input 
                                        name="credit_score"
                                        value={inputs.credit_score}
                                        onChange={handleInputChange}
                                        className="w-full bg-surface-container-highest border-none rounded-xl p-3 focus:ring-0 outline-none" 
                                        type="number" 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-outline tracking-wider uppercase">Annual Income</label>
                                    <input 
                                        name="annual_income"
                                        value={inputs.annual_income}
                                        onChange={handleInputChange}
                                        className="w-full bg-surface-container-highest border-none rounded-xl p-3 focus:ring-0 outline-none" 
                                        type="number" 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-outline tracking-wider uppercase">Age</label>
                                    <input 
                                        name="age"
                                        value={inputs.age}
                                        onChange={handleInputChange}
                                        className="w-full bg-surface-container-highest border-none rounded-xl p-3 focus:ring-0 outline-none" 
                                        type="number" 
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={runPrediction}
                                disabled={loading}
                                className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-bold font-headline shadow-lg flex items-center justify-center gap-2 mt-8 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                            >
                                <span className={`material-symbols-outlined text-lg ${loading ? 'animate-spin' : ''}`}>{loading ? 'autorenew' : 'bolt'}</span>
                                {loading ? 'PROCESSING...' : 'RUN PREDICTION'}
                            </button>
                        </div>

                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-surface-container-lowest p-8 rounded-[40px] shadow-sm relative overflow-hidden flex flex-col justify-between border border-slate-100">
                                    <div>
                                        <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Model Confidence</p>
                                        <h4 className="text-5xl font-black font-headline text-on-surface">
                                            {prediction ? `${prediction.confidence}%` : '--%'}
                                        </h4>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-on-surface-variant">Stochastic Variance</span>
                                            <span className="text-xs font-bold text-primary">Low</span>
                                        </div>
                                        <div className="h-2 bg-surface-container-low rounded-full">
                                            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: prediction ? `${prediction.confidence}%` : '0%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                {prediction ? (
                                    prediction.bias_flag === "HIGH" ? (
                                        <div className="bg-error-container border-2 border-error p-8 rounded-[40px] shadow-sm flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
                                            <span className="material-symbols-outlined text-on-error-container text-6xl">warning</span>
                                            <div>
                                                <h3 className="text-2xl font-black font-headline text-on-error-container tracking-tight leading-none mb-2">Bias Risk Detected</h3>
                                                <p className="text-on-error-container font-bold text-lg">Decision Intercepted</p>
                                            </div>
                                            <div className="px-4 py-2 bg-on-error-container text-error-container rounded-lg text-xs font-bold uppercase tracking-widest">
                                                HOLD ACTIVE
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-emerald-100 border-2 border-emerald-500 p-8 rounded-[40px] shadow-sm flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
                                            <span className="material-symbols-outlined text-[#00875A] text-6xl">check_circle</span>
                                            <div>
                                                <h3 className="text-2xl font-black font-headline text-[#00875A] tracking-tight leading-none mb-2">Safe Decision</h3>
                                                <p className="text-[#00875A] font-bold text-lg">Integrity Verified</p>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-8 rounded-[40px] flex items-center justify-center text-center">
                                        <p className="text-outline font-label uppercase tracking-widest text-xs">Waiting for Inference...</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-surface-container-lowest p-8 rounded-[40px] shadow-sm flex-1 border border-slate-100">
                                <h3 className="text-lg font-bold font-headline mb-6">Explainability Analysis</h3>
                                <div className="space-y-6">
                                    {prediction && prediction.top_features ? (
                                        Object.entries(prediction.top_features).map(([key, val]) => (
                                            <div key={key} className="space-y-2">
                                                <div className="flex justify-between items-center text-xs font-bold">
                                                    <span>{key}</span>
                                                    <span className={val < 0 ? 'text-tertiary' : 'text-primary'}>
                                                        {val > 0 ? `+${val}` : val} {val < 0 && '(Red Flag)'}
                                                    </span>
                                                </div>
                                                <div className="h-3 bg-surface-container-low rounded-lg overflow-hidden flex">
                                                    <div className={`h-full ${val < 0 ? 'bg-tertiary' : 'bg-primary'}`} style={{ width: `${Math.abs(val) * 100}%` }}></div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center h-24">
                                            <p className="text-slate-300 font-label italic">Run a prediction to see Shapley impact values.</p>
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
