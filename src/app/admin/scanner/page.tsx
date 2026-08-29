import { ScannerClient } from './ScannerClient';

export default function AdminScannerPage() {
    return (
        <div className="min-h-screen bg-[#020205] text-white pt-24 pb-12 px-4 font-sans relative">
            <div className="absolute inset-0 bg-[#d4af37]/5 mix-blend-overlay pointer-events-none" />
            <div className="max-w-md mx-auto relative z-10">
                <h1 className="text-3xl font-[Cinzel] font-black text-[#d4af37] text-center mb-2">
                    Gatekeeper Access
                </h1>
                <p className="text-stone-400 text-center mb-8 text-sm">Authorized Personnel Only</p>
                <ScannerClient />
            </div>
        </div>
    );
}
