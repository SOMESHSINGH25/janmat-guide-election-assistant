import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'janmat_users';
const SESSION_KEY = 'janmat_session';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch {
      return [];
    }
  };

  const signup = useCallback(({ fullName, email, password }) => {
    const users = getUsers();
    const emailLower = email.toLowerCase().trim();

    if (users.some(u => u.email === emailLower)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = { fullName: fullName.trim(), email: emailLower, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    const session = { fullName: newUser.fullName, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setCurrentUser(session);
    return { success: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = getUsers();
    const emailLower = email.toLowerCase().trim();
    const user = users.find(u => u.email === emailLower && u.password === password);

    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const session = { fullName: user.fullName, email: user.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setCurrentUser(session);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
