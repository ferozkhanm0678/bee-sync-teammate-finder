import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { initialStudents } from '../data/initialStudents';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storageService.initStorage();
    const user = storageService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = (emailOrName, password) => {
    // For demo purposes, match any student by name/email or fallback to first student
    const allStudents = storageService.getStudents();
    const found = allStudents.find(s => 
      s.name.toLowerCase().includes(emailOrName.toLowerCase()) || 
      (s.email && s.email.toLowerCase() === emailOrName.toLowerCase())
    );
    const user = found || allStudents[0];
    setCurrentUser(user);
    storageService.setCurrentUser(user);
    return user;
  };

  const register = (studentData) => {
    const newStudent = {
      id: `std-${Date.now()}`,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      initials: (studentData.name || "Student").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
      pastProjectsCount: 1,
      cgpa: studentData.cgpa || "8.50",
      matchMetrics: { completedTeams: 0, rating: 5.0 },
      ...studentData
    };

    const allStudents = storageService.getStudents();
    const updatedStudents = [newStudent, ...allStudents];
    storageService.saveStudents(updatedStudents);
    storageService.setCurrentUser(newStudent);
    setCurrentUser(newStudent);
    return newStudent;
  };

  const switchDemoUser = (studentId) => {
    const allStudents = storageService.getStudents();
    const found = allStudents.find(s => s.id === studentId);
    if (found) {
      setCurrentUser(found);
      storageService.setCurrentUser(found);
    }
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    storageService.setCurrentUser(updated);

    const allStudents = storageService.getStudents().map(s => s.id === currentUser.id ? updated : s);
    storageService.saveStudents(allStudents);
    return updated;
  };

  const logout = () => {
    // For demo, reset to null or stay on demo user
    setCurrentUser(null);
    localStorage.removeItem('bee_sync_current_user');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      loading,
      login,
      register,
      switchDemoUser,
      updateProfile,
      logout,
      demoStudents: initialStudents.slice(0, 5)
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
