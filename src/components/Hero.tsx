import WeatherIcon from "./WeatherIcon";
import { KIND_LABEL, type Current } from "../lib/weather";

interface Props { current: Current | null; summary: string }

export default function Hero({ current, summary }: Props) {
  const dash = "–";
  return (
    <section className={current ? "hero" : "hero is-loading"} aria-live="polite">
      <div className="hero-main">
        <p className="temp">
          {current?.temp ?? dash}
          <span className="deg">°</span>
        </p>
        {current && <WeatherIcon kind={current.kind} night={current.night} size={160} className="hero-icon" />}
      </div>
      <p className="condition">{current ? KIND_LABEL[current.kind] : "Loading weather"}</p>
      {summary && <p className="summary">{summary}</p>}
      <ul className="stats">
        <li>Humidity <b>{current?.humidity ?? dash}%</b></li>
        <li>Rain today <b>{current?.rain ?? dash} mm</b></li>
      </ul>
    </section>
  );
}
