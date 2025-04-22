import { ReactNode, createContext, useCallback, useRef, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

interface AppUpdateContextType {
  isUpdateAvailable: boolean;
  wasUpdateRejected: boolean;
  checkForUpdate: () => void;
  applyUpdate: () => void;
  rejectUpdate: () => void;
}

const AppUpdateContext = createContext<AppUpdateContextType>({
  isUpdateAvailable: false,
  wasUpdateRejected: false,
  checkForUpdate: () => {},
  applyUpdate: () => {},
  rejectUpdate: () => {},
});

interface AppUpdateContextProviderProps {
  children?: ReactNode;
}

export const AppUpdateContextProvider = ({
  children,
}: AppUpdateContextProviderProps) => {
  const swRegistrationRef = useRef<ServiceWorkerRegistration | undefined>(
    undefined,
  );
  const [wasUpdateRejected, setWasUpdateRejected] = useState<boolean>(false);

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered: (registration) => {
      swRegistrationRef.current = registration;
    },
  });

  const checkForUpdate = useCallback(() => {
    setWasUpdateRejected(false);
    swRegistrationRef.current
      ?.update()
      ?.catch((e) => console.warn("Failed to update service worker", e));
  }, []);

  const rejectUpdate = useCallback(() => {
    setWasUpdateRejected(true);
  }, []);

  return (
    <AppUpdateContext.Provider
      value={{
        isUpdateAvailable: needRefresh,
        wasUpdateRejected,
        checkForUpdate,
        applyUpdate: updateServiceWorker,
        rejectUpdate,
      }}
    >
      {children}
    </AppUpdateContext.Provider>
  );
};

export default AppUpdateContext;
