import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  colors: {
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    primary: string;
    primaryDark: string;
    border: string;
    shadow: string;
    overlay: string;
    success: string;
    error: string;
    warning: string;
  };
}

const lightColors = {
  background: '#FFFFFF',
  surface: '#F8F8F8',
  card: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  textTertiary: '#9E9E9E',
  primary: '#4CAF50',
  primaryDark: '#388E3C',
  border: '#F5F5F5',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.3)',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
};

const darkColors = {
  background: '#1A1A1A',
  surface: '#2A2A2A',
  card: '#2D2D2D',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textTertiary: '#808080',
  primary: '#2E7D32',
  primaryDark: '#1B5E20',
  border: '#3A3A3A',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  success: '#2E7D32',
  error: '#D32F2F',
  warning: '#F57C00',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('system');

  const isDark = theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}