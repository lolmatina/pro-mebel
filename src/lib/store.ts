import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  validateToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        const { token } = await api.login(username, password);
        api.setToken(token);
        set({ token, isAuthenticated: true });
      },
      logout: () => {
        api.setToken(null);
        set({ token: null, isAuthenticated: false });
      },
      validateToken: async () => {
        const result = await api.validateToken();
        if (!result.valid) {
          api.setToken(null);
          set({ token: null, isAuthenticated: false });
          return false;
        }
        return true;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          api.setToken(state.token);
        }
      },
    }
  )
);


