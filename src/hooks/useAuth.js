
import { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth as useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

export const useAuth = () => {
  const { user, session, loading: contextLoading } = useSupabaseAuth();
  const [loading, setLoading] = useState(false);

  const getUserRole = async (userId) => {
    try {
      console.log(`[Auth] Fetching role for user: ${userId}`);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role_type')
        .eq('user_id', userId)
        .single();
        
      if (error) {
        console.warn('[Auth] Error fetching role or role not found, defaulting to patient:', error.message);
        return 'patient'; // default
      }
      
      console.log(`[Auth] Role fetched successfully: ${data.role_type}`);
      return data?.role_type || 'patient';
    } catch (err) {
      console.error('[Auth] Exception in getUserRole:', err);
      return 'patient'; // default
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    console.log(`[Auth] Attempting login for ${email}`);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        console.error("[Auth] Supabase signInWithPassword Error Details:", {
          message: error.message,
          status: error.status,
          code: error.code,
          name: error.name
        });

        // Task 4: Comprehensive error handling for 500 errors
        if (error.status === 500 || error.code === 'unexpected_failure' || error.message.includes('schema')) {
          const customError = new Error("Authentication service temporarily unavailable. Please try again in a moment.");
          customError.isNetworkOrServerError = true;
          throw customError;
        }

        throw error;
      }
      
      console.log("[Auth] Login successful for user:", data.user.id);
      
      const role = await getUserRole(data.user.id);
      return { user: data.user, role };
    } catch (error) {
      console.error("[Auth] Exception caught during login flow:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, userData) => {
    setLoading(true);
    console.log(`[Auth] Attempting registration for ${email}`);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: userData.fullName } }
      });
      
      if (error) {
        if (error.status === 500 || error.code === 'unexpected_failure') {
          const customError = new Error("Registration service temporarily unavailable. Please try again in a moment.");
          customError.isNetworkOrServerError = true;
          throw customError;
        }
        throw error;
      }
      
      const userId = data.user.id;
      const role = userData.type === 'psychologist' ? 'psychologist' : 'patient';
      
      // Insert into user_roles
      await supabase.from('user_roles').insert({ user_id: userId, role_type: role });
      
      // Insert into specific tables based on role
      if (role === 'psychologist') {
        await supabase.from('psychologists').insert({
          user_id: userId,
          full_name: userData.fullName,
          crp_number: userData.crp,
          is_vitrine_active: false
        });
      } else {
        await supabase.from('patients').insert({
          user_id: userId,
          full_name: userData.fullName
        });
      }
      return data;
    } catch (error) {
      console.error("[Auth] Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-password-reset', {
        body: { email }
      });
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (token, newPassword) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = () => user;

  return {
    user,
    session,
    isLoading: loading || contextLoading,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    getCurrentUser,
    getUserRole
  };
};
