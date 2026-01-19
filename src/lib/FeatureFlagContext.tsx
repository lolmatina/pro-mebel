import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api, type HeroBlock } from "./api";

interface FeatureFlagContextType {
  constructorEnabled: boolean | null; // null means loading
  heroBlocks: HeroBlock[];
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [constructorEnabled, setConstructorEnabled] = useState<boolean | null>(null);
  const [heroBlocks, setHeroBlocks] = useState<HeroBlock[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [setting, blocks] = await Promise.all([
          api.getSetting('feature_flag'),
          api.getHeroBlocks(),
        ]);
        setConstructorEnabled(setting.value);
        setHeroBlocks(blocks);
      } catch (error) {
        console.error('Не удалось загрузить данные:', error);
        // Default to false if there's an error
        setConstructorEnabled(false);
        setHeroBlocks([]);
      }
    };

    loadData();
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ constructorEnabled, heroBlocks }}>
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



