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
                    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-outline-variant/20">
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Step 01 / Ingestion</p>
                            <h3 className="font-headline text-4xl font-extrabold text-[#191c1e]">Import Dataset</h3>
                            <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
                                Securely upload your structured training data for <span className="font-bold text-primary">fairness auditing</span>. Our engine will scan for proxy variables and historical biases.
                            </p>
                        </div>
                        <div className="flex gap-3 pb-2">
                            <button className="px-6 py-3 rounded-xl bg-surface-container-high text-slate-800 font-semibold text-sm hover:bg-slate-200 transition-colors">
                                View Documentation
                            </button>
                            <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-semibold text-sm shadow-lg flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all">
                                <span className="material-symbols-outlined text-sm">help</span>
                                Need Help?
                            </button>
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
                        <div className="lg:col-span-7 space-y-6">
                            <div className={`bg-white rounded-full p-20 border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center text-center space-y-4 group relative overflow-hidden shadow-sm ${success ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-200 hover:border-primary/50'}`}>
                                <div className="absolute inset-0 micro-grid-overlay opacity-5 group-hover:opacity-10 pointer-events-none transition-opacity"></div>
                                
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 transition-all duration-500 group-hover:scale-110 shadow-2xl ${success ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-primary'}`}>
                                    <span className="material-symbols-outlined text-4xl">{success ? 'verified' : 'cloud_upload'}</span>
                                </div>
 
                                <h4 className="font-headline text-xl font-bold text-[#191c1e]">
                                    {file ? file.name : 'Drag & Drop Dataset'}
                                </h4>
                                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                                    Supported formats: CSV, JSON, Parquet. Secure SSL tunneling ensures your raw data never leaves the encrypted scope.
                                </p>
 
                                <div className="pt-6">
                                    <label className="cursor-pointer px-8 py-4 rounded-xl bg-primary text-white font-bold text-sm tracking-tight hover:shadow-xl transition-all inline-flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg">folder_open</span>
                                        {uploading ? 'INGESTING...' : 'Select File from Computer'}
                                        <input className="hidden" type="file" onChange={handleFileChange} disabled={uploading}/>
                                    </label>
                                    
                                    {file && !success && (
                                        <button 
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="ml-4 px-8 py-4 rounded-xl bg-[#001d31] text-white font-bold text-sm tracking-tight hover:shadow-xl transition-all inline-flex items-center gap-3"
                                        >
                                            <span className={`material-symbols-outlined text-lg ${uploading ? 'animate-spin' : ''}`}>bolt</span>
                                            {uploading ? 'PROCESSING...' : 'Push to Server'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Info Cards Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-6 rounded-3xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Encrypted Tunnel</p>
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <span className="material-symbols-outlined text-sm">lock</span>
                                        <span className="text-sm">AES-256 Enabled</span>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-3xl border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Privacy Filter</p>
                                    <div className="flex items-center gap-2 text-secondary font-bold">
                                        <span className="material-symbols-outlined text-sm">visibility_off</span>
                                        <span className="text-sm">PII Redaction Ready</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Configuration Aside */}
                        <aside className="lg:col-span-12 xl:col-span-4 h-full">
                            <div className="bg-white p-10 rounded-full shadow-sm border border-slate-100 space-y-10 relative overflow-hidden h-full group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                                
                                <div className="space-y-2 relative z-10">
                                    <h4 className="font-headline text-lg font-bold text-[#191c1e]">Configuration</h4>
                                    <p className="text-slate-400 text-xs">Define analysis parameters before processing.</p>
                                </div>
 
                                <div className="space-y-6 relative z-10">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Target Column</label>
                                        <select className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 text-sm font-semibold text-[#191c1e] focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer appearance-none">
                                            <option>loan_approved</option>
                                            <option>risk_score</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Protected Attribute</label>
                                        <select className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 text-sm font-semibold text-[#191c1e] focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer appearance-none">
                                            <option>sender_gender</option>
                                            <option>race_ethnicity</option>
                                            <option>age_bracket</option>
                                        </select>
                                    </div>
                                    
                                    <div className="pt-6 space-y-4">
                                        <button 
                                            onClick={handleAnalyze}
                                            disabled={analyzing || !success}
                                            className="w-full py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-bold text-sm shadow-xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                                        >
                                            <span className={`material-symbols-outlined ${analyzing ? 'animate-spin' : ''}`}>{analyzing ? 'autorenew' : 'analytics'}</span>
                                            {analyzing ? 'AUDITING...' : 'Analyze Bias'}
                                        </button>
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
