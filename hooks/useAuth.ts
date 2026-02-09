import { useState, useEffect } from 'react';
import { supabase } from '../src/integrations/supabase/client';

interface AuthUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id);

        const isAdmin = roles?.some((r: any) => r.role === 'admin') ?? false;

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          isAdmin,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id);

        const isAdmin = roles?.some((r: any) => r.role === 'admin') ?? false;

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          isAdmin,
        });
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, signIn, signOut };
}
