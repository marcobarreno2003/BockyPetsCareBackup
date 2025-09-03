import { create } from 'zustand';
import { supabase } from './supabaseClient';

const useStore = create((set, get) => ({
  user: null,
  isAdmin: false,
  isLoading: true,
  language: 'en',

  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setIsLoading: (isLoading) => set({ isLoading }),
  toggleLanguage: () => set((state) => ({ 
    language: state.language === 'es' ? 'en' : 'es' 
  })),

  _syncUserWithPublicTable: async (authUser) => {
    if (!authUser || !authUser.id || !authUser.email) {
      console.error("Sync User: Invalid authUser object provided", authUser);
      return { role_id: 2 }; 
    }

    const authUserId = authUser.id;
    const authUserEmail = authUser.email.toLowerCase();

    let { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id, role_id, email')
      .eq('id', authUserId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error("Sync User: Error fetching user from public.users by ID:", fetchError);
      return { role_id: 2 }; 
    }

    if (existingUser) {
      if (existingUser.email !== authUserEmail) {
        console.warn(`Sync User: Email mismatch for user ID ${authUserId}. DB: ${existingUser.email}, Auth: ${authUserEmail}. Updating DB email.`);
        const { error: updateEmailError } = await supabase
          .from('users')
          .update({ email: authUserEmail })
          .eq('id', authUserId);
        if (updateEmailError) {
          console.error("Sync User: Error updating email in public.users:", updateEmailError);
        }
      }
      return { role_id: existingUser.role_id };
    } else {
      let { data: userByEmail, error: fetchByEmailError } = await supabase
        .from('users')
        .select('id, role_id')
        .eq('email', authUserEmail)
        .single();

      if (fetchByEmailError && fetchByEmailError.code !== 'PGRST116') {
        console.error("Sync User: Error fetching user from public.users by email:", fetchByEmailError);
      }
      
      if (userByEmail && userByEmail.id !== authUserId) {
        console.warn(`Sync User: User with email ${authUserEmail} exists but with different ID. This should not happen. ID in DB: ${userByEmail.id}, Auth ID: ${authUserId}. Prioritizing Auth ID.`);
        const { error: deleteOldEntryError } = await supabase
          .from('users')
          .delete()
          .eq('id', userByEmail.id);
        if (deleteOldEntryError) {
            console.error("Sync User: Failed to delete old user entry with conflicting email:", deleteOldEntryError);
        }
      }
      
      const roleIdToSet = authUserEmail === 'bockypetscare@gmail.com' ? 1 : 2;
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ id: authUserId, email: authUserEmail, role_id: roleIdToSet }]);
      
      if (insertError) {
        console.error("Sync User: Error creating user entry in public.users:", insertError);
        if (insertError.code === '23505') { 
            let { data: checkAgain, error: checkError } = await supabase
            .from('users')
            .select('role_id')
            .eq('id', authUserId)
            .single();
            if (!checkError && checkAgain) return { role_id: checkAgain.role_id };
        }
        return { role_id: 2 }; 
      }
      return { role_id: roleIdToSet };
    }
  },

  loginWithPassword: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Supabase login error:", error);
        throw error;
      }
      
      if (data && data.user) {
        const { role_id } = await get()._syncUserWithPublicTable(data.user);
        const isAdmin = role_id === 1;
        set({ 
          user: data.user,
          isAdmin,
          isLoading: false
        });
        return { user: data.user, error: null };
      }
      set({ isLoading: false });
      return { user: null, error: new Error("Login successful but no user data returned.") };

    } catch (error) {
      set({ isLoading: false });
      return { user: null, error };
    }
  },

  register: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) throw error;

      if (data && data.user) {
        const { role_id } = await get()._syncUserWithPublicTable(data.user);
        const isAdmin = role_id === 1;
        set({ 
          user: data.user,
          isAdmin,
          isLoading: false
        });
        return { user: data.user, error: null };
      }
      set({ isLoading: false });
      return { user: null, error: new Error("Registration successful but no user data returned.") };
    } catch (error) {
      set({ isLoading: false });
      return { user: null, error };
    }
  },

  logout: async () => {
    set({ isLoading: true });
    await supabase.auth.signOut();
    set({ user: null, isAdmin: false, isLoading: false });
  },

  checkUser: async () => {
    set({ isLoading: true });
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error getting session:", sessionError);
        set({ user: null, isAdmin: false, isLoading: false });
        return;
      }
      
      if (session && session.user) {
        const { role_id } = await get()._syncUserWithPublicTable(session.user);
        const isAdmin = role_id === 1;
        set({ 
          user: session.user,
          isAdmin,
          isLoading: false
        });
      } else {
        set({ 
          user: null,
          isAdmin: false,
          isLoading: false
        });
      }
    } catch (error) {
      console.error("Unexpected error in checkUser:", error);
      set({ 
        user: null,
        isAdmin: false,
        isLoading: false
      });
    }
  }
}));

export default useStore;