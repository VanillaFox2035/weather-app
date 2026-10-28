import { useCallback, useEffect, useRef, useState } from "react";
import { fetchForecast, fetchLocations, type Forecast } from "../lib/weather";

const REFRESH_MS = 10 * 60 * 1000;
const STALE_MS = 60 * 1000;

interface Result { place: string; forecast?: Forecast; failed?: boolean }

export function useWeather(place: string) {
  const [result, setResult] = useState<Result | null>(null);
  const ctrl = useRef<AbortController | null>(null);
  const loadedAt = useRef(0);

  const refresh = useCallback(async () => {
    ctrl.current?.abort();
    const c = new AbortController();
    ctrl.current = c;
    try {
      const forecast = await fetchForecast(place, c.signal);
      loadedAt.current = Date.now();
      setResult({ place, forecast });
    } catch {
      if (c.signal.aborted) return;
      // Keep showing the last good data for this place, just flag the failure.
      setResult((prev) => (prev?.place === place ? { ...prev, failed: true } : { place, failed: true }));
    }
  }, [place]);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, REFRESH_MS);
    // Refresh when the tab comes back after a while.
    const onVisible = () => {
      if (document.visibilityState === "visible" && Date.now() - loadedAt.current > STALE_MS) refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      ctrl.current?.abort();
    };
  }, [refresh]);

  const mine = result?.place === place ? result : null;
  return { forecast: mine?.forecast ?? null, failed: !!mine?.failed, refresh };
}

export function useLocations() {
  const [places, setPlaces] = useState<string[]>([]);
  useEffect(() => {
    const c = new AbortController();
    fetchLocations(c.signal).then(setPlaces).catch(() => {});
    return () => c.abort();
  }, []);
  return places;
}
