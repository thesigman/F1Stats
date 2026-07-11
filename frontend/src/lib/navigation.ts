import {
  LayoutDashboard,
  Users,
  Trophy,
  GitCompare,
} from "lucide-react";

export const navigation = [
  {
    label: "Overview",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Drivers",
    path: "/drivers",
    icon: Users,
  },
  {
    label: "Constructors",
    path: "/constructors",
    icon: Trophy,
  },
  {
    label: "Compare",
    path: "/compare",
    icon: GitCompare,
  },
];