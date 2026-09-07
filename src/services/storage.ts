import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ChildProfile, ParentAccount } from '../types/models';

const PARENT_KEY = '@uburezi/parent';
const CHILDREN_KEY = '@uburezi/children';
const SESSION_KEY = '@uburezi/session';
const SCREEN_TIME_KEY = '@uburezi/screen-time';
const SAFETY_KEY = '@uburezi/safety';

export type ScreenTimeSettings = { enabled: boolean; minutes: number };
export type SafetySettings = { contentFilter: boolean; publicChat: boolean; notifications: boolean };

export async function saveParent(parent: ParentAccount) { await AsyncStorage.setItem(PARENT_KEY, JSON.stringify(parent)); }
export async function getParent(): Promise<ParentAccount | null> { const value = await AsyncStorage.getItem(PARENT_KEY); return value ? JSON.parse(value) as ParentAccount : null; }
export async function saveChildren(children: ChildProfile[]) { await AsyncStorage.setItem(CHILDREN_KEY, JSON.stringify(children)); }
export async function getChildren(): Promise<ChildProfile[]> { const value = await AsyncStorage.getItem(CHILDREN_KEY); return value ? JSON.parse(value) as ChildProfile[] : []; }
export async function setSession(active: boolean) { await AsyncStorage.setItem(SESSION_KEY, active ? 'active' : 'inactive'); }
export async function hasSession() { return (await AsyncStorage.getItem(SESSION_KEY)) === 'active'; }
export async function clearSession() { await AsyncStorage.removeItem(SESSION_KEY); }

export async function getScreenTime(): Promise<ScreenTimeSettings> {
  const value = await AsyncStorage.getItem(SCREEN_TIME_KEY);
  return value ? JSON.parse(value) as ScreenTimeSettings : { enabled: true, minutes: 60 };
}
export async function saveScreenTime(settings: ScreenTimeSettings) { await AsyncStorage.setItem(SCREEN_TIME_KEY, JSON.stringify(settings)); }

export async function getSafetySettings(): Promise<SafetySettings> {
  const value = await AsyncStorage.getItem(SAFETY_KEY);
  return value ? JSON.parse(value) as SafetySettings : { contentFilter: true, publicChat: false, notifications: true };
}
export async function saveSafetySettings(settings: SafetySettings) { await AsyncStorage.setItem(SAFETY_KEY, JSON.stringify(settings)); }
