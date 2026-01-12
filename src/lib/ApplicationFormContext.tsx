import { createContext, useContext, useState, type ReactNode } from "react";

interface ApplicationFormContextType {
  opened: boolean;
  productId?: number;
  description?: string;
  openForm: (prop: {productId?: number, description?: string}) => void;
  closeForm: () => void;
}

const ApplicationFormContext = createContext<ApplicationFormContextType | undefined>(undefined);

export function ApplicationFormProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [productId, setProductId] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  const openForm = ({productId, description}: {productId?: number, description?: string}) => {
    setProductId(productId);
    setDescription(description);
    setOpened(true);
  };

  const closeForm = () => {
    setOpened(false);
    setProductId(undefined);
    setDescription(undefined);
  };

  return (
    <ApplicationFormContext.Provider value={{ opened, productId, description, openForm, closeForm }}>
      {children}
    </ApplicationFormContext.Provider>
  );
}

export function useApplicationForm() {
  const context = useContext(ApplicationFormContext);
  if (context === undefined) {
    throw new Error("useApplicationForm must be used within an ApplicationFormProvider");
  }
  return context;
}
