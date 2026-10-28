import { useEffect, useState } from "react";
import Clock from "./components/Clock";
import { assetUrl } from "./lib/assets";
import Hero from "./components/Hero";
import Hourly from "./components/Hourly";
import Week from "./components/Week";
import LocationSheet from "./components/LocationSheet";
import { useLocations, useWeather } from "./hooks/useWeather";
import { DEFAULT_PLACE, summarize, themeFor } from "./lib/weather";

const readPlace = () => new URLSearchParams(window.location.search).get("location") || DEFAULT_PLACE;

export default function App() {
  const [place, setPlace] = useState(readPlace);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { forecast, failed, refresh } = useWeather(place);
  const places = useLocations();

  const current = forecast?.current ?? null;
  const theme = current ? themeFor(current.kind, current.night) : "sun";

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => {
    document.title = current?.temp != null ? `${current.temp}° in ${place}` : "Weather";
  }, [current?.temp, place]);

  function choose(next: string) {
    setPlace(next);
    setSheetOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("location", next);
    history.replaceState(null, "", url);
  }

  return (
    <main className="app">
      <header className="top">
        <button className="place" onClick={() => setSheetOpen(true)} aria-haspopup="dialog">
          <img src={assetUrl("location.svg")} width={18} height={18} alt="" />
          {place}
        </button>
        <div className="top-right">
          <Clock />
          {current && <span className="updated">Updated {current.updated}</span>}
        </div>
      </header>

      {failed && (
        <div className="notice" role="alert">
          <p>{forecast ? `Couldn't refresh. Showing the update from ${current?.updated}.` : `Couldn't load the weather for ${place}.`}</p>
          <button onClick={refresh}>Try again</button>
        </div>
      )}

      {(forecast || !failed) && (
        <>
          <Hero current={current} summary={forecast ? summarize(forecast.current, forecast.hours) : ""} />
          {forecast && <Hourly hours={forecast.hours} />}
          {forecast && <Week days={forecast.days} />}
        </>
      )}

      <footer className="credit">Designed and coded by VanillaFox2035 & Claude.ai</footer>

      <LocationSheet open={sheetOpen} current={place} places={places} onSelect={choose} onClose={() => setSheetOpen(false)} />
    </main>
  );
}
