import { Axe, Droplets, FlaskConical, Hammer, LayoutGrid, Route, Shovel, Spline, Trees, Truck, Waves } from "lucide-react";
import type { Service } from "@/lib/services";

const MAP = {
  trees: Trees,
  droplets: Droplets,
  route: Route,
  shovel: Shovel,
  hammer: Hammer,
  waves: Waves,
  grid: LayoutGrid,
  spline: Spline,
  axe: Axe,
  flask: FlaskConical,
  truck: Truck,
} as const;

export function ServiceIcon({ name, className }: { name: Service["icon"]; className?: string }) {
  const Icon = MAP[name];
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}
