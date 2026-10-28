import type { CSSProperties } from "react";
import WeatherIcon from "./WeatherIcon";
import type { Day } from "../lib/weather";

export default function Week({ days }: { days: Day[] }) {
  if (days.length === 0) return null;
  const lo = Math.min(...days.map((d) => d.min));
  const hi = Math.max(...days.map((d) => d.max));
  const pct = (t: number) => (hi === lo ? 50 : ((t - lo) / (hi - lo)) * 100);

  return (
    <section className="panel">
      <h2>This week</h2>
      <ul className="week">
        {days.map((d) => (
          <li key={d.label}>
            <span className="day-name">{d.label}</span>
            <WeatherIcon kind={d.kind} size={32} />
            <span className="t-min">{d.min}°</span>
            <span className="range" style={{ "--lo": pct(d.min), "--hi": pct(d.max) } as CSSProperties}><i /></span>
            <span className="t-max">{d.max}°</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
