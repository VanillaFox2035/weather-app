import type { CSSProperties } from "react";
import WeatherIcon from "./WeatherIcon";
import type { Hour } from "../lib/weather";

export default function Hourly({ hours }: { hours: Hour[] }) {
  if (hours.length === 0) return null;
  const temps = hours.map((h) => h.temp);
  const lo = Math.min(...temps), hi = Math.max(...temps);
  // Height of each temperature on a small column chart, in %.
  const pos = (t: number) => (hi === lo ? 40 : 8 + (62 * (t - lo)) / (hi - lo));

  return (
    <section className="panel">
      <h2>Coming up</h2>
      <ol className="hours" style={{ gridTemplateColumns: `repeat(${hours.length}, 1fr)` }}>
        {hours.map((h) => (
          <li key={h.time}>
            <span className="hour-time">{h.time}</span>
            <WeatherIcon kind={h.kind} night={h.night} size={36} />
            <div className="hour-chart" style={{ "--p": pos(h.temp) } as CSSProperties}>
              <span className="hour-temp">{h.temp}°</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
