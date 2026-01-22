import { createContext, useContext, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface ApplicationFormContextType {
  openForm: (prop: {productId?: number, description?: string}) => void;
}

const ApplicationFormContext = createContext<ApplicationFormContextType | undefined>(undefined);

export function ApplicationFormProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const openForm = ({productId, description}: {productId?: number, description?: string}) => {
    const params = new URLSearchParams();
    if (productId) {
      params.set('productId', productId.toString());
    }
    if (description) {
      params.set('description', description);
    }
    const queryString = params.toString();
    const path = `/application${queryString ? `?${queryString}` : ''}`;
    navigate(path);
  };

  return (
    <ApplicationFormContext.Provider value={{ openForm }}>
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
