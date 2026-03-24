import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      role: null, // 'teacher' or 'student'

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        }),

      setRole: (role) => set({ role }),

      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          role: null,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      // Mock login for testing
      mockLogin: (name, email, role) => {
        const mockUser = {
          uid: `mock-${Date.now()}`,
          email: email || `${name.toLowerCase().replace(/\s/g, '')}@test.com`,
          displayName: name,
          photoURL: null,
        };
        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          role,
        });
        return mockUser;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
      }),
    }
  )
);
