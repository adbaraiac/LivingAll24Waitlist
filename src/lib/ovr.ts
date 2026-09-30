/**
 * OVR tier styling — inspired by sports-game rating tiers.
 * Purely visual flavor; OVR is a personal progression number, never a
 * comparison of whose life is "better".
 */
export function ovrColor(value: number): string {
  if (value >= 90) return "#B4FF39"; // elite  -> brand accent
  if (value >= 80) return "#6EE7A8"; // high   -> green
  if (value >= 70) return "#F2D24B"; // solid  -> gold
  if (value >= 60) return "#F2A93B"; // rising -> amber
  return "#E8734A"; // early -> warm
}

export function ovrLabel(value: number): string {
  if (value >= 90) return "Elite";
  if (value >= 80) return "High";
  if (value >= 70) return "Solid";
  if (value >= 60) return "Rising";
  return "Early";
}
