import {
  BarChart3,
  BedDouble,
  Bot,
  Briefcase,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronRight,
  Film,
  FileSearch,
  Globe,
  Hammer,
  Mail,
  MapPin,
  Menu,
  Mic,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Truck,
  UserPlus,
  UtensilsCrossed,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  BarChart3,
  BedDouble,
  Bot,
  Briefcase,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronRight,
  Film,
  FileSearch,
  Globe,
  Hammer,
  Mail,
  MapPin,
  Menu,
  Mic,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Truck,
  UserPlus,
  UtensilsCrossed,
  X,
  Zap,
};

export function Icon({
  name,
  className,
  size = 20,
  "aria-hidden": ariaHidden = true,
}: {
  name: string;
  className?: string;
  size?: number;
  "aria-hidden"?: boolean;
}) {
  const Component = registry[name];
  if (!Component) return null;
  return <Component size={size} className={className} aria-hidden={ariaHidden} />;
}
