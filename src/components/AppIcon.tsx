import React from 'react';
import type { LucideIcon } from 'lucide-react-native';
import {
  ArrowLeft, ArrowRight, BarChart3, BookOpen, Brain, Calculator, Check, CheckCircle2,
  ChevronRight, CircleHelp, Clock3, GraduationCap, HeartPulse, Home, Laptop, Leaf,
  Lightbulb, LockKeyhole, MessageCircle, Plus, Search, Settings2, ShieldCheck,
  Sparkles, Trophy, UserRound, UsersRound, X, XCircle, Languages, Globe2, PlayCircle,
} from 'lucide-react-native';

const icons = {
  arrowLeft: ArrowLeft, arrowRight: ArrowRight, chart: BarChart3, book: BookOpen,
  brain: Brain, calculator: Calculator, check: Check, checkCircle: CheckCircle2,
  chevron: ChevronRight, quiz: CircleHelp, clock: Clock3, graduation: GraduationCap,
  heart: HeartPulse, home: Home, laptop: Laptop, leaf: Leaf, bulb: Lightbulb,
  lock: LockKeyhole, message: MessageCircle, plus: Plus, search: Search,
  settings: Settings2, shield: ShieldCheck, sparkles: Sparkles, trophy: Trophy,
  user: UserRound, users: UsersRound, close: X, closeCircle: XCircle,
  languages: Languages, globe: Globe2, play: PlayCircle,
} satisfies Record<string, LucideIcon>;

export type AppIconName = keyof typeof icons;

export default function AppIcon({ name, size = 22, color = '#1677F2', strokeWidth = 2.2 }: {
  name: AppIconName; size?: number; color?: string; strokeWidth?: number;
}) {
  const Icon = icons[name];
  return <Icon size={size} color={color} strokeWidth={strokeWidth} />;
}
