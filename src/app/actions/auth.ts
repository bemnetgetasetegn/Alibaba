'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = (formData.get('email') as string)?.trim();
  const password = (formData.get('password') as string)?.trim();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isConfigured = supabaseUrl && !supabaseUrl.includes('your-project') && supabaseUrl.startsWith('http');

  // Offline / Demo fallback when Supabase is not yet connected
  if (!isConfigured) {
    const cleanEmail = email.toLowerCase();
    if (
      (cleanEmail === 'admin@2emaeket.com' ||
        cleanEmail === 'admin@2emarket.com' ||
        cleanEmail === 'admin@weixinsteel.com' ||
        cleanEmail === 'admin@alibaba.com') &&
      password === 'admin123'
    ) {
      redirect('/admin');
    }
    return { error: 'Invalid credentials. Use demo: admin@2emaeket.com / admin123 (or access /admin directly)' };
  }

  const supabase = await createClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/admin');
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
