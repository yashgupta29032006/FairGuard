import React, { useState } from 'react';
import TopAppBar from '../components/layout/TopAppBar';
import { uploadDataset, analyzeBias } from '../services/api';

const DataUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
        setSuccess(false);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        setUploading(true);
        setError(null);
        try {
            await uploadDataset(file);
            setSuccess(true);
        } catch (err) {
            setError("Upload failed. Please check if the backend is running at http://localhost:8000");
        } finally {
            setUploading(false);
        }
    };

    const handleAnalyze = async () => {
        if (!success) {
            setError("Please upload a dataset first.");
            return;
        }

        setAnalyzing(true);
        setError(null);
        try {
            await analyzeBias({ 
                target_column: 'loan_approved', 
                protected_attribute: 'sender_gender' 
            });
            window.location.href = '/analysis';
        } catch (err) {
            setError("Analysis trigger failed.");
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <TopAppBar title="Data Ingestion Engine" badge="Arbiter v2.4" />
            <main className="ml-64 p-12">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Header Section */}
                    <section className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                                <p className="text-[11px] font-black tracking-[0.3em] text-primary uppercase">Step 01 / Ingestion</p>
                            </div>
                            <h2 className="text-6xl font-black font-headline text-[#191c1e] tracking-tighter leading-none">Import Dataset</h2>
                            <p className="text-slate-500 max-w-2xl text-xl font-light leading-relaxed">
                                Securely upload your structured training data for <span className="font-bold text-primary">fairness auditing</span>. Our engine will scan for proxy variables and historical biases.
                            </p>
                        </div>
                    </section>

                    {/* Notification Portal */}
                    <div className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-6 rounded-[24px] border border-red-100 shadow-xl shadow-red-500/5 animate-in slide-in-from-top duration-300">
                                <p className="flex items-center gap-3 font-black text-sm uppercase tracking-widest">
                                    <span className="material-symbols-outlined font-black">error</span>
                                    {error}
                                </p>
                            </div>
                        )}

                        {success && (
                            <div className="bg-emerald-50 text-[#00875A] p-6 rounded-[24px] border border-emerald-100 shadow-xl shadow-emerald-500/5 animate-in slide-in-from-top duration-300">
                                <p className="flex items-center gap-3 font-black text-sm uppercase tracking-widest">
                                    <span className="material-symbols-outlined font-black">check_circle</span>
                                    Ingestion Complete – Dataset Cached for Analysis
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Drop Zone */}
                        <div className="lg:col-span-12 xl:col-span-8">
                            <div className={`bg-white rounded-[48px] p-24 border-4 border-dashed transition-all duration-500 flex flex-col items-center justify-center text-center space-y-8 group relative overflow-hidden shadow-sm ${success ? 'border-emerald-500' : 'border-slate-100 hover:border-primary/40'}`}>
                                <div className="absolute inset-0 micro-grid-bg opacity-5 group-hover:opacity-10 pointer-events-none transition-opacity"></div>
                                
                                <div className={`w-28 h-28 rounded-[32px] flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl ${success ? 'bg-emerald-50 text-emerald-500 shadow-emerald-500/20' : 'bg-slate-50 text-primary shadow-primary/20'}`}>
                                    <span className="material-symbols-outlined text-5xl font-black">{success ? 'verified' : 'cloud_upload'}</span>
                                </div>

                                <div className="space-y-4 max-w-md">
                                    <h4 className="text-3xl font-black font-headline text-[#191c1e] tracking-tight">
                                        {file ? file.name : 'Ingest Data Stream'}
                                    </h4>
                                    <p className="text-slate-400 text-md font-light leading-relaxed">
                                        Drop your CSV, JSON, or Parquet file here. Secure SSL tunneling ensures your raw data never leaves the encrypted scope.
                                    </p>
                                </div>

                                <div className="flex gap-4 pt-8">
                                    <label className="cursor-pointer px-10 py-5 rounded-[24px] bg-[#001d31] text-white font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-primary/40 hover:brightness-110 active:scale-95 transition-all flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg">folder_open</span>
                                        {uploading ? 'INGESTING...' : 'Select File'}
                                        <input className="hidden" type="file" onChange={handleFileChange} disabled={uploading}/>
                                    </label>
                                    
                                    {file && !success && (
                                        <button 
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="px-10 py-5 rounded-[24px] bg-primary text-white font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-3"
                                        >
                                            <span className={`material-symbols-outlined text-lg ${uploading ? 'animate-spin' : ''}`}>bolt</span>
                                            {uploading ? 'PROCESSING...' : 'Push to Server'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Configuration Aside */}
                        <aside className="lg:col-span-12 xl:col-span-4 h-full">
                            <div className="bg-white p-12 rounded-[48px] shadow-sm border border-slate-200 space-y-10 relative overflow-hidden h-full group">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full -mr-24 -mt-24 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                                
                                <div className="space-y-3 relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-primary text-md">settings_input_component</span>
                                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Configuration</h4>
                                    </div>
                                    <h4 className="font-headline text-2xl font-black text-[#191c1e] tracking-tight">Audit Parameters</h4>
                                    <p className="text-slate-400 text-sm font-light mt-2">Define analysis targets and protection tiers before execution.</p>
                                </div>

                                <div className="space-y-8 relative z-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Dimension</label>
                                        <div className="relative group/select">
                                            <select className="w-full bg-slate-50 border-2 border-slate-50 rounded-[22px] py-4 px-6 text-md font-bold text-[#191c1e] focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-inner appearance-none cursor-pointer">
                                                <option>loan_approved</option>
                                                <option>risk_score</option>
                                                <option>credit_limit</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover/select:text-primary transition-colors">expand_more</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Protected Attribute</label>
                                        <div className="relative group/select">
                                            <select className="w-full bg-slate-50 border-2 border-slate-50 rounded-[22px] py-4 px-6 text-md font-bold text-[#191c1e] focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-inner appearance-none cursor-pointer">
                                                <option>sender_gender</option>
                                                <option>race_ethnicity</option>
                                                <option>age_bracket</option>
                                                <option>socio_economic_status</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover/select:text-primary transition-colors">expand_more</span>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-10">
                                        <button 
                                            onClick={handleAnalyze}
                                            disabled={analyzing || !success}
                                            className="w-full py-5 rounded-[24px] bg-gradient-to-br from-primary to-[#001d31] text-white font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                                        >
                                            <span className={`material-symbols-outlined ${analyzing ? 'animate-spin' : ''}`}>{analyzing ? 'autorenew' : 'analytics'}</span>
                                            {analyzing ? 'AUDITING...' : 'Trigger Analysis'}
                                        </button>
                                        <p className="text-[9px] text-slate-400 text-center mt-6 uppercase tracking-[0.2em] font-black opacity-60">Engine will run 14 fairness tests</p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DataUpload;
