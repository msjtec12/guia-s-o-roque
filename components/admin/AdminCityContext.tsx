'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminCityContextType {
  selectedCityId: string; // 'all' | 'city-sao-roque' | 'city-atibaia' | string
  setSelectedCityId: (cityId: string) => void;
}

const AdminCityContext = createContext<AdminCityContextType>({
  selectedCityId: 'all',
  setSelectedCityId: () => {},
});

export function AdminCityProvider({ children }: { children: React.ReactNode }) {
  const [selectedCityId, setSelectedCityId] = useState<string>('all');

  useEffect(() => {
    const saved = localStorage.getItem('admin_selected_city_id');
    if (saved) {
      setSelectedCityId(saved);
    }
  }, []);

  const handleSetCity = (cityId: string) => {
    setSelectedCityId(cityId);
    localStorage.setItem('admin_selected_city_id', cityId);
  };

  return (
    <AdminCityContext.Provider value={{ selectedCityId, setSelectedCityId: handleSetCity }}>
      {children}
    </AdminCityContext.Provider>
  );
}

export function useAdminCity() {
  return useContext(AdminCityContext);
}
