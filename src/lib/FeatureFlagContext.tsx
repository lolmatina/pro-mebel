import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "./api";

interface FeatureFlagContextType {
  constructorEnabled: boolean | null; // null means loading
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [constructorEnabled, setConstructorEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const loadFeatureFlag = async () => {
      try {
        const setting = await api.getSetting('feature_flag');
        setConstructorEnabled(setting.value);
      } catch (error) {
        console.error('Не удалось загрузить настройку feature_flag:', error);
        // Default to false if there's an error
        setConstructorEnabled(false);
      }
    };

    loadFeatureFlag();
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ constructorEnabled }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlag() {
  const context = useContext(FeatureFlagContext);
  if (context === undefined) {
    throw new Error("useFeatureFlag must be used within a FeatureFlagProvider");
  }
  return context;
}

