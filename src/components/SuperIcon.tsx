import React from 'react';
import AppIcon, { type AppIconName } from './AppIcon';

// Semantic icon aliases curated from the Supericons search and rendered with
// the Lucide icon package already used by the app. Keeping the mapping typed
// prevents invalid icon names from reaching the renderer.
const map: Record<string, AppIconName> = {
  'arrow-back': 'arrowLeft',
  'arrow-forward': 'arrowRight',
  'chevron-forward': 'chevron',
  person: 'user',
  'person-circle-outline': 'user',
  'people-outline': 'users',
  school: 'graduation',
  'school-outline': 'graduation',
  'book-outline': 'book',
  book: 'book',
  'bulb-outline': 'bulb',
  'happy-outline': 'sparkles',
  'stats-chart-outline': 'chart',
  'stats-chart': 'chart',
  'shield-checkmark-outline': 'shield',
  'shield-checkmark': 'shield',
  'safe-outline': 'shield',
  'lock-closed-outline': 'lock',
  'lock-closed': 'lock',
  'time-outline': 'clock',
  add: 'plus',
  'help-circle': 'quiz',
  'help-circle-outline': 'quiz',
  trophy: 'trophy',
  'checkmark-circle': 'checkCircle',
  'close-circle': 'closeCircle',
  'ellipse-outline': 'quiz',
  'calculator-outline': 'calculator',
  'flask-outline': 'sparkles',
  'desktop-outline': 'laptop',
  'laptop-outline': 'laptop',
  'language-outline': 'languages',
  'leaf-outline': 'leaf',
  'water-outline': 'heart',
  'sunny-outline': 'sparkles',
  'globe-outline': 'globe',
  'search-outline': 'search',
  'text-outline': 'book',
  'chatbubble-ellipses-outline': 'message',
  'heart-outline': 'heart',
  'notifications-outline': 'sparkles',
  'information-circle-outline': 'sparkles',
  'log-in-outline': 'user',
  'cloud-done-outline': 'checkCircle',
  'trending-up': 'chart',
  'trending-up-outline': 'chart',
  'log-out-outline': 'arrowRight',
  'settings-outline': 'settings',
  'menu-outline': 'settings',
  checkmark: 'check',
  close: 'close',
  'add-circle-outline': 'plus',
  'numbers-outline': 'calculator',
  'chatbubble-outline': 'message',
  'bookmark-outline': 'book',
  play: 'play',
  'play-circle': 'play',
};

export default function SuperIcon({
  name,
  size = 22,
  color = '#1677F2',
  strokeWidth = 2.2,
}: {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const mapped = map[name] ?? 'sparkles';
  return <AppIcon name={mapped} size={size} color={color} strokeWidth={strokeWidth} />;
}
