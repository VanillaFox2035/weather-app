import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className="clock" dateTime={now.toISOString()}>
      {now.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}{" "}
      <b>{now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</b>
    </time>
  );
}
