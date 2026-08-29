import { useFPS } from '@/utils/performance';
import { useAdaptiveQuality } from '@/hooks/useAdaptiveQuality';

export function PerformanceMonitor() {
  const fps = useFPS();
  const { quality } = useAdaptiveQuality();

  // Only show on development or with query param
  const showMonitor =
    process.env.NODE_ENV === 'development' || (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('perf'));

  if (!showMonitor) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-black/90 p-3 rounded border border-white/10 text-xs font-mono backdrop-blur-sm">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-white/60">FPS:</span>
          <span
            className={
              fps >= 55 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'
            }
          >
            {fps}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/60">Quality:</span>
          <span className="text-gold-400 capitalize">{quality}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/60">GPU:</span>
          <span className="text-white/80">{navigator.hardwareConcurrency || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}
