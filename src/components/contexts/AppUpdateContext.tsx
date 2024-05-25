import { ReactNode, createContext, useCallback, useRef } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

interface AppUpdateContextType {
  isUpdateAvailable: boolean;
  checkForUpdate: () => void;
  applyUpdate: () => void;
  rejectUpdate: () => void;
}

const AppUpdateContext = createContext<AppUpdateContextType>({
  isUpdateAvailable: false,
  checkForUpdate: () => {},
  applyUpdate: () => {},
  rejectUpdate: () => {},
});

interface AppUpdateContextProviderProps {
  children?: ReactNode;
}

export const AppUpdateContextProvider: React.FC<
  AppUpdateContextProviderProps
> = ({ children }) => {
  const swRegistrationRef = useRef<ServiceWorkerRegistration>();

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered: (registration) => {
      swRegistrationRef.current = registration;
    },
  });

  const checkForUpdate = useCallback(() => {
    swRegistrationRef.current?.update();
  }, []);

  const rejectUpdate = useCallback(() => {
    setNeedRefresh(false);
  }, [setNeedRefresh]);

  return (
    <AppUpdateContext.Provider
      value={{
        isUpdateAvailable: needRefresh,
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
