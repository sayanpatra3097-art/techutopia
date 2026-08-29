'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { ShieldAlert, ShieldCheck, Camera, Loader2, XCircle } from 'lucide-react';

export function ScannerClient() {
    const [pin, setPin] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [scanResult, setScanResult] = useState<{
        valid: boolean;
        message: string;
        attendeeName?: string;
        college?: string;
        eventTitle?: string;
    } | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<string>('4');

    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const processingRef = useRef(false);
    const lastScannedIdRef = useRef<string | null>(null);

    // Simple client-side PIN for basic protection. In production, use a secure backend session.
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder PIN: poseidon
        if (pin === 'poseidon') {
            setIsAuthorized(true);
        } else {
            alert('Invalid PIN');
            setPin('');
        }
    };

    useEffect(() => {
        if (isAuthorized) {
            scannerRef.current = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 }, supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA] },
                /* verbose= */ false
            );

            scannerRef.current.render(onScanSuccess, onScanFailure);
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(error => {
                    console.error("Failed to clear html5QrcodeScanner. ", error);
                });
            }
            processingRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthorized, selectedEventId]);

    const onScanSuccess = async (decodedText: string) => {
        // Prevent rapid repeated scans of the same ticket
        if (processingRef.current || decodedText === lastScannedIdRef.current) return;

        processingRef.current = true;
        lastScannedIdRef.current = decodedText;
        
        setIsVerifying(true);
        setScanResult(null);

        try {
            const res = await fetch('/api/verify-ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ticketId: decodedText,
                    scannerEventId: selectedEventId
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Unknown server error' }));
                setScanResult({ valid: false, message: `Server error: ${errorData.error || res.statusText}` });
                return;
            }

            const data = await res.json();

            if (data.valid) {
                // Check them in immediately
                await fetch('/api/check-in', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ticketId: decodedText })
                });
            }

            setScanResult(data);

            // Intentionally not pausing the scanner using .pause(true).
            // It breaks on many mobile browsers when .resume() is called.
            // Using processingRef disables the callback logic efficiently.
        } catch (err: any) {
            console.error(err);
            setScanResult({ valid: false, message: `Network error: ${err.message || 'Check connection'}` });
        } finally {
            setIsVerifying(false);
            // We intentionally keep processingRef.current = true here.
            // It only gets reset when the user clicks 'Scan Next Ticket'.
        }
    };

    const resetScanner = () => {
        setScanResult(null);
        lastScannedIdRef.current = null;
        processingRef.current = false;
    };

    const onScanFailure = (error: any) => {
        // handle scan failure, usually better to ignore and keep scanning
        // console.warn(`Code scan error = ${error}`);
    };

    if (!isAuthorized) {
        return (
            <form onSubmit={handleLogin} className="bg-[#1A1C23] p-6 rounded-2xl border border-[#d4af37]/20 flex flex-col gap-4">
                <div>
                    <label htmlFor="admin-pin-input" className="block text-stone-400 text-xs font-black uppercase tracking-widest mb-2 font-[Cinzel]">Enter Admin PIN</label>
                    <input
                        id="admin-pin-input"
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] font-mono text-center text-xl tracking-widest"
                        autoFocus
                    />
                </div>
                <button type="submit" className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-4 rounded-xl hover:bg-white transition-all text-base tracking-widest uppercase mt-2">
                    Authenticate
                </button>
            </form>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-[#1A1C23] p-4 rounded-2xl border border-[#d4af37]/20">
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="scanner-location-select" className="block text-stone-400 text-xs font-black uppercase tracking-widest font-[Cinzel]">Select Scanner Location</label>
                    <span className="text-[10px] text-stone-600 font-mono">Scanner Engine v2.1</span>
                </div>
                <select
                    id="scanner-location-select"
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-[#d4af37] focus:outline-none focus:border-[#d4af37] font-[Cinzel]"
                >
                    <option value="4">BGMI Tournament</option>
                    <option value="12">Dance Battle</option>
                    <option value="13">Valorant Tournament</option>
                    <option value="999">Maan Panu Live Performance</option>
                </select>
            </div>

            <div className="relative bg-black rounded-3xl overflow-hidden border-2 border-[#d4af37]/30">
                <div id="reader" className="w-full min-h-[300px] bg-black"></div>

                {/* Overlay Scanning UI constraints */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                        <Camera size={14} className="text-[#d4af37]" />
                        <span className="text-xs font-mono text-stone-300 tracking-wider">SCANNER ACTIVE</span>
                    </div>
                    {isVerifying && <Loader2 size={20} className="text-[#d4af37] animate-spin" />}
                </div>

                {/* Scan Result Overlay */}
                {scanResult && (
                    <div className={`p-6 rounded-2xl border flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in duration-300 ${scanResult.valid ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'}`}>
                        {scanResult.valid ? (
                            <ShieldCheck size={64} className="text-green-500" />
                        ) : (
                            <XCircle size={64} className="text-red-500" />
                        )}
                        <div>
                            <h3 className={`text-2xl font-[Cinzel] font-black uppercase ${scanResult.valid ? 'text-green-500' : 'text-red-500'}`}>
                                {scanResult.valid ? 'Verified' : 'Access Denied'}
                            </h3>
                            <p className="text-white mt-1 font-bold">{scanResult.message}</p>
                        </div>

                        {scanResult.attendeeName && (
                            <div className="bg-black/40 p-4 rounded-xl w-full border border-white/5">
                                <p className="text-stone-400 text-xs uppercase tracking-widest font-black font-[Cinzel]">Attendee</p>
                                <p className="text-white text-lg font-bold">{scanResult.attendeeName}</p>
                                {scanResult.college && <p className="text-[#d4af37] text-sm">{scanResult.college}</p>}
                            </div>
                        )}

                        <button
                            onClick={resetScanner}
                            className="w-full mt-2 bg-white text-black font-[Cinzel] font-black py-4 rounded-xl hover:bg-[#d4af37] transition-all text-base tracking-widest uppercase"
                        >
                            Scan Next Ticket
                        </button>
                    </div>
                )}
            </div>

            <button
                onClick={() => setIsAuthorized(false)}
                className="flex items-center justify-center gap-2 text-stone-500 hover:text-white transition-colors text-sm font-[Cinzel] tracking-widest uppercase mt-4"
            >
                <XCircle size={16} /> Logout Scanner
            </button>
        </div>
    );
}
