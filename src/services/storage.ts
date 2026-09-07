import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ChildProfile, ParentAccount } from '../types/models';

const PARENT_KEY = '@uburezi/parent';
const CHILDREN_KEY = '@uburezi/children';
const SESSION_KEY = '@uburezi/session';

export async function saveParent(parent: ParentAccount) {
  await AsyncStorage.setItem(PARENT_KEY, JSON.stringify(parent));
}

export async function getParent(): Promise<ParentAccount | null> {
  const value = await AsyncStorage.getItem(PARENT_KEY);
  return value ? JSON.parse(value) : null;
}

export async function saveChildren(children: ChildProfile[]) {
  await AsyncStorage.setItem(CHILDREN_KEY, JSON.stringify(children));
}

export async function getChildren(): Promise<ChildProfile[]> {
  const value = await AsyncStorage.getItem(CHILDREN_KEY);
  return value ? JSON.parse(value) : [];
}

export async function setSession(active: boolean) {
  await AsyncStorage.setItem(SESSION_KEY, active ? 'active' : 'inactive');
}

export async function hasSession() {
  return (await AsyncStorage.getItem(SESSION_KEY)) === 'active';
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}
