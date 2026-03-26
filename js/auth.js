// js/auth.js
import { supabase } from './app.js';

export function initAuth() {
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
            window.location.hash = event === 'SIGNED_IN' ? '/' : '/login';
        }
    });
}

export async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
}

export async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
}

export async function register(email, password, metadata) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: metadata
        }
    });
    if (error) throw error;
    return data.user;
}

export async function logout() {
    await supabase.auth.signOut();
}
