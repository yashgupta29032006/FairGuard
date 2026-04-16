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
            // Mocking config for now
            await analyzeBias({ 
                target_column: 'approved_loan', 
                protected_attribute: 'race_ethnicity' 
            });
            // Redirect to analysis page or show success
            window.location.href = '/analysis';
        } catch (err) {
            setError("Analysis trigger failed.");
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen">
            <TopAppBar title="Data Ingestion Engine" badge="v2.4.0" />
            <main className="ml-64 p-8">
                <div className="max-w-6xl mx-auto space-y-10">
                    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-outline-variant/20">
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Step 01 / Ingestion</p>
                            <h3 className="font-headline text-4xl font-extrabold text-on-surface">Import Dataset</h3>
                            <p className="text-on-surface-variant max-w-xl text-sm leading-relaxed">
                                Securely upload your structured training data for fairness auditing. Our engine will scan for proxy variables and historical biases.
                            </p>
                        </div>
                    </section>

                    {error && (
                        <div className="bg-error-container text-on-error-container p-4 rounded-xl border border-error">
                            <p className="flex items-center gap-2 font-bold">
                                <span className="material-symbols-outlined">error</span>
                                {error}
                            </p>
                        </div>
                    )}

                    {success && (
                        <div className="bg-emerald-100 text-[#00875A] p-4 rounded-xl border border-emerald-500">
                            <p className="flex items-center gap-2 font-bold">
                                <span className="material-symbols-outlined">check_circle</span>
                                Dataset uploaded successfully! You can now run the analysis.
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-7 space-y-6">
                            <div className={`bg-surface-container-lowest rounded-full p-16 border-2 border-dashed flex flex-col items-center justify-center text-center space-y-4 transition-colors group relative overflow-hidden ${success ? 'border-emerald-500' : 'border-outline-variant/30 hover:border-primary/50'}`}>
                                <div className="absolute inset-0 micro-grid-overlay opacity-5 group-hover:opacity-10 pointer-events-none"></div>
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform ${success ? 'bg-emerald-50 text-emerald-500' : 'bg-surface-container-low text-primary'}`}>
                                    <span className="material-symbols-outlined text-4xl">{success ? 'check_circle' : 'cloud_upload'}</span>
                                </div>
                                <h4 className="font-headline text-xl font-bold text-on-surface">{file ? file.name : 'Drag & Drop Dataset'}</h4>
                                <p className="text-on-surface-variant text-sm max-w-xs">Supported formats: CSV, JSON, Parquet. Max file size: 500MB.</p>
                                <div className="pt-6">
                                    <label className="cursor-pointer px-8 py-4 rounded-xl bg-primary text-on-primary font-bold text-sm tracking-tight hover:shadow-xl transition-all disabled:opacity-50">
                                        {uploading ? 'UPLOADING...' : 'Select File from Computer'}
                                        <input className="hidden" type="file" onChange={handleFileChange} disabled={uploading}/>
                                    </label>
                                    {file && !success && (
                                        <button 
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="ml-4 px-8 py-4 rounded-xl bg-secondary text-white font-bold text-sm hover:shadow-xl transition-all"
                                        >
                                            PUSH TO SERVER
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <aside className="lg:col-span-5">
                            <div className="bg-surface-container-lowest p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16"></div>
                                <div className="space-y-2">
                                    <h4 className="font-headline text-lg font-bold text-on-surface">Configuration</h4>
                                    <p className="text-on-surface-variant text-xs">Define analysis parameters before processing.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Target Column</label>
                                        <select className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-sm focus:ring-0 outline-none">
                                            <option>approved_loan</option>
                                            <option>risk_score</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Protected Attribute</label>
                                        <select className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-sm focus:ring-0 outline-none">
                                            <option>race_ethnicity</option>
                                            <option>gender_identity</option>
                                            <option>age_bracket</option>
                                        </select>
                                    </div>
                                    <div className="pt-6 space-y-4">
                                        <button 
                                            onClick={handleAnalyze}
                                            disabled={analyzing || !success}
                                            className="w-full py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-sm shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            <span className="material-symbols-outlined">{analyzing ? 'autorenew' : 'analytics'}</span>
                                            {analyzing ? 'ANALYZING...' : 'Analyze Bias'}
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
