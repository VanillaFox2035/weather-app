import { KIND_LABEL, type Kind } from "../lib/weather";
import { assetUrl } from "../lib/assets";

// [day file, night file]; a single entry is used for both.
const FILES: Record<Kind, [string, string?]> = {
  clear: ["Day/clear_day", "Night/clear_night"],
  mostlyClear: ["Day/mostly_clear_day", "Night/mostly_clear_night"],
  partlyCloudy: ["Day/partly_cloudy_day", "Night/partly_cloudy_night"],
  mostlyCloudy: ["Day/mostly_cloudy_day", "Night/mostly_cloudy_night"],
  scatteredShowers: ["Day/scattered_showers_day", "Night/scattered_showers_night"],
  scatteredSnow: ["Day/scattered_snow_showers_day", "Night/scattered_snow_showers_night"],
  scatteredThunder: ["Day/isolated_scattered_thunderstorms_day", "Night/isolated_scattered_thunderstorms_night"],
  cloudy: ["General/cloudy"],
  drizzle: ["General/drizzle"],
  showers: ["General/showers_rain"],
  thunder: ["General/isolated_thunderstorms"],
  showersSnow: ["General/showers_snow"],
  haze: ["General/haze_fog_dust_smoke"],
  unknown: ["question-mark"],
};

interface Props { kind: Kind; night?: boolean; size: number | string; className?: string }

export default function WeatherIcon({ kind, night = false, size, className }: Props) {
  const [day, nightFile] = FILES[kind];
  const file = night && nightFile ? nightFile : day;
  return (
    <img
      className={className}
      src={assetUrl(`WeatherIcons/Google/${file}.svg`)}
      width={size} height={size}
      alt={KIND_LABEL[kind]}
    />
  );
}
