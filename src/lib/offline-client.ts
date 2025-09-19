// Offline-compatible client for when Supabase is unavailable
export const createOfflineClient = () => {
  const mockUser = {
    id: 'offline-user',
    email: 'offline@local.com',
    user_metadata: {
      name: 'Offline User',
      display_name: 'Offline User'
    }
  };

  const mockSession = {
    user: mockUser,
    access_token: 'offline-token',
    expires_at: Date.now() + 86400000, // 24 hours
    refresh_token: 'offline-refresh'
  };

  return {
    auth: {
      getUser: async () => ({ data: { user: mockUser }, error: null }),
      getSession: async () => ({ data: { session: mockSession }, error: null }),
      signInWithPassword: async () => ({ data: { user: mockUser, session: mockSession }, error: null }),
      signUp: async () => ({ data: { user: mockUser, session: mockSession }, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: { message: 'Offline mode - no data available' } })
        }),
        limit: () => async () => ({ data: [], error: null }),
        order: () => async () => ({ data: [], error: null })
      }),
      insert: () => async () => ({ data: null, error: { message: 'Cannot insert in offline mode' } }),
      update: () => async () => ({ data: null, error: { message: 'Cannot update in offline mode' } }),
      delete: () => async () => ({ data: null, error: { message: 'Cannot delete in offline mode' } })
    }),
    functions: {
      invoke: async () => ({ data: null, error: { message: 'Functions unavailable in offline mode' } })
    }
  };
};

// Check if we're online
export const isOnline = () => {
  return navigator.onLine;
};

// Create a client that gracefully handles offline state
export const createHybridClient = (onlineClient: any) => {
  const offlineClient = createOfflineClient();
  
  return new Proxy(onlineClient, {
    get(target, prop) {
      // If we're offline, use the offline client
      if (!isOnline() && offlineClient[prop as keyof typeof offlineClient]) {
        return offlineClient[prop as keyof typeof offlineClient];
      }
      
      // Otherwise, use the online client
      return target[prop];
    }
  });
};
