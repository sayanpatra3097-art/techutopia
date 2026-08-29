import { useEffect, useState, useRef } from 'react';

/**
 * Performance utilities for 3D rendering
 */

// Intersection Observer for lazy loading 3D scenes
export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  callback: (isIntersecting: boolean) => void,
  options?: IntersectionObserverInit,
) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => callback(entry.isIntersecting), {
      threshold: 0.1,
      ...options,
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, callback, options]);
}

// FPS counter for performance monitoring
export function useFPS() {
  const [fps, setFPS] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    lastTime.current = performance.now();
    const countFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();

      if (currentTime >= lastTime.current + 1000) {
        setFPS(frameCount.current);
        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      rafIdRef.current = requestAnimationFrame(countFPS);
    };

    rafIdRef.current = requestAnimationFrame(countFPS);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return fps;
}

// Model cache using IndexedDB
export async function cacheModel(url: string, data: ArrayBuffer) {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open('modelCache', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['models'], 'readwrite');
      const store = transaction.objectStore('models');
      store.put(data, url);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('models')) {
        db.createObjectStore('models');
      }
    };
  });
}

export async function getCachedModel(url: string): Promise<ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('modelCache', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['models'], 'readonly');
      const store = transaction.objectStore('models');
      const getRequest = store.get(url);

      getRequest.onsuccess = () => resolve(getRequest.result || null);
      getRequest.onerror = () => reject(getRequest.error);
    };
  });
}
