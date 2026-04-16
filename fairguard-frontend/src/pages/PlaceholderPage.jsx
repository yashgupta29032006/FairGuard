import React from 'react';
import { Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';

const PlaceholderPage = ({ title }) => (
    <div className="min-h-screen">
        <TopAppBar />
        <main className="ml-64 p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
                <h2 className="text-4xl font-bold font-headline text-slate-300">{title}</h2>
                <p className="text-slate-400 mt-4">This module is under system calibration.</p>
                <Link to="/" className="mt-8 inline-block text-primary font-bold hover:underline">Back to Dashboard</Link>
            </div>
        </main>
    </div>
);

export default PlaceholderPage;
