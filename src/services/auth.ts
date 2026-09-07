import { getParent, saveParent, setSession, clearSession } from './storage';
import { isSupabaseConfigured, supabase } from './supabase';
import type { ParentAccount } from '../types/models';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function signUpParent(name: string, email: string, password: string): Promise<ParentAccount> {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanName) throw new Error('Izina ry’umubyeyi rirakenewe.');
  if (!validateEmail(cleanEmail)) throw new Error('Andika email ikwiye.');
  if (password.length < 8) throw new Error('Ijambo ry’ibanga rigomba kugira nibura inyuguti 8.');

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signUp({ email: cleanEmail, password, options: { data: { full_name: cleanName, role: 'PARENT' } } });
    if (error) throw error;
    if (!data.user) throw new Error('Konti ntiyashoboye kuremwa.');
    const parent: ParentAccount = { id: data.user.id, name: cleanName, email: cleanEmail };
    if (data.session) {
      await supabase.from('profiles').upsert({ id: data.user.id, full_name: cleanName, role: 'PARENT' });
      await saveParent(parent);
      await setSession(true);
    }
    return parent;
  }

  const parent: ParentAccount = { id: `parent_${Date.now()}`, name: cleanName, email: cleanEmail };
  await saveParent(parent);
  await setSession(true);
  return parent;
}

export async function signInParent(email: string, password: string): Promise<ParentAccount | null> {
  const cleanEmail = email.trim().toLowerCase();
  if (!validateEmail(cleanEmail)) throw new Error('Andika email ikwiye.');
  if (password.length < 8) throw new Error('Ijambo ry’ibanga rigomba kugira nibura inyuguti 8.');

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
    if (error) throw error;
    if (!data.user) return null;
    const name = String(data.user.user_metadata?.full_name ?? cleanEmail.split('@')[0]);
    const parent: ParentAccount = { id: data.user.id, name, email: cleanEmail };
    await saveParent(parent);
    await setSession(true);
    return parent;
  }

  const parent = await getParent();
  if (!parent || parent.email !== cleanEmail) return null;
  await setSession(true);
  return parent;
}

export async function signOutParent() {
  if (supabase) await supabase.auth.signOut();
  await clearSession();
}
