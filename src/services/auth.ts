import { getParent, saveParent, setSession, clearSession } from './storage';
import type { ParentAccount } from '../types/models';

/**
 * Demo-only auth layer used until Supabase is configured.
 * Never treat this as production password storage.
 */
export async function signUpParent(name: string, email: string): Promise<ParentAccount> {
  const parent: ParentAccount = { id: `parent_${Date.now()}`, name: name.trim(), email: email.trim().toLowerCase() };
  await saveParent(parent);
  await setSession(true);
  return parent;
}

export async function signInParent(email: string): Promise<ParentAccount | null> {
  const parent = await getParent();
  if (!parent || parent.email !== email.trim().toLowerCase()) return null;
  await setSession(true);
  return parent;
}

export async function signOutParent() {
  await clearSession();
}
